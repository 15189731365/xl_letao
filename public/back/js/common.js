//该文件中存放一些公共的js效果 
//1.为了实现登陆的时候具有进度条事件  可以使用进度条插件
// NProgress插件
//开启进度条 start
// NProgress.start();

// //进度条结束 可以模拟网络延迟
// setTimeout(function(){
//   NProgress.done();
// },2000);

//应该根据需求来进行进度条上传  根据ajax发送请求 然后再到渲染完页面这段时间来进行进度条
//一个页面中有可能有多个ajax请求 所以需要在第一个ajax发送之前 开启进度条 在最后一个ajax请求完成后结束进度条

// ajax全局事件  是整个页面所有的ajax的事件 事件注册给document

// .ajaxComplete() 当每个ajax完成时进行调用（不管成功还是失败）
// .ajaxError() 当每个ajax请求失败时 进行调用
// .ajaxSuccess()  当每个ajax请求发送时 进行调用
// .ajaxSend() 当每个ajax请求发送之前调用
// .ajaxStart()  在第一个ajax请求发送时调用
// .ajaxStop()    在所有的ajax请求完成时调用

$(document).ajaxStart(function(){
  NProgress.start();
});
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },500);
})

//给一级菜单注册点击事件  让二级菜单显示
// 给右边第一个按钮注册事件 隐藏左边的内容 
// 右边第二个按钮注册事件 显示出模态框

$(function(){
  //二级菜单切换效果
  $(".cate").click(function(){
    $(".child").slideToggle();
  })
  //左侧菜单栏隐藏
  $(".meua").click(function(){
    $(".lt-aside").toggleClass("current");
    $(".main-bar").toggleClass("current");
    $(".lt-main").toggleClass("current");
  })

  $(".logout").click(function(){
    //调用modal("show") 可以显示模态框，hide隐藏
    $("#logout").modal("show");
  })

  //点击退出按钮 退出登录 是需要通过后台接口来实现的
  $("#logoutBtn").click(function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })


  //需要对每个页面进行登录拦截管理 可以从后台拿到数据来进行判断 如果不是登录进来的 那么跳转到登陆页  对于登陆界面来说 是不需要进行登陆拦截的 
  // $.ajax({
  //   type:"get",
  //   url:"/employee/checkRootLogin",
  //   dataType:"json",
  //   success:function(info){
  //     console.log(info);
  //     if(info.error===400){
  //       location.href="login.html";
  //     }else{
  //       console.log("登陆成功");
  //     }
  //   }
  // })
})
