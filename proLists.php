<?php
  include("inc/dbconnpro.php");
  include("init.inc.php");
  $sql = "select img,price,oldprice,details,sales,brand from list limit 0,32";
  $result = $mysqli->query($sql);
  // print_r($result);
  if($result->num_rows>0){
    while($row=$result->fetch_assoc()){
        $data[]=$row;
    }
}
$smarty->assign("data",$data);
$smarty->display("proLists.html")
?>