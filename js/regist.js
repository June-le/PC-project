$(function () {
    var flag = false,
        flag1 = false,
        flag2 = false;

    function Blur() {
        $(".user").blur(function () {
            if (!/^[a-zA-Z0-9]{6,12}$/.test($(".user").val())) {
                $(this).parent().next().html("用户名格式不正确");
            } else {
                $(this).parent().next().html("");
                flag = true;
            }
        })
        $(".pwd").blur(function () {
            if (!/^\w{6,20}$/.test($(".pwd").val())) {
                $(this).parent().next().html("密码格式不正确");
            } else {
                $(this).parent().next().html("");
                flag1 = true;
            }
        })
        $(".pwd2").blur(function () {
            if (($(".pwd2").val()) != $(".pwd").val()) {
                $(this).parent().next().html("两次密码不一致，请检查您的密码");
            } else {
                $(this).parent().next().html("");
                flag2 = true;
            }
        })
    }

    Blur();

    //点击注册满足条件时，请求数据
    $('.register').click(function () {
        var res = $('.note-inp').val()
        if (res) {
            $('.note-img').next().html('')
            if (flag && flag1 && flag2) {
                $.ajax({
                    beforeSend: function () {
                        $(".register").html("注册中");
                    },
                    type: "GET",
                    url: "api/zhuce.php",
                    dataType: "json",
                    data: "user=" + $(".user").val() + "&pwd=" + $(".pwd").val(),
                    success: function (data) {
                        if (data.code == 0) {
                        //    console.log(11111)
                            
                            setCookie("user", data.user);
                            window.location.href='collection.php'
                        }
                    },
                    complete: function () {
                        $(".register").html('注册');
                    }
                })
            }
        } else {
            $('.note-img').next().html('验证码不正确')
        }
    })


    
})