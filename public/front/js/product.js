$(function(){
  //1.对于产品详情区是根据列表区传递来的id来进行内容的动态渲染 动态渲染出来的插件里使用的轮播图和数字框是需要手动的进行初始化
  var productId=getSearch("productId");
  // console.log(productId);
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
      id:productId
    },
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr=template("productTmp",info);
      $(".lt_main .mui-scroll").html(htmlStr);
      //需要手动初始化图片轮播
      var gallery = mui('.mui-slider');
       gallery.slider({
         interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
       });
       //手动初始化数字框
       mui(".mui-numbox").numbox()
    }
  });

  //2.给尺码添加点击事件 添加current类
  $(".lt_main .mui-scroll").on("click",".lt_size span",function(){
    $(this).addClass("current").siblings().removeClass("current");
  })

 //3.给购物车添加点击事件 显示出确认框 获取到尺码以及数量
 
 $("#addCart").click(function(){
  var size=$(".lt_size span.current").text();
  var num=$(".mui-numbox-input").val();
  if(!size){
    mui.toast("请选择尺码");
    return;
  }
  $.ajax({
    type:"post",
    url:"/cart/addCart",
    data:{
      productId:productId,
      num:num,
      size:size
    },
    dataType:"json",
    success:function(info){
      console.log(info);
      if(info.success){
        //展现确认框
        mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
          console.log(e);
          if(e.index==0){
            //相当于点击了去购物车 跳转到购物车页面
            location.href="cart.html";
          }
        })
      }
      if(info.error===400){
        //此时相当于没有登录 需要跳转到登陆页面 并且需要告诉登陆界面 是从哪个页面跳转过来的
        location.href="login.html?retUrl="+location.href;
      }
    }
  })
 })

 
})