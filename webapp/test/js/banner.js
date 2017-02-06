/**
 * 
 */
/** 定义页面加载后js代码自动执行**/

window.onload=function(){
	
	//定义图片集合
	var pictureList=["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg"];
	//定义图片url集合
	var pictureUrlList=["www.baidu.com","www.qq.com","www.baidu.com","www.qq.com","www.qq.com"];
	//获取div标签
	var divContainer=document.getElementById("banner");
	//获取图片数量
	var picture=document.getElementById("pictrue").getElementsByTagName("li");
	//获取索引数量
	var num=document.getElementById("list").getElementsByTagName("li");
	var timer;
	//当前索引
	var index=0;
	
	//设置图片 -超链接
	for(var i=0;i<pictureList.length;i++){
		var temp =document.getElementById(i.toString());
		temp.src=pictureList[i];
		temp.href=pictureUrlList[i];
		
	}
	
	
	//定义一个自动播放函数
	
	timer=setInterval(autoPlay,3000);
	//定义鼠标焦点关注事件
	divContainer.onmouseover = function () {
		  clearInterval(timer);
		 }
	//鼠标失去焦点事件
	divContainer.onmouseout = function () {
		  timer = setInterval(autoPlay, 3000);
		 }
	// 自动播放到最后一个索引时强制将索引设置为第一个
	function autoPlay(){
		//此处应设置等于>=不然会报错
		if(++index>=pictureList.length){
			index=0;
		}
		//index改变切换页面滚动 
		changePage(index);
	
	}
	 for (var i = 0; i < pictureList.length; i++) {
		  num[i].onmouseover = function () {
		  clearInterval(timer);
		  index = this.innerText - 1;
		  changePage(index);
		  };
		 };
	function changePage(curentIndex){
		for(var i=0;i<pictureList.length;i++){
			//隐藏全部
			picture[i].style.display = "none";
			num[i].className = "";
		}
		//显示当前页面
		picture[curentIndex].style.display = "block";
		num[curentIndex].className = "on";
	}
	
	
}




 /*window.onload=function(){
 var wrap=document.getElementById('banner'),
  pic=document.getElementById('pictrue').getElementsByTagName("li"),
  list=document.getElementById('list').getElementsByTagName('li'),
  index=0,
  timer=null;
 
 //设置图片和url-ajax请求获取网络图片，添加在集合中变遍历进行图片和url的设置
 //document.getElementById('one').src("img/1.png").href();

  // 定义并调用自动播放函数
 timer = setInterval(autoPlay, 2000);
 
  // 鼠标划过整个容器时停止自动播放
 wrap.onmouseover = function () {
  clearInterval(timer);
 }
 
  // 鼠标离开整个容器时继续播放至下一张
 wrap.onmouseout = function () {
  timer = setInterval(autoPlay, 2000);
 }
  // 遍历所有数字导航实现划过切换至对应的图片
 for (var i = 0; i < list.length; i++) {
  list[i].onmouseover = function () {
  clearInterval(timer);
  index = this.innerText - 1;
  changePic(index);
  };
 };
 
 function autoPlay () {
  if (++index >= pic.length) index = 0;
  changePic(index);
 }
 
  // 定义图片切换函数
 function changePic (curIndex) {
  for (var i = 0; i < pic.length; ++i) {
  pic[i].style.display = "none";
  list[i].className = "";
  }
  pic[curIndex].style.display = "block";
  list[curIndex].className = "on";
 }
 
 };
*/