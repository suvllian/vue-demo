<?php
	require_once("./db.class.php");  

	header('Access-Control-Allow-Origin:*');   
	header('Access-Control-Allow-Headers:x-requested-with,content-type');
	header("Content-Type:application/json");

	// 工号
	$id = $_POST['id'];
	$type = $_POST['type'];

	if($type==="base"){

		// 取出工号，姓名，性别，年龄，电话，部门名称，等级名称，部门号，等级基本工资
		$sql = "select E_No, E_Name, E_Sex, E_Age, E_Tel, R_PartName,R_Name , R_PartNo , R_BaseSalary from employee, rank where E_No = $id and E_RNo = R_No and E_RPartNo = R_PartNo";

		$result = $db->fetchAll($sql);
		echo json_encode($result);
	}else if($type==="more"){

		$sql1 = "select distinct Al_Kind, Al_Reward,Al_Time, Al_Month from employee, Allowance where E_No = $id and E_No = Al_ENo";

		$sql2 = "select distinct At_LateTimes, At_AbsentTimes, At_DeductMoney, At_Month from employee, Attendance where E_No = $id and E_No = At_ENo";

		$sql3 = "select Al_Reward, At_DeductMoney, S_TotalSalary, S_Month from employee, rank, Allowance, Attendance, Salary
	where E_No = $id and E_RNo = R_No and E_RPartNo = R_PartNo and Al_ENo = E_No and At_ENo = E_No and S_ENo = E_No and At_Month = Al_Month and S_Month = Al_Month and S_Month = At_Month";

		
		$result1 = $db->fetchAll($sql1);
		$result2 = $db->fetchAll($sql2);
		$result3 = $db->fetchAll($sql3);

		// 将每个sql查询操作拼接成二维数组再编码成json进行传输
		$rows = array();   
        $rows[0] = $result1;
        $rows[1] = $result2;
        $rows[2] = $result3;

		echo json_encode($rows);
	}else if($type==="depart"){

		// 取出部门相关信息

		$result = array();
		

		for($i=1;$i<=4;$i++){

			$sql1 = "select first.E_Name, first.E_Tel, first.E_RPartNo,COUNT(second.E_Name) FROM employee first,employee second WHERE first.E_RNo=1 AND first.E_RPartNo=$i AND second.E_RPartNo=$i";

			$res1 = $db->fetchAll($sql1);
			$res = $res1;
			for($j=1;$j<=12;$j++){

				$sql2 = "select SUM(R_BaseSalary), SUM(Al_Reward), SUM(At_DeductMoney), S_Month from employee, rank, Allowance, Attendance, Salary where E_RPartNo = $i and E_RNo = R_No and E_RPartNo = R_PartNo and Al_ENo = E_No and At_ENo = E_No and S_ENo = E_No and At_Month =$j AND At_Month = Al_Month and S_Month = Al_Month and S_Month = At_Month";

				$res2 = $db->fetchAll($sql2);

				if(!empty($res2)){
					$res = array_merge($res,$res2);
				}
			}

			if(!empty($res)){
				$result[$i] = $res;
			}
		}
		
		echo json_encode($result);
	}else if($type==="serach"){

		// 搜索一个员工的信息

		$value = $_POST['value'];
		$result = array();

		if($value[0]==="1"){
			for($i=1;$i<=12;$i++){
				$sql = "select distinct E_No, E_Name, E_Sex,E_Age, E_Tel, R_No, At_LateTimes, At_AbsentTimes, At_DeductMoney, R_BaseSalary, At_DeductMoney, S_TotalSalary, S_Month from Employee, Rank, Allowance, Attendance, Salary where  Al_Month = $i and E_RNo = R_No and E_RPartNo = R_PartNo and E_No = At_ENo and E_No = Al_ENo and E_No = S_ENo and Al_Month = At_Month and Al_Month = S_Month and E_No=$value";

				$res = $db->fetchAll($sql);
				if(!empty($res)){
					$result[$i] = $res;
				}
			}
		}else{
			for($i=1;$i<=12;$i++){
				$sql = "select distinct E_No, E_Name, E_Sex,E_Age, E_Tel, R_No, At_LateTimes, At_AbsentTimes, At_DeductMoney, R_BaseSalary, At_DeductMoney, S_TotalSalary, S_Month from Employee, Rank, Allowance, Attendance, Salary where  Al_Month = $i and E_RNo = R_No and E_RPartNo = R_PartNo and E_No = At_ENo and E_No = Al_ENo and E_No = S_ENo and Al_Month = At_Month and Al_Month = S_Month and E_Name like '%$value%'";

				$res = $db->fetchAll($sql);
				if(!empty($res)){
					$result[$i] = $res;
				}
			}
		}

		echo json_encode($result);

	}else if($type==="sdepart"){

		// Boss查询部门信息
		$value = $_POST['value'];

		$result = array();

		for($i=1;$i<=12;$i++){

			$sql = "select distinct E_No, E_Name, E_Sex,E_Age, E_Tel, R_No, At_LateTimes, At_AbsentTimes, At_DeductMoney,R_PartName, R_BaseSalary, At_DeductMoney, S_TotalSalary, S_Month from Employee, Rank, Allowance, Attendance, Salary where  Al_Month = $i and E_RNo = R_No and E_RPartNo = R_PartNo and E_No = At_ENo and E_No = Al_ENo and E_No = S_ENo and Al_Month = At_Month and Al_Month = S_Month and  R_PartName='$value'";

			$res = $db->fetchAll($sql);
			if(!empty($res)){
				$result[$i] = $res;
			}
		}

		echo json_encode($result);

	}else if($type==="year"){

		$result = array();

		for($i=1;$i<=4;$i++){

			// 查询出一个部门的所有工号
			$sql = "SELECT E_No FROM employee WHERE E_RPartNo = $i";
			$res1 = $db->fetchAll($sql);

			$res = array();
			for($j=0;$j<count($res1);$j++){
				$id = $res1[$j]["E_No"];

				$sql2 = "SELECT SUM(R_BaseSalary) , SUM(Al_Reward) , E_No, E_Name, E_Tel, R_Name FROM employee, rank, Allowance, Attendance, Salary WHERE E_No = $id AND E_RNo = R_No AND E_RPartNo = R_PartNo AND Al_ENo = E_No AND At_ENo = E_No AND S_ENo = E_No AND At_Month = Al_Month AND S_Month = Al_Month AND S_Month = At_Month";
				$res2 = $db->fetchAll($sql2);

				$res = array_merge($res,$res2);
			}

			if(!empty($res)){
				$result[$i] = $res;
			}

		}
		echo json_encode($result);


	}
	
		