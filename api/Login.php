<?php
// header("Access-Control-Allow-Origin: *");  Ajax跨域请求 解决CORS: 跨域资源共享
  include("../inc/dbconnpro.php");
  $user=$_POST["user"];
  $pwd=$_POST["pwd"];
  $sql="select * from admin where name='$user'";
  $result=$mysqli->query($sql);
  if ($result->num_rows > 0){
        $row = mysqli_fetch_assoc($result);
        if ($pwd == $row["password"]){
            // 登录成功
            $data["code"] = 0;
            $data['user']="{$row["name"]}";
        }else{
            //密码错误 
            $data["code"] = 2;
        }
}else{
    // 用户名不存在
    $data["code"] = 1;
}
echo json_encode($data);
?>