//该文件中存放一些公共的js效果 
//1.为了实现登陆的时候具有进度条事件  可以使用进度条插件
// NProgress插件
//开启进度条 start
NProgress.start();

//进度条结束 可以模拟网络延迟
setTimeout(function(){
  NProgress.done();
},2000);

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
})
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },500);
})