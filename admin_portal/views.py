import os
import openpyxl
from flask import Blueprint, render_template, request, redirect, url_for, session, flash, send_file, make_response, \
    Response, jsonify
from portal.security import Encryption
from portal.models import db
from portal import LOG, login_required, APP
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from openpyxl.styles import PatternFill, Font, Alignment, Border, Side
import datetime as td
from datetime import datetime, timedelta
import time
from .Packages.admin_management import deleteFiles
from portal.models.FuelQuote import FuelQuote
from portal.models.UserCredentials import UserCredentials
from portal.models.price_management import PriceManagement
from portal.helpers import get_random_numbers

admin_bp = Blueprint('admin_view', __name__, url_prefix='/fuel_quote/admin_portal', template_folder="./templates",
                     static_folder="./static")



@admin_bp.route('/check', methods=["GET", "POST"])
def enc_key():
    data = request.json
    reg_username=data['reg_username']
    try:
        users = PriceManagement.query.filter_by(fuel_type=reg_username).one()
        if users is not None:
            msg="user_name"
            return jsonify({"msg": msg})
    except NoResultFound:
        pass
    except Exception as e:
        LOG.error("Error occurred while login ")
        LOG.error(e, exc_info=True)
    finally:
        db.session.close()
    Status={"msg": "msg"}
    return jsonify(Status)


@admin_bp.route('/', methods=["GET", "POST"])
def admin_home():
    if request.method == "GET":
        if 'user' in session and 'role' in session:
            if session.get('role') == 'admin':
                main_table, count_row, total_month, today_count_,total_lates_claime_ls,count_total_lates_claime_ls,\
                total_income_,last_month_income_,this_month_income_=admin_home_page()
                return render_template("admin_home.html",main_table=main_table,count_row=count_row,total_month=total_month,
                                       today_count=today_count_,display_name=session.get('display_name'),
                                       role_=session.get('role'),total_lates_claime_ls=total_lates_claime_ls,count_total_lates_claime_ls=count_total_lates_claime_ls,
                                       total_income_=round(total_income_,2),last_month_income_=round(last_month_income_,2),
                                       this_month_income_=round(this_month_income_,2))
            else:
                invalid_msg = "hidden"
                access_name = ""
                access_pass = "hidden"
                pedning_approved="hidden"
                return render_template("login.html", invalid_msg=invalid_msg, access_name=access_name,
                                       access_pass=access_pass,pedning_approved=pedning_approved)
        else:
            invalid_msg = "hidden"
            access_name = ""
            access_pass = "hidden"
            pedning_approved = "hidden"
            return render_template("login.html", invalid_msg=invalid_msg, access_name=access_name,
                                   access_pass=access_pass,pedning_approved=pedning_approved)


@admin_bp.route('/admin_user_managment', methods=["GET", "POST"])
def admin_user_managment():
    if request.method == "GET":
        len_final_list,final_list,count_of_active,count_of_users,count_of_inactive=get_users_()
        count_of_users=count_of_users
        count_of_active=count_of_active
        count_of_inactive=count_of_inactive
        List_=final_list
        return render_template("admin_user_managment.html",count_of_users=count_of_users,count_of_active=count_of_active,
                               count_of_inactive=count_of_inactive,List_=List_,count_for_list=len_final_list,display_name=session.get('display_name'),
                                       role_=session.get('role'))
    if request.method == "POST":
        data = request.json
        username=data['usernameValue']
        display_name=data['displayvalue']
        role=data['userrulevalue']
        status=data['userstatusvalue']
        uservslidvalue=data['uservslidvalue']
        created_by='BOT'
        password = Encryption().encrypt(data['userpasswordvalue'])
        action_=data['action_']
        if action_=='update':
            users = UserCredentials.query.filter_by(username=username).one()
            head = UserCredentials(Id=users.Id,
                                   password=password,
                                   email_id=display_name,
                                   active=status,
                                   attributes_1=role,
                                   status=uservslidvalue)
            try:
                db.session.merge(head)
                db.session.commit()
                db.session.close()
                msg = "successfully registered"
                Status = {"status": msg}
                return jsonify(Status)
            except Exception as e:
                LOG.error(e, exc_info=True)
                db.session.rollback()
                LOG.error("Error while pushing data")
                msg = "Failed"
                Status = {"status": msg}
                return jsonify(Status)
        elif action_=='insert':
            header_id = datetime.now().strftime("%d%m%Y%H%M%S") + get_random_numbers(5)
            encrypted_pwd = Encryption().encrypt(data['userpasswordvalue'])
            head = UserCredentials(user_uid=header_id,
                                   password=encrypted_pwd,
                                   username=username,
                                   email_id=display_name,
                                   active=status,
                                   status=uservslidvalue,
                                   attributes_1=role)
            try:
                db.session.merge(head)
                db.session.commit()
                db.session.close()
                msg = "successfully registered"
                Status = {"status": msg}
                return jsonify(Status)
            except Exception as e:
                LOG.error(e, exc_info=True)
                db.session.rollback()
                LOG.error("Error while pushing data")
                msg = "Failed"
                Status = {"status": msg}
                return jsonify(Status)


