<?php
header('Content-Type:application/json');

class Get extends Handler 
{
	public function setSuccessor($nextService)
	{
		$this->successor = $nextService;
	}

	public function handleRequest($request)
	{
		// 数据库操作句柄
		$this->dataBaseHandle = $request->getDataBaseHandle();

		$this->handle = "get";
		$this->handleFirst   = "album";
		$this->handleSecond  = "hot";
		$this->handleThird   = "information";
		$this->handleFourth  = "number";
		$this->handleFifth = "getperson";
		
		if($request->getService()==$this->handle){	

			// 处理具体需求
			if($request->getConcrete()==$this->handleFirst){	

				$this->getAlbum();
			} 
			else if ($request->getConcrete()==$this->handleSecond){

				$this->getHot();
			}
			else if ($request->getConcrete()==$this->handleThird){

				$this->getInfor();
			}
			else if ($request->getConcrete()==$this->handleFourth){

				$this->getNumber();
			}
			else if ($request->getConcrete()==$this->handleFifth){

				$this->getPerson();
			}
		}
		elseif($this->successor!=NULL){

			// 传递给下一个
			$this->successor->handleRequest($request);
		}
	}

	public function getAlbum(){
		$sql = "SELECT * FROM content WHERE class = 1";
		$result = $this->dataBaseHandle->fetchAll($sql);
		echo json_encode($result);
	}

	public function getHot(){
		$sql = "SELECT * FROM content WHERE class = 2";
		$result = $this->dataBaseHandle->fetchAll($sql);
		echo json_encode($result);
	}

	public function getInfor(){
		$tableName = $_GET["table"];
		$sql = "SELECT * FROM $tableName ORDER BY id DESC";
		$result = $this->dataBaseHandle->fetchAll($sql);
		echo json_encode($result);
	}

	public function getNumber(){
		$tableName = $_GET["table"];
		$sql = "SELECT id FROM $tableName ORDER BY id DESC LIMIT 1";
		$result = $this->dataBaseHandle->fetchAll($sql);
		echo json_encode($result);
	}

	public function getPerson(){
		$page = $_GET["page"] - 1;
		$getPersonSql = "SELECT * FROM person ORDER BY id DESC LIMIT $page,1";
		$personList = $this->dataBaseHandle->fetchOne($getPersonSql);

		$array = array();
		$id = $personList["id"];
		$personPic = "SELECT * FROM personpic WHERE personid = $id";
		$personPicList = $this->dataBaseHandle->fetchAll($personPic);

		$array = array(
			"id"    => $personList["id"],
			"name"  => $personList["name"],
			"intro" => $personList["intro"],
			"imgsrc" => $personList["imgsrc"],
			"pic"   => $personPicList
		);	

		echo json_encode($array);
	}
}