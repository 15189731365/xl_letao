$(function(){
  var pageSize=2;
  var currentPage=1;
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var tr=template("proTmp",info);
        $("tbody").append(tr);
        //进行分页
        $()
      }
    })
  }
  
})