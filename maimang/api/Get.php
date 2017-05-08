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

		$this->handleFirst  = "album";
		$this->handleSecond  = "hot";
		$this->handleThird  = "teacher";
		$this->handleFourth  = "person";
		$this->handleFifth  = "classes";
		$this->handleSixth  = "article";
		
		if($request->getService() == $this->handle){	

			// 处理具体需求
			if($request->getConcrete() == $this->handleFirst){	

				$this->getAlbum();
			} 
			else if ($request->getConcrete() == $this->handleSecond){

				$this->getHot();
			}
			else if ($request->getConcrete() == $this->handleThird){
				
				$this->getTeacher();
			}
			else if ($request->getConcrete() == $this->handleFourth){
				
				$this->getPerson();
			}
			else if ($request->getConcrete() == $this->handleFifth){
				
				$this->getClassInfo();
			}
			else if ($request->getConcrete() == $this->handleSixth){
				
				$this->getArticle();
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

	public function getTeacher(){
		$sql = "SELECT * FROM teachers";
		$result = $this->dataBaseHandle->fetchAll($sql);
		echo json_encode($result);
	}

	public function getPerson(){
		$getPersonSql = "SELECT * FROM person ORDER BY id DESC";
		$personList = $this->dataBaseHandle->fetchAll($getPersonSql);

		$len = count($personList);
		$array = array();

		for ($i = 0; $i < $len; $i++) {
			$singlePerson = $personList[$i];
			$single = array();

			$id = $singlePerson["id"];
			$personPic = "SELECT * FROM personpic WHERE personid = $id";
			$personPicList = $this->dataBaseHandle->fetchAll($personPic);

			$single = array(
				"id"    => $singlePerson["id"],
				"name"  => $singlePerson["name"],
				"intro" => $singlePerson["intro"],
				"imgsrc" => $singlePerson["imgsrc"],
				"pic"   => $personPicList
			);	

			$array[$i] = $single;
		}

		echo json_encode($array);
	}

	public function getClassInfo(){
		$sql = "SELECT * FROM classlink";
		$result = $this->dataBaseHandle->fetchAll($sql);
		echo json_encode($result);
	}

	public function getArticle(){
		$id = $_GET["id"];
		if (empty($id)) {
			$id = 1;
		}
		$sql = "SELECT * FROM article WHERE id = $id";
		$result = $this->dataBaseHandle->fetchAll($sql);
		echo json_encode($result);
	}
}