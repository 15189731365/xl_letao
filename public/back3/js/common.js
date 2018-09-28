//显示进度条  使用NProgress插件
// 在发送ajax请求时需要开启进度条 然后在所有的ajax请求完成之后关闭进度条
$(document).ajaxStart(function(){
  //开启进度条
  NProgress.start();
});
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  })
})

//实现左边侧边栏的公共功能 1.点击左边按钮 显示效果   2 右边按钮显示模态框； 3.点击一级菜单 显示二级菜单
$(function(){
  $(".icon-meua").click(function(){
    $(".lt-aside").toggleClass("current");
    $(".lt-main").toggleClass("current");
    $(".main-bar").toggleClass("current");
  });
  $(".cate").click(function(){
    $(".child").slideToggle();
  });
  $(".icon-logout").click(function(){
    $("#logout").modal("show");
  })
  //模态框里的退出按钮  
  $(".outBtn").click(function(){
    //需要通过ajax来进行判断是否退出 退出则到登陆页面；
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){
        // console.log(info);
        //当成功时应该退出到登陆页面
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })

})