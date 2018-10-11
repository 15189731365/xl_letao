$(function(){
  //请求用户页面信息
  $.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr=template("userTmp",info);
      $("#userInfo").html(htmlStr);
    }
  })

  //退出功能；
  $("#logout").click(function(){
    $.ajax({
      type:"get",
      url:"/user/logout",
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          //退出功能实现 跳转到登陆界面
          location.href="login.html";
        }
      }
    })
  })
})