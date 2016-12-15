<?php
	require_once("./db.class.php");  

	header('Access-Control-Allow-Origin:*');   
	header('Access-Control-Allow-Headers:x-requested-with,content-type');
	header("Content-Type:application/json");

	// 工号
	$id = $_POST['id'];
	
	$sql = "select E_RNo,E_RPartNo from employee WHERE E_No=$id";
	$result = $db->fetchOne($sql);
	$type = $result["E_RNo"];
	$department = $result["E_RPartNo"];

	if($type==="1"){

		// 经理
		$result = array();

		for($i=1;$i<=12;$i++){

			$sql = "select distinct E_No, E_Name, E_Sex,E_Age, E_Tel, R_No, At_LateTimes, At_AbsentTimes, At_DeductMoney,R_PartName, R_BaseSalary, At_DeductMoney, S_TotalSalary,S_Reward, S_Month from Employee, Rank, Allowance, Attendance, Salary where  Al_Month = $i and E_RNo = R_No and E_RPartNo = R_PartNo and E_No = At_ENo and E_No = Al_ENo and E_No = S_ENo and Al_Month = At_Month and Al_Month = S_Month";

			$res = $db->fetchAll($sql);
			if(!empty($res)){
				$result[$i] = $res;
			}
		}

		echo json_encode($result);

	}else if($type==="2"){

		// 副经理
		$result = array();

		for($i=1;$i<=12;$i++){

			$sql = "select distinct E_No, E_Name, E_Sex, E_Age, E_Tel, R_No, At_LateTimes, At_AbsentTimes, At_DeductMoney,R_PartName, R_BaseSalary, At_DeductMoney, S_TotalSalary, S_Month,S_Reward from Employee, Rank, Allowance, Attendance, Salary where E_RPartNo = $department and Al_Month = $i and  E_RNo = R_No and E_RPartNo = R_PartNo and E_No = At_ENo and E_No = Al_ENo and E_No = S_ENo and Al_Month = At_Month and Al_Month = S_Month";

			$res = $db->fetchAll($sql);
			if(!empty($res)){
				$result[$i] = $res;
			}
		}

		echo json_encode($result);
	}


	
	
	

	
	

	
	

	