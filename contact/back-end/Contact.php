<?php
header('Content-Type:application/json');
session_save_path(dirname(__FILE__).'/sess/');
@session_start();

class Contact extends Handler 
{
	public function setSuccessor($nextService)
	{
		$this->successor = $nextService;
	}

	public function handleRequest($request)
	{
		// 数据库操作句柄
		$this->dataBaseHandle = $request->getDataBaseHandle();

		$this->handle = "contact";

		$this->handleFirst  = "login";
		$this->handleSecond  = "add";
		$this->handleThrid  = "getList";
		$this->handleFourth  = "getSpecial";
		$this->handleFifth = "edit";
		$this->handleSixth = "search";
		
		if($request->getService() == $this->handle) {	

			if($request->getConcrete() == $this->handleFirst) {	

				$this->login();
			} elseif ($request->getConcrete() == $this->handleSecond) {

				$this->addUser();
			} elseif ($request->getConcrete() == $this->handleThrid) {
				
				$this->getList();
			} elseif ($request->getConcrete() == $this->handleFourth) {
				
				$this->getSpecial();
			} elseif ($request->getConcrete() == $this->handleFifth) {
				
				$this->editUser();
			} elseif ($request->getConcrete() == $this->handleSixth) {
				
				$this->search();
			}
		}
		elseif($this->successor!=NULL){

			$this->successor->handleRequest($request);
		}
	}

	public function login() {
		$username = addslashes(trim($_POST["username"]));
		$password = addslashes(trim($_POST["password"]));

		$result = array();

		if (empty($username) || empty($password)) {
			$result = array("errMsg" => "账号密码不完整", "success" => false);
		} else {
			if ($username === "penghuan" && $password === "159357") {
				$csrfToken = md5($username.$password.time());
				$_SESSION["csrf_token"] = $csrfToken;
				$result = array("success" => true, "csrf_token" => $csrfToken);
			} else {
				$result = array("errMsg" => "账号密码错误", "success" => false);
			}
		}

		echo json_encode($result);
	}

	public function addUser() {
		$name = addslashes(trim($_POST["name"]));
		$phone = addslashes(trim($_POST["phone"]));
		$describeText = addslashes(trim($_POST["describe_text"]));
		$corproation = addslashes(trim($_POST["corproation"]));
		$address = addslashes(trim($_POST["address"]));
		$email = addslashes(trim($_POST["email"]));
		$tag = addslashes(trim($_POST["tag"]));
		$adviceTimes = addslashes(trim($_POST["advice_times"]));
		$remark = addslashes(trim($_POST["remark"]));
		$csrfToken = addslashes(trim(@$_POST["csrf_token"]));

		$result = array();

		if (@$_SESSION["csrf_token"] === $csrfToken) {
			$sql = "INSERT INTO contact (name, phone, describe_text, corproation, address, email, tag, advice_times, remark) 
		      VALUES('$name', '$phone', '$describeText', '$corproation', '$address', '$email', '$tag', '$adviceTimes', '$remark')";
			$dbResult = $this->dataBaseHandle->IDA($sql);
			
			if($dbResult){
				$result = array("success" => true);
			}else{
				$result = array("success" => false);
			}
		} else {
			$result = array("errMsg" => "请先登录", "success" => false);
		}

		echo json_encode($result);
	}

	public function editUser() {
		$id = addslashes(trim($_POST["id"])) - 0;
		$name = addslashes(trim($_POST["name"]));
		$phone = addslashes(trim($_POST["phone"]));
		$describeText = addslashes(trim($_POST["describe_text"]));
		$corproation = addslashes(trim($_POST["corproation"]));
		$address = addslashes(trim($_POST["address"]));
		$email = addslashes(trim($_POST["email"]));
		$tag = addslashes(trim($_POST["tag"]));
		$adviceTimes = addslashes(trim($_POST["advice_times"]));
		$remark = addslashes(trim($_POST["remark"]));
		$csrfToken = addslashes(trim(@$_POST["csrf_token"]));

		if (@$_SESSION["csrf_token"] === $csrfToken) {
			$sql = "UPDATE contact SET name='$name', phone='$phone', describe_text='$describeText', corproation='$corproation', address='$address', email='$email', tag='$tag', advice_times='$adviceTimes', remark='$remark' WHERE id = $id";
			$dbResult = $this->dataBaseHandle->IDA($sql);
			$result = array();

			if($dbResult){
				$result = array("success" => true);
			}else{
				$result = array("success" => false);
			}
		} else {
			$result = array("errMsg" => "请先登录", "success" => false);
		}

		echo json_encode($result);
	}

	public function getList() {
		$pageIndex = addslashes(trim($_GET["pageIndex"]));
		$pageSize = addslashes(trim($_GET["pageSize"]));
		$csrfToken = addslashes(trim(@$_GET["csrf_token"]));
		$pageStart = ($pageIndex - 1) * $pageSize;

		$result = array();

		if (@$_SESSION["csrf_token"] === $csrfToken) {
			// $sql = "SELECT id, name FROM contact LIMIT $pageStart, $pageSize";
			$sql = "SELECT id, name FROM contact";
			$dbResult = $this->dataBaseHandle->fetchAll($sql);

			$result = array(
	      "data" => $dbResult,
	      "success" => true
			);
			
		} else {
			$result = array("errMsg" => "请先登录", "success" => false);
		}

		echo json_encode($result);
	}

	public function getSpecial() {
		$id = addslashes(trim($_GET["id"])) - 0;
		$csrfToken = addslashes(trim(@$_GET["csrf_token"]));

		$result = array();

		if (@$_SESSION["csrf_token"] === $csrfToken) {
			$sql = "SELECT * FROM contact WHERE id = $id";
			$dbResult = $this->dataBaseHandle->fetchOne($sql);

			$result = array(
	      "data" => $dbResult,
	      "success" => true
			);
			
		} else {
			$result = array("errMsg" => "请先登录", "success" => false);
		}

		echo json_encode($result);
	}

	public function search() {
		$infor = addslashes(trim($_GET["infor"]));
		$csrfToken = addslashes(trim(@$_GET["csrf_token"]));
		$tagArray = array("A" => 1, "B" => 2, "C" => 3, "T" => 4);
		$tag = 0;
		if (isset($tagArray[$infor])) {
			$tag = $tagArray[$infor];
		}

		$result = array();

		if (@$_SESSION["csrf_token"] === $csrfToken) {
			$sql = "SELECT * FROM contact WHERE name LIKE '%$infor%' OR tag = $tag";
			$dbResult = $this->dataBaseHandle->fetchAll($sql);

			$result = array(
	      "data" => $dbResult,
	      "success" => true
			);
			
		} else {
			$result = array("errMsg" => "请先登录", "success" => false);
		}

		echo json_encode($result);
	}

}