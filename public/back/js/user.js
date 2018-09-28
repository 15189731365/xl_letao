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
      currentPage:info.page,
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
 
  
})