const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
})

//change theme

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');

})


// Orders.forEach(order => {

//     const tr = document.createElement('tr');
//     const trContent = `
//                     <td>${order.productName}</td>
//                     <td>${order.productNumber}</td>
//                     <td>${order.productStatus}</td>
//                     <td class="${order.shipping === 'Declined' ? 'danger' :
//             order.shipping === 'Pending' ? 'warning' : 'primary'}">${order.shipping}</td>
//                     <td class="primary">Details</td>
//                     `;
//     tr.innerHTML = trContent;
//     document.querySelector('table tbody').appendChild(tr);
// })

var header = document.getElementById("home_grid_main");
var btns = header.getElementsByClassName("home_grid");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}



function init_register(id)
{
    console.log(id)
    document.getElementById("vl_user_name").className = 'required_';
    document.getElementById("vl_display_name").className = 'required_';
    document.getElementById("vl_user_rule").className = 'required_';
    document.getElementById("vl_user_status").className = 'required_';
    document.getElementById("vl_user_password").className = 'required_';
    document.getElementById("vl_confirm_user_pass").className = 'required_';
    document.getElementById("vl_user_vslid").className = 'required_';

    const usernameValue = user_name.value.trim();
    const displayvalue = display_name.value.trim();
    const userrulevalue = user_rule.value.trim();
    const userstatusvalue = user_status.value.trim();
    const userpasswordvalue = user_password.value.trim();
    const userconfipasssvalue = confirm_user_pass.value.trim();
    const uservslidvalue = user_vslid.value.trim();
    var action_ =''

    if (usernameValue === '')
     {
       document.getElementById("vl_user_name").className = '';
       document.getElementById('vl_user_name').innerHTML = 'Username is required!';
       return false;
    }
    else
    {
       document.getElementById("vl_user_name").className = 'required_';
       document.getElementById('vl_user_name').innerHTML = '';
    }
    if (displayvalue === '') {
     document.getElementById("vl_display_name").className = '';
     document.getElementById('vl_display_name').innerHTML = 'Gmail is required!';
     return false;
    }
    else
    {
       document.getElementById("vl_display_name").className = 'required_';
       document.getElementById('vl_display_name').innerHTML = '';
    }
    if (!isValidEmail(displayvalue))
     {
            document.getElementById("vl_display_name").className = '';
            document.getElementById('vl_display_name').innerHTML = 'Provide a valid email address!';
            return false;
        }
else
    {
        document.getElementById("vl_display_name").className = 'error_r';
        document.getElementById('vl_display_name').innerHTML = '';
    }
      if (userrulevalue === 'None') {
     document.getElementById("vl_user_rule").className = '';
     document.getElementById('vl_user_rule').innerHTML = 'Role is required!';
     return false;
    }
    else
    {
       document.getElementById("vl_user_rule").className = 'required_';
       document.getElementById('vl_user_rule').innerHTML = '';
    }
      if (userstatusvalue === 'None') {
     document.getElementById("vl_user_status").className = '';
     document.getElementById('vl_user_status').innerHTML = 'Status is required!';
     return false;
    }
    else
    {
       document.getElementById("vl_user_status").className = 'required_';
       document.getElementById('vl_user_status').innerHTML = '';
    }
    if (userpasswordvalue === '') {
        document.getElementById("vl_user_password").className = '';
        document.getElementById('vl_user_password').innerHTML = 'Password is required!';
        return false;
    }
    else {
        document.getElementById("vl_user_password").className = 'required_';
        document.getElementById('vl_user_password').innerHTML = '';
    }
    if (userconfipasssvalue === '') {
        document.getElementById("vl_confirm_user_pass").className = '';
        document.getElementById('vl_confirm_user_pass').innerHTML = 'Please confirm your password.';
        return false;
    }
    else if (userconfipasssvalue !== userpasswordvalue) {
        document.getElementById("vl_confirm_user_pass").className = '';
        document.getElementById('vl_confirm_user_pass').innerHTML = "Passwords doesn't match";
        return false;
    }
    else {
       document.getElementById("vl_confirm_user_pass").className = 'required_';
        document.getElementById('vl_confirm_user_pass').innerHTML = '';
    }
    if (uservslidvalue === '') {
        document.getElementById("vl_user_vslid").className = '';
        document.getElementById('vl_user_vslid').innerHTML = 'Approved status is required!';
        return false;
    }
    else {
        document.getElementById("vl_user_vslid").className = 'required_';
        document.getElementById('vl_user_vslid').innerHTML = '';
    }
    var check_list={'reg_username':usernameValue,'reg_email':displayvalue}
    $.ajax({
                url: '/fuel_quote/check',
                data: JSON.stringify(check_list),
                type: 'POST',
                contentType: "application/json",
                dataType: 'json',
                success: function (data)
                {
                    console.log(data['msg']);
                    if(id==='new_user')
                    {
                         action_='insert'
                         if (data["msg"]=='user_name'){
                             document.getElementById("vl_user_name").className = '';
                             document.getElementById('vl_user_name').innerHTML = 'Username is already taken!';
                             return false
                          }
                          else{
                            document.getElementById("vl_user_name").className = 'required_';
                             document.getElementById('vl_user_name').innerHTML = '';
                          }
                          if (data["msg"]=='email_id'){
                             document.getElementById("vl_display_name").className = '';
                             document.getElementById('vl_display_name').innerHTML = 'Gmail is already taken!';
                             return false
                          }
                          else{
                            document.getElementById("vl_display_name").className = 'required_';
                             document.getElementById('vl_display_name').innerHTML = '';
                          }
                    }
                    else{
                        action_='update'
                    }
                    var final_bills_request={"usernameValue":usernameValue,"displayvalue":displayvalue,"userrulevalue":userrulevalue,"userstatusvalue":userstatusvalue,"userpasswordvalue":userpasswordvalue,'action_':action_,'uservslidvalue':uservslidvalue};
                    $.ajax({
                                url: '/fuel_quote/admin_portal/admin_user_managment',
                                data: JSON.stringify(final_bills_request),
                                type: 'POST',
                                contentType: "application/json",
                                dataType: 'json',
                                success: function (data1)
                                {
                                    if(data1['status']=="successfully registered")
                                    {
                                       alert(data1['status'])
                                       document.getElementById('update_user').style.display = 'none';
                                       document.getElementById('new_user').style.display = '';
                                       document.getElementById("user_name").disabled = false;
                                       window.location.href = "/fuel_quote/admin_portal/admin_user_managment"
                                    }
                                    else{
                                        alert(data1['status'])
                                        return false;
                                    }

                                },
                                error: function(data1)
                                {
                                    console.log(data1);
                                    return false;
                                }
                        });

                },
                error: function(data)
                {
                    console.log(data);
                    return false;
                }
        });

}


