<?php
header('Content-Type:application/json');

class Article extends Handler 
{
	public function setSuccessor($nextService)
	{
		$this->successor = $nextService;
	}

	public function handleRequest($request)
	{
		// 数据库操作句柄
		$this->dataBaseHandle = $request->getDataBaseHandle();

		$this->handle = "article";

		$this->handleFirst  = "getClass";
		$this->handleSecond  = "addBook";
		
		if($request->getService()==$this->handle){	

			if($request->getConcrete()==$this->handleFirst){	

				// 得到文章分类
				$this->getClass();
			}
			elseif ($request->getConcrete()==$this->handleSecond) {
				
				// 添加文章
				$this->addBook();
			}
		}
		elseif($this->successor!=NULL){

			// 传递给下一个
			$this->successor->handleRequest($request);
		}
	}

	public function getClass(){
		$sql = "select * from articleclass";
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
}