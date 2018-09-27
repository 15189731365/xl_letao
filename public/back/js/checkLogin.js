 $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    dataType:"json",
    success:function(info){
      console.log(info);
      if(info.error===400){
        location.href="login.html";
      }else{
        console.log("登陆成功");
      }
    }
  })
 //需要对每个页面进行登录拦截管理 可以从后台拿到数据来进行判断 如果不是登录进来的 那么跳转到登陆页  对于登陆界面来说 是不需要进行登陆拦截的 