@admin_bp.route('/admin_price_managment', methods=["GET", "POST"])
def admin_report_managment():
    if request.method == "GET":
        len_final_list,final_list=get_fuel_type_()
        return render_template("admin_price_managment.html",count_for_list=len_final_list,List_=final_list,display_name=session.get('display_name'),
                                       role_=session.get('role'))
    if request.method == "POST":
        data = request.json
        username=data['usernameValue']
        display_name=data['displayvalue']
        role=data['userrulevalue']
        Id_price = data['Id_price']
        action_=data['action_']
        if action_=='update':
            users = PriceManagement.query.filter_by(price_id=Id_price).one()
            head = PriceManagement(Id=users.Id,
                                   price_=username,
                                   quantity_=display_name,
                                   fuel_type=role)
            try:
                db.session.merge(head)
                db.session.commit()
                db.session.close()
                msg = "successfully registered"
                Status = {"status": msg}
                return jsonify(Status)
            except Exception as e:
                LOG.error(e, exc_info=True)
                db.session.rollback()
                LOG.error("Error while pushing data")
                msg = "Failed"
                Status = {"status": msg}
                return jsonify(Status)
        elif action_=='insert':
            header_id = datetime.now().strftime("%d%m%Y%H%M%S") + get_random_numbers(5)
            head = PriceManagement(price_id=header_id,
                                   price_=username,
                                   quantity_=display_name,
                                   fuel_type=role)
            try:
                db.session.merge(head)
                db.session.commit()
                db.session.close()
                msg = "successfully registered"
                Status = {"status": msg}
                return jsonify(Status)
            except Exception as e:
                LOG.error(e, exc_info=True)
                db.session.rollback()
                LOG.error("Error while pushing data")
                msg = "Failed"
                Status = {"status": msg}
                return jsonify(Status)


def admin_home_page():
    main_table = []
    inner_loop = []
    lates_claime_ls=[]
    total_lates_claime_ls=[]
    get_queary = FuelQuote.query.all()
    total_income_=0
    last_month_income_=0
    this_month_income_=0
    today_count_=0
    for Quote in get_queary:
        inner_loop.append(Quote.fuel_quote_id)
        inner_loop.append(Quote.fuel_type)
        inner_loop.append(Quote.cur_gallon_price)
        inner_loop.append(Quote.quantity)
        inner_loop.append(Quote.total_price)
        inner_loop.append(Quote.created_date)
        inner_loop.append(Quote.delivery_date)
        main_table.append(inner_loop)
        inner_loop = []
        total_income_+=float(Quote.total_price)
        today_count_+=float(Quote.quantity)
    count_row = len(main_table)
    today_date = td.datetime.strptime(td.date.today().strftime("%Y-%m-%d"), '%Y-%m-%d').date()
    filter_date = today_date.strftime("%Y-%m-%d")
    this_month = today_date.strftime("%Y-%m")

    first = today_date.replace(day=1)
    last_month = first - td.timedelta(days=1)
    last_month = last_month.strftime("%Y-%m")

    latest_this_month = db.session.query(FuelQuote).filter(FuelQuote.created_date.contains(this_month)).all()
    latest_records = FuelQuote.query.order_by(FuelQuote.created_date.desc()).limit(3).all()
    for i in latest_records:
        lates_claime_ls.append(i.fuel_quote_id)
        lates_claime_ls.append(i.total_price)
        lates_claime_ls.append(i.created_date)
        total_lates_claime_ls.append(lates_claime_ls)
        lates_claime_ls=[]
    latest_last_month = db.session.query(FuelQuote).filter(FuelQuote.created_date.contains(last_month)).all()
    for i in latest_last_month:
        last_month_income_+=float(i.total_price)
    last_month_count_=[]
    for i in latest_this_month:
        this_month_income_+=float(i.total_price)
        last_month_count_.append(i.total_price)
    total_month=len(last_month_count_)
    count_total_lates_claime_ls=len(total_lates_claime_ls)

    return main_table, count_row, total_month, today_count_,total_lates_claime_ls,count_total_lates_claime_ls,total_income_,last_month_income_,this_month_income_


def get_users_():
    get_queary = UserCredentials.query.all()
    temp_=[]
    final_list=[]
    count_of_active=0
    count_of_users=0
    count_of_inactive=0
    for claim in get_queary:
        temp_.append(claim.user_uid)
        temp_.append(claim.username)
        temp_.append(Encryption().decrypt(claim.password))
        temp_.append(claim.attributes_1)
        temp_.append(claim.email_id)
        temp_.append(claim.active)
        temp_.append(claim.status)
        final_list.append(temp_)
        temp_=[]
        if str(claim.active) == "y":
            count_of_active=count_of_active+1
        if str(claim.active) == "n":
            count_of_inactive=count_of_inactive+1
        count_of_users=count_of_users+1
    len_final_list=len(final_list)
    return len_final_list,final_list,count_of_active,count_of_users,count_of_inactive


def get_fuel_type_():
    get_queary = PriceManagement.query.all()
    temp_=[]
    final_list=[]
    for claim in get_queary:
        temp_.append(claim.price_id)
        temp_.append(claim.price_)
        temp_.append(claim.quantity_)
        temp_.append(claim.fuel_type)
        final_list.append(temp_)
        temp_=[]
    len_final_list=len(final_list)
    return len_final_list,final_list