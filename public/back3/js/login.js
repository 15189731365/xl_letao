$(function(){
  //首先效验表单 需要引用表单
  // (1) 用户名不能为空, 长度为2-6位
  //  * (2) 密码不能为空, 长度为6-12位
  $("#form").bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',      // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    //配置的效验字段
    fields:{
      username:{
        //配置效验规则
        validators: {
          //非空效验
          notEmpty: {
            //提示信息
            message:"用户名不能为空"
          },
          stringLength:{
            min:2,
            max:6,
            message:"用户名长度必须是2-6位"
          },
          callback: {
            message:"用户名不存在"
          }
        }
      },
      password: {
        validators: {
          // 非空
          notEmpty: {
            message: "密码不能为空"
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          },
          // callback, 专门用于配置回调的提示说明
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  })
  //如果效验正确 那么点击提交的时候有默认的提交事件 我们需要阻止其默认事件 并且用ajax来进行提交
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url: "/employee/employeeLogin",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        if(info.success){
          location.href="index.html";
        }
        if(info.error===1000){
          //进行单独配置样式
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if(info.error===1001){
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
        }
      }
    })
  })


  //在重置按钮中 只能重置文字 但是 通过插件引入的状态样式是去不掉的 
  $('[type="reset"]').click(function() {
    // 调用插件的方法, 进行重置
    // resetForm(boolean)
    // 1. true, 表示将表单内容和校验状态都重置
    // 2. false, 只重置校验状态
    $('#form').data("bootstrapValidator").resetForm();
  })

  
})