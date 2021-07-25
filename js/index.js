function keyDown(e){
	//input回车  
	  var keycode = e.which;
	   var searchword = document.getElementById("search");
	  if (keycode == 13 ) //回车键是13 
	  { 
	      viewUrl(searchword.value);//回车后的响应函数             
	  } 
	}
	
	function viewUrl(searchWord){
		var bt1 = document.getElementById("lr");
		var bt2 = document.getElementById("intext");
		var btntime = document.getElementById("time");
		var site = document.getElementById("site");
		//var url = "https://www.google.com/search?q="+searchWord+"&num=20&pws=0&safe=off&hl=zh-CN&gl=sg&aq=f"
		//+"&as_sitesearch="+site.value+"&as_qdr="+btntime.value;
		var url = "https://duckduckgo.com/?q="+searchWord"+"&kp=-2";
		if(bt1.className=="on"){
			url = "https://www.google.com/search?q="+searchWord+"&num=20&pws=0&safe=off&hl=zh-CN&gl=sg&aq=f"
			+"&as_sitesearch="+site.value+"&as_qdr="+btntime.value+"&lr=lang_zh-CN";
		}
		if(bt2.className=="on"){
			url = "https://www.google.com/search?q="+"intext:"+searchWord+" intitle:"+searchWord+"&num=20&pws=0&safe=off&hl=zh-CN&gl=sg&aq=f"
			+"&as_sitesearch="+site.value+"&as_qdr="+btntime.value;
		}
		if(bt1.className=="on"&&bt2.className=="on"){
			url = "https://www.google.com/search?q="+"intext:"+searchWord+" intitle:"+searchWord+"&num=20&pws=0&safe=off&hl=zh-CN&gl=sg&aq=f"
			+"&as_sitesearch="+site.value+"&lr=lang_zh-CN"+"&as_qdr="+btntime.value;
		}
			
		//num显示结果页数；pws个性化搜索；safe安全过滤；hl界面语言；gl区域
		window.location.href= url;
		// window.open( url );
		// location.href= url;

	}
	var to = 99999999;
	//得到时间并写入div
	function getTime(){
	    //获取当前时间
	    var date = new Date();
		var h=date.getHours();
		var m=date.getMinutes();
		m=checkTime(m);
		var ti = document.getElementById("timeText");
		ti.innerHTML = h+":"+m;
		ti.style.fontSize="37px";
		if(to==99999999){
			ti.style.fontSize = "36px";
		}
		setTimeout(function(){
			var ti = document.getElementById("timeText");
			ti.style.fontSize="36px";
		},to);
	}
	function checkTime(i){
	if (i<10) 
	  {i="0" + i}
	  return i
	}
	//使用定时器每秒向div写入当前时间
	setInterval("getTime()",1000);
	
	function onfocusbg(){
		var bg = document.getElementById("show");
		
		bg.style.transform = "scale(1.1)";
		bg.style.filter = "blur(8px)";
		to = 300;
		
		
	}
	function onblurbg(){
		var bg = document.getElementById("show");
		bg.style.transform = "scale(1.0)";
		bg.style.filter = "blur(0px)";
		to = 99999999;
		
	}
	
	function onloadbody(){
		document.getElementById("time").options[0].selected = true;
	}
	function checkbtntime(){
		var btntime = document.getElementById("time");
		btntime.onchange = function(){
			if(btntime.value!="null"){
				btntime.style.backgroundColor = "rgba(255,255,255,0.7)";
			}
			else if(btntime.value=="null"){
				btntime.style.backgroundColor = "rgba(255,255,255,0.4)"
			}
		}
	}
	setInterval("checkbtntime()",300);
	function onfocussite(){
		var site = document.getElementById("site");
		site.style.backgroundColor = "rgba(255,255,255,0.7)";
	}
	function onblursite(){
		var site = document.getElementById("site");
			if(site.value!=""){
				site.style.backgroundColor = "rgba(255,255,255,0.7)";
			}else{
				site.style.backgroundColor = "rgba(255,255,255,0.4)";
			}
	}
	function bt1onclick(){
		var bt1 = document.getElementById("lr");
				if(bt1.className=="off"){ 
				    bt1.className = "on";
				}else{
				    bt1.className = "off";
				}
	}
	function bt2onclick(){
		var bt2 = document.getElementById("intext")
				if(bt2.className=="off"){ 
				    bt2.className = "on";
				}else{
				    bt2.className = "off";
				}
	}
	function resetonclick(){
			var submit = document.getElementById("submit");
			var bt1 = document.getElementById("lr");
			var bt2 = document.getElementById("intext");
			var btntime = document.getElementById("time");
			var site = document.getElementById("site");
				bt1.className = "off";
				bt2.className = "off";
				btntime.options[0].selected = true;
				site.value = "";
				site.style.backgroundColor = "rgba(255,255,255,0.4)";
				btntime.style.backgroundColor = "rgba(255,255,255,0.4)"
	}
	function submitonclick(){
				var searchword = document.getElementById("search");
				 viewUrl(searchword.value);
	}
	function timeclick(){
		var condiv = document.getElementById("searchCondition");
			
			if(condiv.className=="false"){
				condiv.className = "true";
				condiv.style.display = "block";
			}
			else{
				condiv.className = "false"
				condiv.style.display = "none";
			}
	}
	
	document.addEventListener('contextmenu',function(e){e.preventDefault()});//禁用鼠标右键
	var xhr = new XMLHttpRequest();
	xhr.open('get', 'https://v1.hitokoto.cn/?c=i&c=d&c=h');
	xhr.onreadystatechange = function () {
	  if (xhr.readyState === 4) {
	    var data = JSON.parse(xhr.responseText);
				  document.getElementById("text").innerHTML = data.hitokoto;
				  if(data.from_who!=null){
					   document.getElementById("from").innerHTML = "——" + data.from_who + "「" + data.from + "」";
				  }else{
					  document.getElementById("from").innerHTML = "——" + "「" + data.from + "」";
				  }
	  }
	}
	xhr.send();
