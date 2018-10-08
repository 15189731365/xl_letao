$(function(){
  // 首先通过ajax请求来渲染页面 
  // 再通过分页插件来进行分页
  // 点击按钮显示模态框 如果是表单 看是否需要隐藏域 
  // 验证表单的时候需要考虑隐藏域 并且插件不能监听到隐藏域状态的改变 需要手动的改变状态
  // 最后需要重置表单的状态


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
    //对于一级分类来说 因为是通过下拉框来进行选择再赋值给隐藏域的 所以兼听不到实际的更改值 需要进行手动的更改为成功
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");

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
      // 重置校验状态
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  })

  //5.表单效验初始化
  // 表单里的内容写完之后 因为有两个并不是input框 此时提交的时候并没有将参数传过去 需要设置隐藏域 来提交参数 实现表单验证
  $("#form").bootstrapValidator({
    //0.指定不效验的类型
    excluded:[],
    //1. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  //2.效验字段
  fields:{
    //属性 隐藏域里不显示效验规则 需要在效验最前面加上对于隐藏域已起作用
    categoryId:{
      //规则
      validators:{
        notEmpty:{
          message:"请选择一级分类"
        }
      }
    },
    brandName:{
      validators: {
        notEmpty: {
          message: "请选择二级分类"
        }
      }
    },
    brandLogo:{
      validators:{
        notEmpty:{
          message:"请选择图片"
        }
      }
    }
  }
  })

  //6.表单效验成功之后 通过提交按钮来提交 需要阻止其默认事件 通过ajax来进行提交
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          //表示添加成功 需要关闭模态框
          $("#addModal").modal("hide");
          //重新渲染第一个页面
          currentPage=1;
          render();
          //此时模态框的内容并没有消失 下次点击还存在 需要重置表单的状态
          $("#form").data('bootstrapValidator').resetForm(true);
          //还需要将下拉框和图片重置成以前的状态
          $(".one").text("请选择一级分类");
          $("#img-box img").attr("src","images/none.png");
        }
      }
    })
  })
  
})