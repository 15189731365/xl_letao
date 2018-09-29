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
  
})