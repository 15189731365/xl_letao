$(function(){
  //1.通过ajax请求来渲染数据
  var currentPage=1;
  var pageSize=5;
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data: {
        page:currentPage,
        pageSize:pageSize,
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var tr=template("secondtmp",info);
        $("tbody").html(tr);
        //添加分页功能
        $("#paginator").bootstrapPaginator({
          //指定版本号
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:info.page,
          onPageClicked: function(a,b,c,page){
            //根据点击的页数 来重新渲染页面
            currentPage=page;
            render();
          }
        })
      }
    })
  };

  //2.点击添加按钮 让模态框显示出来
  $("#addBtn").click(function(){
    $("#addModal").modal("show");
    //通过ajax请求得到一级分类的数据 然后渲染的下拉框里面
  
    var currentPage=1;
    var pageSize=100;
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
          console.log(info);
          var str=template("droptmp",info);
          $(".dropdown-menu").append(str);
        }
      })
    }
   
  })
  
  //3.给里面的li主持点击事件 获取到里面的文本 并赋值给上面
    //并且需要知道当前下拉框里的选项id值 需要往后台传递的数据有categoryid 
    
  $(".dropdown-menu").on("click","a",function(){
    var txt=$(this).text();
    $(".one").text(txt);
    var id=$(this).data("id");
    $('[name="categoryId"]').val(id);
  })

 // 4. 文件上传初始化
  /*
   * 文件上传步骤
   * 1. 引包, 注意依赖问题
   * 2. html结构, 给 input:file添加 name 和 data-url 属性
   * 3. 通过 fileupload 方法初始化文件上传插件
   * */
  $("#fileupload").fileupload({
    dataType:"json",
    done:function(e,data){
      console.log(data.result);
      var imgSrc=data.result.picAddr;
      $("#img-box img").attr("src",imgSrc);
      //另外还有图片的地址也需要
      $('[name="brandLogo"]').val(imgSrc);
    }
  })

  //5.表单里的内容写完之后 因为有两个并不是input框 此时提交的时候并没有将参数传过去 需要设置隐藏域 来提交参数

  
})