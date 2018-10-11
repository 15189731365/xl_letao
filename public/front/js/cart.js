$(function(){
  //首先判断用户有没有登陆 如果没有登录 拦截到登陆页面 

  function render(){
    setTimeout(function(){
      $.ajax({
        type:"get",
        url:"/cart/queryCart",
        dataType:"json",
        success:function(info){
          console.log(info);
          if(info.error==400){
            //用户没有登录 需要跳转到登陆页面
            location.href="login.html";
          }else{
            var htmlStr=template("cartTmp",{list:info});
            $(".lt_main .mui-scroll").html(htmlStr);
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
          }
    
    
    
        }
      });
    },1000);

  }
  

  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {

        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback :function(){
          // 重新渲染页面
          render();
          
        }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });
})