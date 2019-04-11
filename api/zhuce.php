<?php
     include("../inc/dbconnpro.php");
     $user=$_GET["user"];
     $pwd=$_GET["pwd"];
     $sql="insert into admin (name,password) values ('{$user}','{$pwd}')";
     $result=$mysqli->query($sql);
     $aff=$mysqli->affected_rows;
    //  $row = mysqli_fetch_assoc($result);
     if($aff==1){
        $data["code"] = 0;
        $data['user']="{$user}";
      }
    echo json_encode($data);
?>