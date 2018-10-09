// 像这种历史记录是不需要向后台发送ajax请求获取数据的 而是通过本地存储数据的方式 来进行数据的维护进行本地管理 需要约定一个健名 专门用于历史记录管理
// 使用localStroge来存储的数据 可以在多个窗口共享数据 使用假的数据来进行初始化
$(function(){
  //1.打开页面的时候进行渲染 首先获取到本地存储的数据  获取数据和渲染可以封装成方法
  render();
  function getHistory(){
   var str = localStorage.getItem("search_list")||'[]';
   var arr=JSON.parse(str);
   return arr;
  }
  function render(){
    //获取到数组里的数据来进行渲染页面
   var arr=getHistory();
   var str=template("searchTmp",{arr:arr});
   $(".lt-history").html(str);
  }
  

  //2.点击清空历史 因为是渲染出来的 所以需要用事件委托来添加事件 显示消息框
  $(".lt-history").on("click",".right",function(){
    mui.confirm("你确定要清空历史记录嘛","温馨提示",["取消","确认"],function(e){
      // console.log(e);
      // 在回调函数中返回的事件对象存储着数组中的对应下标
      if(e.index==1){
        //此时点击的是确定按钮 需要将所有的数据清空 包括数组的存储数据 清空了数组 那么里面的数据为空 返回回来的是null 在渲染页面的时候进行 null.length就没有判断的依据
        localStorage.removeItem("search_list");
        render();
      }
    });
  });

  //3.点击删除单个数据的时候 先拿到数组 将里面对应项删除 相当于更新了数据 需要将本地存储的数据也更新 再重新渲染页面
  
  //根据当时渲染页面的时候 自定义添加的属性 拿到下标值 删除对应的数组里的一项
  $(".lt-history").on("click",".icon-empty",function(){
    var index=$(this).data("index");
    var arr=getHistory();
    arr.splice(index,1);
    var str=JSON.stringify(arr);
    localStorage.setItem("search_list",str);
    render();
  })

  //4.在搜索框里输入文字 获取到文字 将其添加到数组的最前面 更新本地存储的数据 重新渲染数据
  $(".search-input .search-btn").click(function(){
    var str=$(".search-input input").val().trim();
    if(str==''){
      //可以使用插件的提示框来提醒用户输入文字
      mui.toast("请输入关键字");
      return;
    }
    var arr=getHistory();
    //有新的需求 如果有重复项 需要将重复项删除 然后 长度不能超过10个
    var index = arr.indexOf(str);
    if(index!=-1){
      //说明有重复项 需要删除数组中的该项
      arr.splice(index,1);
    }
    if(arr.length>=10){
      arr.pop();
    }
    arr.unshift(str);
    

    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
    //渲染完之后 应该将输入框的文本清空
    $(".search-input input").val("");
    //需要跳转到商品列表页面
    location.href="searchList.html";
  })
 

})
