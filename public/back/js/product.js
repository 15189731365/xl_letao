$(function(){
  //1.渲染页面
  var pageSize=2;
  var currentPage=1;
  var picArr=[]; //用于维护数组的
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
        $("tbody").html(tr);
        //2.进行分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          // 总条数
          totalPages: Math.ceil( info.total / info.size ),
          // 当前页
          currentPage: info.page,
          // 给页码添加点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            // 让页面重新渲染
            render();
          },
          // 控制按钮显示的文字
          // itemTexts 是一个函数, 每个按钮在初始化的时候, 都会调用该函数
          // 将该函数的返回值, 作为按钮的文本
          // type: 按钮的类型, page, first, last, prev, next
          // page: 表示点击按钮跳转的页码
          // current: 当前页
          itemTexts: function(type, page, current) {
            switch ( type ) {
              case "page":
                return page;
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
            }
          },
           // 每个按钮在初始化的时候, 都会调用一次该函数
          // 将该函数的返回值, 作为按钮的 title 提示文本
          tooltipTitles: function(type, page, current) {
            switch ( type ) {
              case "page":
                return "前往第" + page + "页";
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
            }
          },

          // 使用 bootstrap 的提示框组件
          useBootstrapTooltip: true
        })
      }
    })
  }
  
  //3.点击按钮让模态框显示出来 并且将二级分类的数据请求回来 
  $("#addPro").click(function(){
    $("#addModal").modal("show");
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100,
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var tr=template("addTmp",info);
        $(".dropdown-menu").html(tr);
      }
    })
  })

  //4.给下拉框的a注册点击事件 得到品牌id 然后赋值给input框 文字赋值
  $(".dropdown-menu").on("click","a",function(){
    //获取文本
    var txt=$(this).text();
    $(".two").text(txt);
    //获取id
    var id = $(this).data("id");
    $('[name="brandId"]').val( id );
    //需要手动的更新效验状态
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  })

  //5.文件上传插件的使用
  // 多文件上传 按要求是只能上传三张 并且是往前面添加 如果超过三张 应该让最后一张去掉
  // 可以使用数组的方法来进行维护
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data.result);
      //通过数组来进行维护
      picArr.unshift(data.result);
      var picAddr=data.result.picAddr;
      $("#img-box").prepend('<img src="'+picAddr+'" width="100" height="100" alt="">')
      if(picArr.length>3){
        $("#img-box img:last-of-type").remove();
        picArr.pop();
      }
      //如果此时上传的图片长度等于3 那么可以上传了 只需要更新效验状态
      if(picArr.length==3){
        $('#form').data("bootstrapValidator").updateStatus("picStatu", "VALID"); 
      }
    }
});

//6.验证表单初始化
$("#form").bootstrapValidator({
  //1.对于隐藏域也进行效验
  excluded:[],
  //2.效验的指定图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  //3.指定效验字段
  fields: {
    brandId: {
      validators: {
        notEmpty: {
          message: "请选择二级分类"
        }
      }
    },
    proName: {
      validators: {
        notEmpty: {
          message: "请输入商品名称"
        }
      }
    },
    proDesc: {
      validators: {
        notEmpty: {
          message: "请输入商品描述"
        }
      }
    },
    num: {
      validators: {
        notEmpty: {
          message: "请输入商品库存"
        },
        //正则效验
        regexp: {
          regexp: /^[1-9]\d*$/,
          message:"商品库存必须是非零开头的数字"
        }
      }
    },
    //尺寸要求非空 ,要求尺码格式xx-xx，
    size: {
      validators: {
        notEmpty: {
          message:"请输入商品库存"
        },
        regexp: {
          regexp: /^\d{2}-\d{2}$/,
          message:"要求尺码是xx-xx格式，例如32-40"
        }
      }
    },
    price: {
      validators: {
        notEmpty: {
          message: "请输入商品现价"
        }
      }
    },
    oldPrice: {
      validators: {
        notEmpty: {
          message: "请输入商品原价"
        }
      }
    },
    picStatu: {
      validators: {
        notEmpty: {
          message: "请上传三张图片"
        }
      }
    }
  }
})

//7.阻止表单的默认提交 用ajax来进行提交
$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  // 通过表单提交的数据 只能是input里面的数据 三张图片的数据并不在input里面
  // 使用字符串拼接的方式来提交数据；
  var str=$("#form").serialize();
  str+="&picName1"+picArr[0].picName+"$picAddr1"+picArr[0].picAddr;
  str+="&picName2"+picArr[1].picName+"$picAddr2"+picArr[1].picAddr;
  str+="&picName3"+picArr[2].picName+"$picAddr3"+picArr[2].picAddr;

  $.ajax({
    type:"post",
    url:"/product/addProduct",
    data:str,
    dataType:"json",
    success:function(info){
      console.log(info);
      if(info.success){
        $("#addModal").modal("hide");
        currentPage=1;
        render();
        //重置表单，内容和状态都要重置
        $('#form').data("bootstrapValidator").resetForm(true);
        //下拉框和图片不是表单元素 需要手动重置
        $(".two").text("请选择二级分类");
        //移除所有的图片
        $("#img-box img").remove();
        picArr=[];//需要同步数组；
      }
    }
  })
});
  
})