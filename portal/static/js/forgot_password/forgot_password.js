function change_password() {

var user_name = document.getElementById('username').value;
var pass_word = document.getElementById('password').value;
var confirm_password = document.getElementById('confirm_password').value;
var otp = document.getElementById('otp').value;

 document.getElementById("lb_submit_ntb").className = 'error_r';
 document.getElementById('lb_submit_ntb').innerHTML = '';

var pass_word = document.getElementById('password').value;
if (otp.trim() === '')
     {
       document.getElementById("lb_otp").className = '';
       document.getElementById('lb_otp').innerHTML = 'lb_otp is required!';
       return false;
    }
else
    {
       document.getElementById("lb_otp").className = 'error_r';
       document.getElementById('lb_otp').innerHTML = '';
    }
if (pass_word.trim() === '')
     {
       document.getElementById("lb_login_password").className = '';
       document.getElementById('lb_login_password').innerHTML = 'Password is required!';
       return false;
    }
else
    {
       document.getElementById("lb_login_password").className = 'error_r';
       document.getElementById('lb_login_password').innerHTML = '';
    }
if (confirm_password.trim() === '')
     {
       document.getElementById("lb_confirm_password").className = '';
       document.getElementById('lb_confirm_password').innerHTML = 'Confirm Password is required!';
       return false;
    }
else if (confirm_password !== pass_word) {
    document.getElementById("lb_confirm_password").className = '';
    document.getElementById('lb_confirm_password').innerHTML = "Passwords doesn't match";
    return false;
}
else
    {
       document.getElementById("lb_confirm_password").className = 'error_r';
       document.getElementById('lb_confirm_password').innerHTML = '';
    }


var check_list={"pass_word":pass_word,"user_name":user_name,"otp":otp}
    $.ajax({
                url: '/fuel_quote/forgot_password',
                data: JSON.stringify(check_list),
                type: 'POST',
                contentType: "application/json",
                dataType: 'json',
                success: function (data)
                {
                    console.log(data["msg"])
                    if(data["msg"]=='not_valid'){
                          document.getElementById("lb_otp").className = '';
                         document.getElementById('lb_otp').innerHTML = 'Invalid Otp!';
                         return false
                      }
                    else if (data["msg"]=='not_found'){
                         document.getElementById("lb_otp").className = '';
                         document.getElementById('lb_otp').innerHTML = 'lb_otp is not found!';
                         return false

                    }
                    else if (data["msg"]=='Expired'){
                         document.getElementById("lb_otp").className = '';
                         document.getElementById('lb_otp').innerHTML = 'OTP has been expired!';
                         return false
                    }
                    else if (data["msg"]=='Successfully Changed'){
                        document.getElementById("lb_otp").className = 'error_r';
                        document.getElementById('lb_otp').innerHTML = '';
                        alert(data['msg'])
                        window.location.href = "/fuel_quote/"
                    }
                      else{
                          document.getElementById("lb_otp").className = '';
                         document.getElementById('lb_otp').innerHTML =data["msg"];
                      }
                    return true;
                },
                error: function(data)
                {
                  document.getElementById("lb_submit_ntb").className = '';
                  document.getElementById('lb_submit_ntb').innerHTML = 'Something went wrong, Please Refresh the page!';
                    return false;
                }
        });



}




function init_file() {

var user_name = document.getElementById('username').value;
var pass_word = document.getElementById('password').value;
if (user_name.trim() === '')
     {
       document.getElementById("lb_login_username").className = '';
       document.getElementById('lb_login_username').innerHTML = 'Gmail is required!';
       return false;
    }
else
    {
       document.getElementById("lb_login_username").className = 'error_r';
       document.getElementById('lb_login_username').innerHTML = '';
    }

 if (!isValidEmail(user_name))
     {
            document.getElementById("lb_login_username").className = '';
            document.getElementById('lb_login_username').innerHTML = 'Provide a valid email address!';
            return false;
        }
else
    {
        document.getElementById("lb_login_username").className = 'error_r';
        document.getElementById('lb_login_username').innerHTML = '';
    }

var check_list={"reg_email":user_name}
    $.ajax({
                url: '/fuel_quote/send_otp',
                data: JSON.stringify(check_list),
                type: 'POST',
                contentType: "application/json",
                dataType: 'json',
                success: function (data)
                {
                    if(data["msg"]=='email_id'){
                          document.getElementById("lb_login_username").className = '';
                         document.getElementById('lb_login_username').innerHTML = 'Email is not found!';
                         return false
                      }
                      else{
                          document.getElementById("lb_login_username").className = 'error_r';
                         document.getElementById('lb_login_username').innerHTML = '';
                      }
                    console.log(data);
                    alert("OTP Sent Successfully Please Check Your Mail")
                    document.getElementById('dv_otp').style.display = '';
                    document.getElementById('dv_password').style.display = '';
                    document.getElementById('dv_confi_password').style.display = '';
                    document.getElementById("dv_user_name").disabled = true;
                    document.getElementById("username").disabled = true;
                    document.getElementById('submit_ntb').style.display = '';
                    document.getElementById('login_ntb').style.display = 'none';
                    var element = document.getElementById("submit_ntb");
                    element.classList.add("change_pass_btn");
                    return true;
                },
                error: function(data)
                {
                    console.log(data);
                    return false;
                }
        });



}



const isValidEmail = email => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
