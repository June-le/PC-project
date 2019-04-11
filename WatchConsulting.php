<?php
    include('inc/dbconn.php');
    include('init.inc.php');
    $sql = "select * from watchconsulting where type = 1";
    $result = $mysql->query($sql);
    while($row = mysqli_fetch_assoc($result)){
        $data[] = $row;
    }
    $smarty->assign("data",$data);
    $smarty->display("WatchConsulting.html");
?>