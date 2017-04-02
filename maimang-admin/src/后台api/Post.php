<?php
header('Content-Type:application/json');

session_save_path(dirname(__FILE__).'/sess/');
@session_start();

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

		$this->handleFirst   = "delete";
		$this->handleSecond  = "addarticle";
		$this->handleThird   = "uploadimage";
		$this->handleFourth  = "changealbum";
		$this->handleFifth   = "login";
		$this->handleSixth   = "changeteacher";
		$this->handleEighth  = "addteacher";
		$this->handleNinth   = "changeclass";
		$this->handleTenth   = "changepersonsrc";
		$this->handleEleven  = "changeperson";
		$this->handleTwelfth = "addperson";
		
		if($request->getService() == $this->handle){	

			if($request->getConcrete() == $this->handleFirst){	

				$this->delete();
			}else if($request->getConcrete() == $this->handleSecond){

				$this->addArticle();
			}else if($request->getConcrete() == $this->handleThird){

				$this->uploadImage();
			}else if($request->getConcrete() == $this->handleFourth){

				$this->changeAlbum();
			}
			else if($request->getConcrete() == $this->handleFifth){

				$this->login();
			}
			else if($request->getConcrete() == $this->handleSixth){

				$this->changeTeacher();
			}
			else if($request->getConcrete() == $this->handleEighth){

				$this->addTeacher();
			}
			else if($request->getConcrete() == $this->handleNinth){

				$this->changeClasses();
			}
			else if($request->getConcrete() == $this->handleTenth){

				$this->changePersonSrc();
			}
			else if($request->getConcrete() == $this->handleEleven){

				$this->changePerson();
			}
			else if($request->getConcrete() == $this->handleTwelfth){

				$this->addPerson();
			}
		}
		elseif($this->successor!=NULL){

			// 传递给下一个
			$this->successor->handleRequest($request);
		}
	}


	public function delete(){
		$id = addslashes($_POST["id"]);
		$tableName = addslashes($_POST["table"]);
		if (isset($id)){
			$sql = "DELETE FROM $tableName WHERE id='$id'";
			$result = $this->dataBaseHandle->query($sql);
			echo $result;
		}	
	}

	public function changeAlbum(){
		$id = addslashes($_POST["id"]);
		$intro = addslashes($_POST["intro"]);
		$src = addslashes($_POST["src"]);

		if (isset($id)){
			$sql = "UPDATE content SET intro='$intro', src='$src' WHERE cId='$id'";
			$result = $this->dataBaseHandle->query($sql);
			echo $result;
		}	
	}

	public function addArticle(){
		$content = addslashes($_POST["content"]);
		$title = addslashes($_POST["title"]);

		if (isset($content)){
			$sql = "INSERT INTO article(title, content, isShow) VALUES('$title','$content', 1)";
			$result = $this->dataBaseHandle->query($sql);
			echo $result;
		}	
	}

	public function changeClasses(){
		$id = addslashes($_POST["id"]);
		$name = addslashes($_POST["name"]);
		$src = addslashes($_POST["src"]);

		if (isset($id)){
			$sql = "UPDATE classlink SET name='$name', src='$src' WHERE id='$id'";
			$result = $this->dataBaseHandle->query($sql);
			echo $result;
		}	
	}

	public function changeTeacher(){
		$id    = addslashes($_POST["id"]);
		$intro = addslashes($_POST["intro"]);
		$name  = addslashes($_POST["name"]);
		if (isset($id)){
			$sql = "UPDATE teachers SET intro='$intro', name = '$name' WHERE id='$id'";
			$result = $this->dataBaseHandle->query($sql);
			echo $result;
		}	
	}

	public function changePersonSrc(){
		$id    = addslashes($_POST["id"]);
		$src = addslashes($_POST["src"]);
		if (isset($id)){
			$sql = "UPDATE personpic SET src='$src' WHERE id=$id";
			$result = $this->dataBaseHandle->query($sql);
			echo $result;
		}	
	}

	public function changePerson(){
		$id    = addslashes($_POST["id"]);
		$name = addslashes($_POST["name"]);
		$intro = addslashes($_POST["intro"]);
		if (isset($id)){
			$sql = "UPDATE person SET name='$name', intro='$intro' WHERE id=$id";
			$result = $this->dataBaseHandle->query($sql);
			echo $result;
		}	
	}

	public function addTeacher(){
		$id    = addslashes($_POST["id"]);
		$intro = addslashes($_POST["intro"]);
		$name  = addslashes($_POST["name"]);
		$src   = "./static/teacher-".$id.".jpg";

		if (isset($id)){
			$sql = "INSERT INTO teachers(id, name, intro, src) VALUES($id, '$name', '$intro', '$src')";
			$result = $this->dataBaseHandle->query($sql);
			echo $result;
		}	
	}

	public function addPerson(){
		$id    = addslashes($_POST["id"]);
		$intro = addslashes($_POST["intro"]);
		$name  = addslashes($_POST["name"]);

		if (isset($id)){
			$sql = "INSERT INTO person(id, name, intro) VALUES($id, '$name', '$intro')";
			$result = $this->dataBaseHandle->query($sql);
			echo $result;
		}	
	}

	public function login(){
		$name = addslashes($_POST["name"]);
		$password = addslashes($_POST["pass"]);
		if (isset($name)){
			$sql = "SELECT pass FROM admin WHERE name='$name'";
			$result = $this->dataBaseHandle->fetchOne($sql);
			if (md5($password) === $result["pass"]) {
				$_SESSION['maimang'] = 'admin';
				$result = array("name"=>"success");
				echo json_encode($result);
			} else{
				echo "";
			}
		}	
	}

	public function uploadImage(){
		$image = $_POST["image"];
		$name  = $_POST["name"];

		list($type, $data) = explode(',', $image);
		
		$extend = '';
		// 获取类型
		if (strstr($type, 'image/jpeg') != ''){
			$extend = '.jpg';
		} elseif (strstr($type, 'image/gif') != '') {
			$extend = '.gif';
		} elseif (strstr($type, 'image/png') != '') {
			$extend = '.png';
		}

		$photo = $name.$extend;

		// 文件路径及文件名
		$relaPath = "./";

		// 生成文件  
		$result = file_put_contents($relaPath.$photo, base64_decode($data), true);
		if ($result > 0) { 
			echo 1;
		}
		else { 
			echo 2;
		}
	}
}