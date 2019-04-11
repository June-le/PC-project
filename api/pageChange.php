<?php
    include("../inc/dbconnCollection.php");
    $current=$_POST["current"];
    $start=$current*12;
    $sql2="select * from collection where state=1 order by Id desc limit $start,12";
    $result2=$mysqli->query($sql2);
    $num=0;
    if($result2->num_rows>0){
        while($row2=mysqli_fetch_assoc($result2)){
            $sp[]=$row2;
        }
        $data["sp"]=$sp;
        // $data["total"]=$num;
        $data["success"]=1;
    }else{
        $data["success"]=0;
    }
    echo json_encode($data);
?>


