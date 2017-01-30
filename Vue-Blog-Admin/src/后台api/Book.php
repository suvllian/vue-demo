<?php
header('Content-Type:application/json');

class Book extends Handler 
{
	public function setSuccessor($nextService)
	{
		$this->successor = $nextService;
	}

	public function handleRequest($request)
	{
		// 数据库操作句柄
		$this->dataBaseHandle = $request->getDataBaseHandle();

		$this->handle = "book";

		$this->handleFirst  = "allBook";
		$this->handleSecond = "addBook";
		$this->handleThird  = "getClass";
		$this->handleFourth = "addClass";
		$this->handleFifth = "changeBook";
		$this->handleSixth = "deleteBook";
		
		if($request->getService()==$this->handle){	
			
			if($request->getConcrete()==$this->handleFirst){	

				// 显示所有书籍
				$this->showAllBook();
			}
			elseif($request->getConcrete()==$this->handleSecond){

				// 添加书籍
				$this->addBook();
			}
			elseif($request->getConcrete()==$this->handleThird){

				// 得到书籍分类
				$this->getClass();
			}
			elseif($request->getConcrete()==$this->handleFifth){

				// 修改书籍信息
				$this->changeBook();
			}
			elseif($request->getConcrete()==$this->handleSixth){

				// 删除书籍
				$this->deleteBook();
			}
			elseif($request->getConcrete()==$this->handleFourth){

				// 添加书籍分类
				$this->addClass();
			}
		}
		elseif($this->successor!=NULL){

			// 传递给下一个
			$this->successor->handleRequest($request);
		}
	}

	public function showAllBook(){
		$page = (int)$_GET["page"] - 1;
		$page = $page*6;
		$sql = "SELECT iId,iBgLink,iName,iImage,iContent,iLike,iShow,iDate,cClass FROM bookinfor,bookclass WHERE iClass=cId LIMIT $page,8";
		$result = $this->dataBaseHandle->fetchAll($sql);
		echo json_encode($result);
	}

	public function addBook(){
		$name      = addslashes(trim($_POST["name"]));
		$bgLink    = addslashes(trim($_POST["bgLink"]));
		$content   = addslashes(trim($_POST["content"]));
		$imageName = addslashes(trim($_POST["imageName"]));
		$class     = (int)addslashes(trim($_POST["class"]));
		$date      = mktime();

		$sql = "INSERT INTO bookinfor (iBgLink,iName,iImage,iContent,iClass,iDate) VALUES('$bgLink','$name','$imageName', '$content', $class,$date)";
		$result = $this->dataBaseHandle->IDA($sql);

		if($result){
			// 添加成功
			echo 1;
		}else{
			// 失败
			echo 2;
		}
	}

	public function changeBook(){
		$content  = $_POST["content"];

		$iId      = (int)$content["iId"];
		$iContent = $content["iContent"];
		$iBgLink = $content["iBgLink"];
		$iName = $content["iName"];
		$iImage   = $content["iImage"];
		$iShow    = (int)$content["iShow"];
		$sql = "UPDATE bookinfor SET iContent='$iContent',iBgLink='$iBgLink',iImage='$iImage',iName='$iName',iShow=$iShow WHERE iId=$iId";
		$result = $this->dataBaseHandle->IDA($sql);

		if($result){

			// 成功
			echo 1;
		}else{

			// 失败
			echo 2;
		}
	}

	public function deleteBook(){
		$iId = (int)$_POST["iId"];

		$sql = "DELETE FROM bookinfor WHERE iId=$iId";
		$result = $this->dataBaseHandle->IDA($sql);
		
		if($result){

			// 成功
			echo 1;
		}else{

			// 失败
			echo 2;
		}
	}

	public function getClass(){
		$sql = "select * from bookclass";
		$result = $this->dataBaseHandle->fetchAll($sql);
		echo json_encode($result);
	}

	public function addClass(){
		$class     = addslashes(trim($_POST["class"]));
		if(!empty($class)){
			$sql = "INSERT INTO bookclass (cClass) VALUES('$class')";
			$result = $this->dataBaseHandle->IDA($sql);

			if($result){
				// 添加成功
				echo 1;
			}else{
				// 失败
				echo 2;
			}
		}	
	}
}