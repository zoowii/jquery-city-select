/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 12-8-7
 * Time: 上午10:38
 * To change this template use File | Settings | File Templates.
 */
var email_re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

$("#User_email").blur(function() {
    var email = $(this).val();

    if(!email_re.test(email)) {
        $("#email_error_msg").html('<span style="color: red; font-size: 12px;">邮箱不合法！</span>');
        return false;
    } else {
        $.get('index.php?r=validate/emailCanRegister', {
            email: email
        }, function(data) {
            var json = eval("(" + data + ")");
            if(json.result == true) {
                $("#email_error_msg").html('<span style="color: green; font-size: 12px;">验证通过！</span>');
            } else {
                $("#email_error_msg").html('<span style="color: red; font-size: 12px;">邮箱已注册！</span>');
            }
        });
    }
});

$("#User_password").blur(function() {
    var password = $(this).val();
    if(password.length < 5 || password.length > 30) {
        $("#password_error_msg").html('<span style="color: red; font-size: 12px;">密码长度需大于4小于31！</span>');
    } else {
        $("#password_error_msg").html('<span style="color: green; font-size: 12px;">验证通过！</span>');
    }
    if($("#repeat_password_input").val() == '') {
    	$("#repeat_password_error_msg").html('');
    	return;
    }
    checkRepeatPassword();
});

function checkRepeatPassword() {
    var repeat_password = $("#repeat_password_input").val();
    var password = $("#User_password").val();
    if(password != repeat_password) {
        $("#repeat_password_error_msg").html('<span style="color: red; font-size: 12px;">密码重复错误！</span>');
    } else {
        $("#repeat_password_error_msg").html('<span style="color: green; font-size: 12px;">验证通过！</span>');
    }
}

$("#checkcode_input").keyup(function() {
	var checkcode = $(this).val();
	$.get('/index.php?r=user/checkCheckCode', {
		checkcode: checkcode
	}, function(data) {
		if(data == 'true') {
			$("#checkcode_error_msg").html('<span style="color: green; font-size: 12px;">验证通过！</span>');
		} else {
			$("#checkcode_error_msg").html('<span style="color: red; font-size: 12px;">验证码错误！</span>');
		}
	}, 'html');
});

$("#repeat_password_input").blur(checkRepeatPassword);

city_select.select($("#hometown_city_select"), $("#User_hometown_city_code"));
city_select.select($("#current_city_select"), $("#User_current_city_code"));
