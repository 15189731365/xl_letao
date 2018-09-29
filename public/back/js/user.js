$(function(){
  var currentPage=1;
  var pageSize=5;
  render();
  function render(currentPage){
 //向后台发送请求来渲染数据
 $.ajax({
  type:"get",
  url:"/user/queryUser",
  data:{
    page:currentPage||1,
    pageSize:pageSize,
  },
  dataType:"json",
  success:function(info){
    console.log(info);
    var tr=template("tmp",info);
    $("tbody").html(tr);
    $("#paginator").bootstrapPaginator({
      //3的版本需要指定
      bootstrapMajorVersion:3,
      //总页数
      totalPages:Math.ceil(info.total/info.size),
      //当前页
      // currentPage:info.page,
      //给分页注册点击事件
      onPageClicked:function(a,b,c,page){
        //page表示的是当前页
        console.log(page);
        currentPage=page;
        render(currentPage);
      }

    })
  }
})
  }
 
 //点击按钮让模态框显示
 var currentid;
 $("tbody").on("click",".btn",function(){
   $("#userModal").modal("show");
   //拿到后台的id值 需要通过自定义属性来存储之前获取到的id值
    currentid=$(this).parent().data("id");
    //点击禁用按钮 让isDelet 由1到0
    isDelete=$(this).hasClass("btn-danger")?0:1;
 }) 
 //点击确定按钮的时候 应该根据接口发送请求 来更新页面
 //传递的数据isDelete 如果是0 修改成禁用状态 如果是1 修改成启用状态
 
 $("#userbtn").click(function(){
   $.ajax({
     type:"post",
     url:"/user/updateUser",
     data:{
       id:currentid,
      isDelete:isDelete
     },
     dataType:"json",
     success:function(info){
       console.log(info);
       if(info.success){
         //关闭模态框
         $("#userModal").modal("hide");
         render();
       }
     }
   })
 })
})