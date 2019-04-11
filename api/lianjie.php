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
        $detail=$_GET["detail"];
        $sql="insert into collection(state,detail) values(1,'$detail')";
        $result=$mysqli->query($sql);
        if($result){
            $data=$detail;
        }else{
            $data="sb";
        }
        echo json_encode($data);
?>