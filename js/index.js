function viewUrl(searchWord) {
	//var url = "https://www.google.com/search?q="+searchWord+"&num=20&pws=0&safe=off&hl=zh-CN&gl=sg&aq=f"
	//+"&as_sitesearch="+site.value+"&as_qdr="+btntime.value;
	var url = "https://search.yuege.site/search?q=" + searchWord;
	//num显示结果页数；pws个性化搜索；safe安全过滤；hl界面语言；gl区域
	window.location.href = url;
	// window.open( url );
	// location.href= url;
}

//搜索框回车事件
document.querySelector('#search').addEventListener('keydown', (e) => {
	//input回车
	var keycode = e.which;
	var searchword = document.getElementById("search");
	if (keycode == 13) //回车键是13
	{
		viewUrl(searchword.value);//回车后的响应函数
	}
})
//搜索框聚焦时背景模糊
document.querySelector('#search').addEventListener('focus', (e) => {
	const bg = document.getElementById("show");
	// bg.style.transform = "scale(1.1)";
	bg.style.filter = "blur(8px)";
	to = 300;
})
//搜索框失焦时背景清晰
document.querySelector('#search').addEventListener('blur', (e) => {
	const bg = document.getElementById("show");
	// bg.style.transform = "scale(1.0)";
	bg.style.filter = "blur(0px)";
	to = 99999999;
})

//得到时间并写入div
function getTime() {
	//获取当前时间
	const date = new Date();
	const h = date.getHours();
	let m = date.getMinutes();
	m = m < 10 ? '0' + m : m;
	var ti = document.getElementById("timeText");
	ti.innerHTML = h + ":" + m;
}
//使用定时器每秒向div写入当前时间
setInterval("getTime()", 1000);

document.addEventListener('contextmenu', function (e) { e.preventDefault() });//禁用鼠标右键

function setAward(data) {
	document.getElementById("text").innerHTML = data.hitokoto;
	if (data.from_who != null) {
		document.getElementById("from").innerHTML = "——" + data.from_who + "「" + data.from + "」";
	} else {
		document.getElementById("from").innerHTML = "——" + "「" + data.from + "」";
	}
}

Promise.resolve().then(() => {
	const _hitokoto = localStorage.getItem('hitokoto')
	const _data = _hitokoto ? JSON.parse(_hitokoto) : null
	const nowTime = new Date().getTime()
	if (_data && nowTime - _data.saveTime < 300 * 1000) {
		setAward(_data)
	} else {
		var xhr = new XMLHttpRequest();
		xhr.open('get', 'https://v1.hitokoto.cn/?c=i&c=d&c=h');
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				const data = JSON.parse(xhr.responseText);
				data.saveTime = new Date().getTime()
				localStorage.setItem('hitokoto', JSON.stringify(data))
				setAward(data)
			}
		}
		xhr.send();
	}
})
