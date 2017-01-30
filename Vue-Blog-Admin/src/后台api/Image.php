<?php
header('Content-Type:application/json');

class Image extends Handler 
{
	public function setSuccessor($nextService)
	{
		$this->successor = $nextService;
	}

	public function handleRequest($request)
	{
		// 数据库操作句柄
		$this->dataBaseHandle = $request->getDataBaseHandle();

		$this->handle = "image";

		$this->handleFirst  = "allImage";
		$this->handleSecond = "addImage";
		$this->handleThird  = "getCity";
		$this->handleFourth = "addCity";
		$this->handleFifth = "changeImage";
		$this->handleSixth = "deleteImage";
		
		if($request->getService()==$this->handle){	

			// 处理具体需求
			if($request->getConcrete()==$this->handleFirst){	

				// 显示所有图片
				$this->showAllImage();
			}
			elseif($request->getConcrete()==$this->handleSecond){

				// 添加图片
				$this->addImage();
			}
			elseif($request->getConcrete()==$this->handleFifth){

				// 修改图片信息
				$this->changeImage();
			}
			elseif($request->getConcrete()==$this->handleSixth){

				// 删除图片
				$this->deleteImage();
			}
			elseif($request->getConcrete()==$this->handleThird){

				// 得到城市名
				$this->getCity();
			}
			elseif($request->getConcrete()==$this->handleThird){

				// 添加城市
				$this->addCity();
			}
		}
		elseif($this->successor!=NULL){

			// 传递给下一个
			$this->successor->handleRequest($request);
		}
	}

	public function showAllImage(){
		$page = (int)$_GET["page"] - 1;
		$page = $page * 8;
		$sql = "SELECT iId,iTopic,iImage,iContent,iShow,iDate,iLike,cName FROM travelImage,travelCity WHERE iCity=cId LIMIT $page,8";
		$result = $this->dataBaseHandle->fetchAll($sql);
		echo json_encode($result);
	}

	public function addImage(){
		$topic     = addslashes(trim($_POST["topic"]));
		$content   = addslashes(trim($_POST["content"]));
		$imageName = addslashes(trim($_POST["imageName"]));
		$city      = (int)addslashes(trim($_POST["city"]));
		$date      = mktime();

		$sql = "INSERT INTO travelimage (iTopic,iImage,iContent,iCity,iDate) VALUES('$topic','$imageName', '$content', $city,$date)";
		$result = $this->dataBaseHandle->IDA($sql);

		if($result){  

			// 添加成功
			echo 1;
		}else{

			// 失败
			echo 2;
		}
	}

	public function changeImage(){
		$content  = $_POST["content"];

		$iId      = (int)$content["iId"];
		$iContent = $content["iContent"];
		$iTopic = $content["iTopic"];
		$iImage   = $content["iImage"];
		$iShow    = (int)$content["iShow"];
		$sql = "UPDATE travelimage SET iContent='$iContent',iImage='$iImage',iTopic='$iTopic',iShow=$iShow WHERE iId=$iId";
		$result = $this->dataBaseHandle->IDA($sql);

		if($result){

			// 成功
			echo 1;
		}else{

			// 失败
			echo 2;
		}
	}

	public function deleteImage(){
		$iId = (int)$_POST["iId"];

		$sql = "DELETE FROM travelimage WHERE iId=$iId";
		$result = $this->dataBaseHandle->IDA($sql);
		
		if($result){

			// 成功
			echo 1;
		}else{

			// 失败
			echo 2;
		}
	}

	public function getCity(){
		$sql = "SELECT * FROM travelCity";
		$result = $this->dataBaseHandle->fetchAll($sql);
		echo json_encode($result);
	}

	public function addCity(){
		$city     = addslashes(trim($_POST["city"]));
		$sql = "INSERT INTO travelcity (cName) VALUES('$city')";
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