function init_price_register(id)
{
    console.log(id)
    document.getElementById("vl_user_name").className = 'required_';
    document.getElementById("vl_display_name").className = 'required_';
    document.getElementById("vl_user_rule").className = 'required_';

    const Id_price = id_.value.trim();
    const usernameValue = user_name.value.trim();
    const displayvalue = display_name.value.trim();
    const userrulevalue = user_rule.value.trim();

    var action_ =''
    if (userrulevalue === 'None') {
     document.getElementById("vl_user_rule").className = '';
     document.getElementById('vl_user_rule').innerHTML = 'Fuel Type is required!';
     return false;
    }
    else
    {
       document.getElementById("vl_user_rule").className = 'required_';
       document.getElementById('vl_user_rule').innerHTML = '';
    }
    if (usernameValue === '')
     {
       document.getElementById("vl_user_name").className = '';
       document.getElementById('vl_user_name').innerHTML = 'Price Per Gallon is required!';
       return false;
    }
    else
    {
       document.getElementById("vl_user_name").className = 'required_';
       document.getElementById('vl_user_name').innerHTML = '';
    }
    if (displayvalue === '') {
     document.getElementById("vl_display_name").className = '';
     document.getElementById('vl_display_name').innerHTML = 'Quantity Available is required!';
     return false;
    }
    else
    {
       document.getElementById("vl_display_name").className = 'required_';
       document.getElementById('vl_display_name').innerHTML = '';
    }


    var check_list={'reg_username':userrulevalue}
    $.ajax({
                url: '/fuel_quote/admin_portal/check',
                data: JSON.stringify(check_list),
                type: 'POST',
                contentType: "application/json",
                dataType: 'json',
                success: function (data)
                {
                    console.log(data['msg']);
                    if(id==='new_user')
                    {
                         action_='insert'
                         if (data["msg"]=='user_name'){
                             document.getElementById("vl_user_rule").className = '';
                             document.getElementById('vl_user_rule').innerHTML = 'Fuel Type Is Already Available!';
                             return false
                          }
                          else{
                            document.getElementById("vl_user_rule").className = 'required_';
                             document.getElementById('vl_user_rule').innerHTML = '';
                          }
                    }
                    else{
                        action_='update'
                    }
                    var final_bills_request={"usernameValue":usernameValue,"displayvalue":displayvalue,"userrulevalue":userrulevalue,'Id_price':Id_price,'action_':action_};
                    $.ajax({
                            url: '/fuel_quote/admin_portal/admin_price_managment',
                            data: JSON.stringify(final_bills_request),
                            type: 'POST',
                            contentType: "application/json",
                            dataType: 'json',
                            success: function (data1)
                            {
                                if(data1['status']=="successfully registered")
                                {
                                   alert(data1['status'])
                                   document.getElementById('update_user').style.display = 'none';
                                   document.getElementById('new_user').style.display = '';
                                   document.getElementById("user_name").disabled = false;
                                   window.location.href = "/fuel_quote/admin_portal/admin_price_managment"
                                }
                                else{
                                    alert(data1['status'])
                                    return false;
                                }

                            },
                            error: function(data1)
                            {
                                console.log(data1);
                                return false;
                            }
                    });

                },
                error: function(data)
                {
                    console.log(data);
                    return false;
                }
        });

}





function report_generate(){

  var start_date = document.getElementById("start_date").value;
	var end_date = document.getElementById("end_date").value;

	document.getElementById("vl_end_date").className = 'required_';
    document.getElementById("vl_start_date").className = 'required_';

    if (start_date === '')
     {
       document.getElementById("vl_start_date").className = '';
       document.getElementById('vl_start_date').innerHTML = 'Username is required!';
       return false;
    }
    else
    {
       document.getElementById("vl_start_date").className = 'required_';
       document.getElementById('vl_start_date').innerHTML = '';
    }
     if (end_date === '')
     {
       document.getElementById("vl_end_date").className = '';
       document.getElementById('vl_end_date').innerHTML = 'Username is required!';
       return false;
    }
    else
    {
       document.getElementById("vl_end_date").className = 'required_';
       document.getElementById('vl_end_date').innerHTML = '';
    }

	const URL = '/icici/admin_portal/generate_report_range/' + start_date + '/' + end_date
    window.open(URL,"_self")
}


const isValidEmail = email => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
