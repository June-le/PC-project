<?php

include("../inc/dbconnpro.php");
$ye=$_GET['ye'];
$ye1=($ye-1)*32;
$sql="select * from list order by oldprice limit $ye1,32";
$result=$mysqli->query($sql);
while($row=$result->fetch_assoc()){
        $date[]=$row;
}

echo json_encode($date);

?>