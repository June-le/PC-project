<?php

include("../inc/dbconnpro.php");
$ye=$_GET['ye'];
$ye1=($ye-1)*32;
$sql="select * from list limit $ye1,32";
$result=$mysqli->query($sql);
while($row=$result->fetch_assoc()){
        $date[]=$row;
}
// $sql1="select * from list";
// $result1=$mysqli->query($sql1);
// $len=$result1->num_rows;

// $state=array("date"=>$date,"length"=>$len);
// echo json_encode($state);
echo json_encode($date)
?>