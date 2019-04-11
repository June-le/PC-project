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
        $src=$_GET["src"];
        $price=$_GET["price"];
        $name=$_GET["name"];
        $num=$_GET["num"];
        $dianpu=$_GET["dianpu"];
        $newNum=0;
        $sql2="select * from car where img='{$src}'";
        $result2=$mysqli->query($sql2);
        if($result2->num_rows>0){
            while($row3=mysqli_fetch_assoc($result2)){
                $sp[]=$row3;
            }

            $oldNum=intval($sp[0]["num"],10)+1;
            // $newNum=$oldNum+1;
            $sql4="update car set num={$oldNum} where img='{$src}'";
            $result4=$mysqli->query($sql4);

        }else{
            $sql="insert into car (img,price,name,num,dianpu) values ('{$src}','{$price}','{$name}','{$num}','{$dianpu}')";
            $result=$mysqli->query($sql);
        }

echo json_encode($oldNum);
        



?>