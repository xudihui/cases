
<!DOCTYPE html>
<html >
	<head>
	<meta charset="gbk">
	<title>��Ŀ����ҳ</title>
	<meta name="keywords" content="">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	</head>
	<body>
	<style type="text/css">
	body{
	font-family: '΢���ź�';
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
	<a><b>������浼�����з���:</b></a>

<?php 
//�趨����ȼ�������ǿ�Դ����������Ҫ�趨
error_reporting(E_ERROR | E_PARSE);
//��������ȡ��Ŀ¼·����������ʾ���������ȡ���ǵ�ǰ�ļ�����Ŀ¼
$path = '.';
//��ȡ�ļ��б�����
$files = ReadFolder($path);
//�����ļ��б�����

foreach ($files as $value) {
//��ʾ�ļ�����
if(substr_count($value,".html")>0){	

echo '<a title="����鿴 ' . substr_replace($value,"",-5) .  '" href="' . $value . '">' . substr_replace($value,"",-5) . '<span>>></span></a>';
}
}

/* �����Զ��庯�� */
/**
 * ��ȡ�ļ��б�
 * 
 * @param string  $dir  ����ȡ��Ŀ¼·��
 * @param boolean $mode 0����ȡȫ����1������ȡ�ļ���2������ȡĿ¼
 * @return array
 */
function ReadFolder($dir, $mode = 0) {
//�����Ŀ¼���ʧ�ܣ������������
if (!$handle = @opendir($dir)) return array();
//�����ļ��б�����
$files = array();
//����Ŀ¼����е���Ŀ
while (false !== ($file = @readdir($handle))) {
//������Ŀ¼�Լ��ϼ�Ŀ¼
if ('.' === $file || '..' === $file) continue;
//�Ƿ����ȡĿ¼
if ($mode === 2) {
if (isDir($dir . '/' . $file)) $files[] = $file;
//�Ƿ����ȡ�ļ�
} elseif ($mode === 1) {
if (isFile($dir . '/' . $file)) $files[] = $file;
//��ȡȫ��
} else {
$files[] = $file;
}
}
//�رմ򿪵�Ŀ¼���
@closedir($handle);
//����ļ��б�����
return $files;
}
/**
 * �ж������Ƿ�ΪĿ¼
 *
 * @param string $dir
 * @return boolean
 */
function isDir($dir) {
return $dir ? is_dir($dir) : false;
}
/**
 * �ж������Ƿ�Ϊ�ļ�
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



	