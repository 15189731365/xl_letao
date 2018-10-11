$(function(){
  //1.根据地址栏获取到的值 赋值给input框 并且根据输入框里的值 向后台请求数据
   var key=getSearch("key");
   $(".search-input input").val(key);
   //已进入页面先渲染一次
   render();
   function render(){
    $('.lt-product').html('<div class="loading"></div>');
    var params={};
    params.proName=$(".search-input input").val();
    params.page=1;
    params.pageSize=100;
    var $current=$(".lt-sort a.current");
    if($current.length>0){
      var sortName=$current.data("type");
      var sortValue=$current.find("i").hasClass("fa-angle-down")?2:1;
      params[sortName]=sortValue;
    }
    console.log(params);
    setTimeout(function(){
      $.ajax({
        type:"get",
        url:"/product/queryProduct",
        data:params,
        dataType:"json",
        success:function(info){
           console.log(info);
           var htmlStr=template("tmp",info);
           $(".lt-product").html(htmlStr);
        }
      });
    },1000);
     
   }

   //2.给输入框添加点击事件
   $(".search-input .search-btn").click(function(){
     render();
   })

   //3.里面上传的参数 除了三个必须上传的 还有两个选择上传的，根据判断条件current类来实现是否
  //  根据价格，库存是否高亮来显示
  // 点击的时候进行判断 是否有高亮的 如果没有 则让其高亮 并且其余的不高亮 高亮的时候根据箭头的方向 重新进行渲染
  
   //判断是否有current类来进行切换


   //给排序里的a元素添加点击事件 看其是否有高亮
   $(".lt-sort a[data-type]").click(function(){
     if($(this).hasClass("current")){
       //存在current类,存在current类 点击的时候切换箭头的方向 传递的值为1或者2 切换类名就可以
       $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up")


     }else {
       //不存在current类 让其有current类 且排他
       $(this).addClass("current").siblings().removeClass("current");
     }
     render();
   })
})
