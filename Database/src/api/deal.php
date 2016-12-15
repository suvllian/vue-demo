<?php
	require_once("./db.class.php");  

	header('Access-Control-Allow-Origin:*');   
	header('Access-Control-Allow-Headers:x-requested-with,content-type');

	$id = $_POST['id'];
	$type = $_POST['type'];

	if($type==="update"){

		// 员工更新基本信息

		$name = $_POST['name'];
		$age = $_POST['age'];
		$tel = $_POST['tel'];

		$sql = "update employee set E_Name='$name',E_Age='$age',E_Tel='$tel' WHERE E_No=$id";

		$result = $db->IDA($sql);

		if($result==1){
			
			// 成功
			echo 1;
		}else{

			// 失败
			echo 2;
		}
		
	}else if($type==="cpass"){

		// 修改密码

		$original = addslashes($_POST['original']);
		$new = addslashes($_POST['new']);

		// 查询原密码是否正确
		$sql = "select E_PassWord from employee WHERE E_No = $id";
		$result = $db->fetchOne($sql);

		if($original != $result["E_PassWord"]) { 

			// 原密码不匹配
			echo 1;
			exit();
		}else if($original === $result["E_PassWord"]){

			$sql = "update employee set E_PassWord='$new' WHERE E_No=$id";
			$result = $db->IDA($sql);

			if($result==1){
				
				// 成功
				echo 2;
			}else{

				// 失败
				echo 3;
			}
		}
		
	}else if($type==="login"){

		$password = addslashes($_POST['password']);

		$sql = "select E_RNo,E_PassWord from employee WHERE E_No = $id";
		$result = $db->fetchOne($sql);

		if(empty($result)){

			// 工号不存在
			echo 5;
			exit();
		}

		if($password != $result["E_PassWord"]) { 

			// 密码错误
			echo 4;
			exit();
		}

		$rank = $result["E_RNo"];

		if($rank === "4"||$rank === "3"){
			// 员工
			echo 1;
		}else if($rank === "2"){
			// 副经理
			echo 2;
		}else if($rank === "1"){
			// 经理
			echo 3;
		}
		
	}else if($type==="add"){

		$name = addslashes($_POST['name']);
		$age = addslashes($_POST['age']);
		$sex = addslashes($_POST['sex']);
		$tel = addslashes($_POST['tel']);
		$depart = (int)addslashes($_POST['depart']);
		$rank = (int)addslashes($_POST['rank']);

		if($sex==="1"){
			$sex = "男";
		}else{
			$sex = "女";
		}

		$sql = "SELECT E_No FROM employee WHERE E_RNo=$rank AND E_RPartNo=$depart ORDER BY E_No DESC LIMIT 0,1";
		$result = $db->fetchOne($sql);
		
		// 生成新用户的工号
		$idNumber = (int)($result["E_No"]) + 1;

		$sql = "INSERT INTO Employee VALUES ($idNumber,'$name', '$sex', $age, '$tel', '123456', $rank, $depart)";

		$result = $db->IDA($sql);

		if($result){

			// 添加成功
			echo 1;
		}else{

			// 失败
			echo 2;
		}

	}
	
	

	
	

	
	

	