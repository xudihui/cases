
<!DOCTYPE html>
<html >
	<head>
	<meta charset="gbk">
	<title>项目索引页</title>
	<meta name="keywords" content="">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	</head>
	<body>
	<style type="text/css">
	body{
	font-family: '微软雅黑';
    background: #f8f8f8	
	}
	*{padding:0;margin:0;font-family:"Hiragino Sans GB","Microsoft YaHei","simsun","Helvetica Neue", Arial, Helvetica, sans-serif;}
	a{font-size:14px;width:100%;line-height:3;border-top:1px solid #fff;border-bottom:1px solid #ccc;display:block;text-indent:1em;color:#666;text-decoration:none}
	a:hover{font-size:14px;background:#f1f1f1;color:#000}
	span{color:#bbb
	animation: topbtnfadeout 1.5s ease-out infinite;
	-webkit-animation: topbtnfadeout 1.5s ease-out infinite;
	-moz-animation: topbtnfadeout 1.5s ease-out infinite;
	}
		
	@keyframes topbtnfadeout {
		from {
			padding-left: 10px;
			opacity: 1;
		}
		to {
			padding-left: 30px;
			opacity: 0;
		}
	}
	@-webkit-keyframes topbtnfadeout {
		from {
			padding-left: 10px;
			opacity: 1;
		}
		to {
			padding-left: 30px;
			opacity: 0;
		}
	}
	@-moz-keyframes topbtnfadeout {
		from {
			padding-left: 10px;
			opacity: 1;
		}
		to {
			padding-left: 30px;
			opacity: 0;
			display: none;
		}
	}
	</style>
    <div id='wrap'>
	<a><b>点击下面导航进行访问:</b></a>

<?php 
//设定报错等级，如果是开源程序插件不需要设定
error_reporting(E_ERROR | E_PARSE);
//定义欲读取的目录路径，方便演示，本程序读取的是当前文件所在目录
$path = '.';
//获取文件列表数组
$files = ReadFolder($path);
//处理文件列表数组

foreach ($files as $value) {
//显示文件链接
if(substr_count($value,".html")>0){	

echo '<a title="点击查看 ' . substr_replace($value,"",-5) .  '" href="' . $value . '">' . substr_replace($value,"",-5) . '<span>>></span></a>';
}
}

/* 定义自定义函数 */
/**
 * 获取文件列表
 * 
 * @param string  $dir  欲读取的目录路径
 * @param boolean $mode 0：读取全部；1：仅读取文件；2：仅读取目录
 * @return array
 */
function ReadFolder($dir, $mode = 0) {
//如果打开目录句柄失败，则输出空数组
if (!$handle = @opendir($dir)) return array();
//定义文件列表数组
$files = array();
//遍历目录句柄中的条目
while (false !== ($file = @readdir($handle))) {
//跳过本目录以及上级目录
if ('.' === $file || '..' === $file) continue;
//是否仅读取目录
if ($mode === 2) {
if (isDir($dir . '/' . $file)) $files[] = $file;
//是否仅读取文件
} elseif ($mode === 1) {
if (isFile($dir . '/' . $file)) $files[] = $file;
//读取全部
} else {
$files[] = $file;
}
}
//关闭打开的目录句柄
@closedir($handle);
//输出文件列表数组
return $files;
}
/**
 * 判断输入是否为目录
 *
 * @param string $dir
 * @return boolean
 */
function isDir($dir) {
return $dir ? is_dir($dir) : false;
}
/**
 * 判断输入是否为文件
 *
 * @param string $file
 * @return boolean
 */
function isFile($file) {
return $file ? is_file($file) : false;
}
?>
	</div>
	</body>
</html>



	