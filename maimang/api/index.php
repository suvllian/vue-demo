<?php
header('Access-Control-Allow-Origin:*');   
header('Access-Control-Allow-Headers:x-requested-with,content-type');  

function __autoload($ClassName)
{
	include $ClassName.".php";
}

class Client
{
	private $queryNow;
	private $doType;

	public function __construct()
	{
		// 判断请求类型
		if(isset($_POST["do"])){
			$this->doType = addslashes(trim($_POST["do"]));
			$this->doConcrete = addslashes(trim($_POST["concrete"]));
		}else if(isset($_GET["do"])){
			$this->doType = addslashes(trim($_GET["do"]));
			$this->doConcrete = addslashes(trim($_GET["concrete"]));
		}else{
			return false;
		}

		if (isset($this->doType)) {
			$this->query    = $this->doType;
			$this->concrete = $this->doConcrete;
		}

		$get = new Get();
		$post  = new Post();

		// // 设置后继
		$get->setSuccessor($post);
	
		// 生成处理器加载请求
		$LoadUp = new Request($this->query,$this->concrete);
		$get->handleRequest($LoadUp);
	}
}

$MakeRequest = new Client();