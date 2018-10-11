/* 实现区域滚动 使用mui插件 需要进行 插件初始化 */
// 创建一个mui区域滚动实例，就可以调用插件实例方法了；
mui(".mui-scroll-wrapper").scroll({
  deceleration:0.0005,
  indicators:false,//是否显示滚动条
})

//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});

//从一个页面跳转到另一个页面 想要获得前一个页面的数据 可以localStorage  或者地址栏的拼接
//封装一个获取地址栏的数据 已对象键值对的形式来返回 适用于多个字符串拼接起来的数据分析
// 可以对函数改造 可以传关键字 直接获取里面的值
function getSearch(keyword){
  var search=location.search;
  search=search.slice(1);
  search=decodeURI(search);//转码成中文
  var arr=search.split("&");
  var obj={};//用来存储切割出来的数据
  arr.forEach(function(v,i){
    var key=v.split("=")[0];
    var value=v.split("=")[1];
    obj[key]=value;
  });
  return obj[keyword];
}


