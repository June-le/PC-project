<?php
    include("../inc/dbconnCollection.php");

    $sql1 = "select * from submenus";

    $result1 = $mysqli->query($sql1);

    if($result1->num_rows>0){
        while($row1=mysqli_fetch_assoc($result1)){
            $sql2 = "select * from submenu where pinpai='{$row1["pinpai"]}'";
            $sql3 = "select * from recis where pinpai='{$row1["pinpai"]}'";
            $result2 = $mysqli->query($sql2);
            $result3 = $mysqli->query($sql3);
            $list=[];
            $list3=[];
            while($row2=mysqli_fetch_assoc($result2)){
                $list[]=$row2;
            }
            while($row3=mysqli_fetch_assoc($result3)){
                $list3[]=$row3;
            }
            $list2[]=$list;
            $list4[]=$list3;
        }
        // $data["pinpai"]=$list2;
        // $data["reci"]=$list4;
        $list5["pinpai"]=$list2;
        $list5["reci"]=$list4;
        $data["info"]=$list5;
        $data["success"]=1;
    }else{
        $data["success"]=0;
    }

    echo json_encode($data);
?>