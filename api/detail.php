<?php
 //和MySQL数据库
    //phpStudy默认用户名：root   密码：root  
    date_default_timezone_set('PRC'); //设置中国时区
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "yunbiao";
      
    // 创建与MySQL数据库的连接对象实例： $conn
    $mysqli = new mysqli($servername, $username, $password,$dbname);
    //保证查询出来的中文不会出现乱码
    mysqli_set_charset( $mysqli, "utf8");

    // 检测连接是否成功，如果成功
    if ( $mysqli->connect_error) {
        //die: 输出错误信息，并终止脚本执行
        die("连接失败: " .  $mysqli->connect_error);
    } 
    // 接受传过来的detail标签
    $detail=$_GET['detail'];
    $price=$_GET['price'];
    $num=$_GET['num'];
    $id=$_GET['id'];
    $brind=$_GET['brind'];
    $img=$_GET['img'];
    $sqll="insert into car (Id,img,price,name,num,dianpu) values('$id','$img','$price','$detail','$num','$brind')";
    // $sqll="insert into list (Id) values(1111111411)";

    $result1=$mysqli->query($sqll);
    echo header("../html/deyail.html");
    // echo json_encode("sss");

