<?php
header('Content-Type:application/json');

class Post extends Handler 
{
	public function setSuccessor($nextService)
	{
		$this->successor = $nextService;
	}

	public function handleRequest($request)
	{
		// 数据库操作句柄
		$this->dataBaseHandle = $request->getDataBaseHandle();

		$this->handle = "post";

		$this->handleFirst  = "email";
		$this->handleSecond  = "join";

		
		if($request->getService() == $this->handle){	

			if($request->getConcrete() == $this->handleFirst){	
				$this->saveEmail();
			}

			else if($request->getConcrete() == $this->handleSecond){	
				$this->saveJoin();
			}
		}
		elseif($this->successor!=NULL){

			// 传递给下一个
			$this->successor->handleRequest($request);
		}
	}


	public function saveEmail(){
		$email = addslashes($_POST["email"]);
		if (isset($email)){
			$sql = "INSERT INTO email(email) VALUES('$email')";
			$result = $this->dataBaseHandle->query($sql);
			echo $result;
		}	
	}

	public function saveJoin(){
		$name = addslashes($_POST["name"]);
		$company = addslashes($_POST["company"]);
		$teacher = addslashes($_POST["teacher"]);
		$email = addslashes($_POST["email"]);
		$allow = addslashes($_POST["allow"]);

		$sql = "INSERT INTO joinperson(name, company, teacher, connect, class) VALUES('$name', '$company', '$teacher', '$email', $allow)";
		$result = $this->dataBaseHandle->query($sql);
		echo $result;
	}
}