$(function(){
  var currentPage=1;
  var pageSize=5;
  render();
  function render(currentPage){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage||1,
        pageSize:pageSize||5,
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var tr=template("tmp",info);
        $("tbody").html(tr);
        //使用分页插件来进行分页
        $(".paginator").bootstrapPaginator({
          //指定bootstrap的版本
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:info.page,
          onPageClicked:function(a,b,c,page){
            console.log(page);
            currentPage=page;
            render(currentPage);
          }
        })
      }
    })
  }

})