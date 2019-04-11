<?php
    include("../inc/dbconnCollection.php");
    $sql="select * from collection where state=1";
    $result=$mysqli->query($sql);
    $num=0;
    if($result->num_rows>0){
        while($row=mysqli_fetch_assoc($result)){
            $num++;
        }
        $data["total"]=$num;
        $data["success"]=1;
    }else{
        $data["success"]=0;
    }
    echo json_encode($data);
?>


