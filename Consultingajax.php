<?php
    include('inc/dbconn.php');
    $type = $_POST['type'];
    $sql = "select * from watchconsulting where type = $type";
    $result=$mysql->query($sql);
    if($result->num_rows > 0){
        while($row=mysqli_fetch_assoc($result)){
            $list[]=$row;
        }
        $data["list"]=$list;
        $data["success"]=1;
    }else{
        $data["success"]=0;
    }
    echo json_encode($data);
?>