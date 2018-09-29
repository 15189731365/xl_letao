$(function(){
  //一级菜单的渲染
  var currentPage=1;
  var pageSize=5;
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        var tr=template("firtmp",info);
        $("tbody").html(tr);
        //分页处理,首先进行分页初始化
        $("#paginator").bootstrapPaginator({
          //指定当前的版本
          bootstrapMajorVersion:3,
          //总页数
          totalPages:Math.ceil(info.total/info.size),
          //当前页
          currentPage:info.page,
          //给分页注册点击事件 需要获取分页的当前页 然后再重新渲染页面
          onPageClicked:function(a,b,c,page){
            //page表示的是当前页
            currentPage=page;
            render();
          }
        })
      }
    })
  }
  //点击添加按钮 让模态框显示
  $("#addBtn").click(function(){
    $("#addModal").modal("show");
  })
  //表单效验功能 在发送ajax请求之前 需要先验证表单
$("#form").bootstrapValidator({
  // 配置图标
  feedbackIcons: {
   valid: 'glyphicon glyphicon-ok',      // 校验成功
   invalid: 'glyphicon glyphicon-remove',   // 校验失败
   validating: 'glyphicon glyphicon-refresh'  // 校验中
 },
 //配置效验字段
 fields: {
   categoryName: {
     //配置效验规则
     validators: {
       notEmpty: {
         message:"请输入一级分类名称"
       }
     }
   }
 }
});
//验证之后 注册表单验证成功事件，发送ajax请求之前 需要先住着其默认事件 
$("#form").on("success.form.bv",function(e){
 e.preventDefault();
 //发送ajax请求
 $.ajax({
   type:"post",
   url:"/category/addTopCategory",
   data:$("#form").serialize(),
   dataType:"json",
   success:function(info){
     console.log(info);
     //关闭模态框
     $("#addModal").modal("hide");
     //请求完数据 重新渲染页面 如果不是在第一个页面进行添加 那么应该添加之后跳转到第一个页面；
     currentPage=1;
     render();
     
   }
 })
})
})


