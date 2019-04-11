<?php

    // 页面初始化就加载前24条数据
    include("inc/dbconnCollection.php");
    include("init.inc.php");
    // $current=$_COOKIE["current"];
    // $start=$current*12;
    $sql="select * from collection where state=1 order by Id desc limit 0,12";
    $result=$mysqli->query($sql);
    if($result->num_rows>0){
        while($row=mysqli_fetch_assoc($result)){
            $data[]=$row;
        }
    }
    $smarty->assign("data",$data);
    $smarty->display("collection.html");
?>