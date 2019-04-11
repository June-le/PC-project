<?php
include("../inc/dbconn.php");
$id = $_POST["goodsID"];
$number = $_POST["goodsNum"];
$sql = "update car set num='$number' where id = '$id'";
$result = $conn->query($sql);
