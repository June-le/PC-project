$(function(){


    $(".login-box").click(function (e) {
        e.preventDefault();
    })

     //点击登录获取数据库信息判断账户密码是否正确
     function Ajax() {
        $.ajax({
            type: "POST",
            url: "api/Login.php",
            dataType: "json",
            data: "user=" + $(".user").val() + "&pwd=" + $(".pwd").val(),
            success: function (data) {
                console.log(data)
                if (data.code == 1) {
                    $(".login").val("登录")
                    $(".user").next().html("用户名不存在");
                } else if (data.code == 2) {
                    $(".login").html("登录")
                    $(".user").next().html("");
                    $(".pwd").next().html("密码错误");
                } else {
                    // console.log(11111111)
                    $(".login").val("登录")
                    $(".user").next().html("");
                    $(".pwd").next().html("")
                    
                    //设置cookie
                   
                    setCookie("user", data.user);
                    window.location.href='collection.php'
                    
                   
                }
            }
        })

    }

    //点击登录获取数据
    function handlerLogin() {
        $(".login").click(function (e) {
            e.preventDefault();
            $(".login").val("登录中")
            Ajax()
        })
    }
    handlerLogin();
})
$('.regist').click(function(){
    window.location.href='Regist.html'
})