<?php
// header("Access-Control-Allow-Origin: *");  Ajax跨域请求 解决CORS: 跨域资源共享
  include("../inc/dbconnpro.php");
  $dataText=$_GET["dataText"];
  $sql="select img,txt from submenu where pinpai='$dataText'";
  $result=$mysqli->query($sql);
  while($row=$result->fetch_assoc()){
    $data[]=$row;
} 
echo json_encode($data);
?>