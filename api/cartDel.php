<?php
include("../inc/dbconn.php");
$id = $_POST["delData"];
$sql="delete from car where Id='$id'";
$result = $conn->query($sql);
