
  // 在一打开页面的时候需要通过ajax请求获取到数据 再渲染在左边的模板引擎里
  $(function(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategory",
      dataType:"json",
      success:function(info){
        // console.log(info);
        var str=template("leftTmp",info);
        $(".first").html(str);
        secondRender(1);
      }
    });
    //根据左边渲染的id值来获取二级分类的数据 重新渲染在页面上
    $(".lt-main .left").on("click","a",function(){
      var id=$(this).data("id");
      $(this).addClass("current").parent().siblings().find("a").removeClass("current");
      console.log(id);
      secondRender(id);
    
      
    })
    function secondRender(id){
      $.ajax({
        type:"get",
        url:"/category/querySecondCategory",
        data:{id:id},
        dataType:"json",
        success:function(info){
          // console.log(info);
          var str=template("rightTmp",info);
          $(".right ul").html(str);
        }
      })
    }
    
  })