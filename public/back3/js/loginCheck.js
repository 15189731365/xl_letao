
    //需要对未登录的页面进行拦截  通过ajax发送请求来进行验证登陆拦截 如果是未登录的状态 那么让其跳转到登陆页面 对于登陆界面来说 是不需要进行登陆拦截的 因此写一个新的js
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      dataType:"json",
      success:function(info){
        // console.log(info);
        if(info.error===400){
          //此时是未登录的状态
          location.href="login.html";
        }
        if(info.success){
          console.log("登陆成功");
        }
      }
    })
