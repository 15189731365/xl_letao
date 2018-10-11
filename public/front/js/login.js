$(function(){
  //获取到输入框里的内容 然后发送ajax请求 获取数据
  $("#loginBtn").click(function(){
    var username=$("#username").val();
    var password=$("#password").val();
    //简单进行表单的效验
    if(username.trim()==''){
      mui.toast("请输入用户名");
      return;
    }
    if(password.trim()==''){
      mui.toast("请输入密码");
      return;
    }
    $.ajax({
      type:"post",
      url:"/user/login",
      data:{
        username:username,
        password:password
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.error==403){
          mui.toast("用户名或密码不正确");
        }
        if(info.success){
          //此时根据该页面是根据前一个页面跳转过来的 还是 自身进来的来进行判断
          if(location.search.indexOf("retUrl")!=-1){
            //需要跳转到上一个页面
            location.href=location.search.slice(8);
          }else {
            location.href="user.html";
          }
        }
      }
    })
  })
})