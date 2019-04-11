<?php
    include("../inc/dbconnCollection.php");
    $page=$_GET["page"];
    // 遍历传过来的数组
    $id=$_GET["collectId"];

    // $id=$id[0];
    foreach($id as $val){
        $sql2="update collection set state=0 where Id=$val";
        $result2=$mysqli->query($sql2);
    }
    $start=$page*12;
    // $sql2="update collection set state=0 where Id=$id";
    $sql="select * from collection where state=1  order by Id desc  limit $start,12";
    // $result2=$mysqli->query($sql2);
    $result=$mysqli->query($sql);
    if($result->num_rows>0){
        while($row=mysqli_fetch_assoc($result)){
            $sp[]=$row;
        }
        $data["sp"]=$sp;
        $data["success"]=1;
    }else{
        $data["success"]=0;
    }
    echo json_encode($data);
?>