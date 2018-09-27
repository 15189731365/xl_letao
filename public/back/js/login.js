$(function(){

  // 效验表单的功能可以使用插件 首先效验表单，可以加上指定的图标 
  // 然后效验成功的时候 需要将表单的默认提交事件给阻止了，用ajax来发送请求，获取数据。 如果效验成功 那么就跳到首页 效验失败 就执行 更新错误的代码 表单自带的重置功能只能让文字重置，如果有之前新加的插件状态 需要通过注册点击事件来改变其状态；



   /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */

   

  //使用插件来进行效验 提供效验的要求可以来实现 并且可以添加图标
  $("#form").bootstrapValidator({

     //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok', //效验成功
    invalid: 'glyphicon glyphicon-remove', //效验失败
    validating: 'glyphicon glyphicon-refresh' //效验中
  },
    //配置的校验字段
    fields: {
      username : {
        //配置效验规则，
        validators:{
          //非空效验
          notEmpty:{
            //提示信息
            message:"用户不能为空"
          },
          //长度效验
          stringLength: {
            min:2,
            max:6,
            message:"用户名长度必须是2-6位"
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message:"密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  })

//当效验成功时 需要先阻止表单的默认提交功能 再通过ajax来进行提交
//表单中有默认的提交功能 需要阻止其默认行为，然后通过ajax来发送请求数据 成功就跳转到首页
  $("#form").on("success.form.bv",function(e) {
    
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      //通过表单序列化来获取表单元素
  
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        // console.log(info);
        if(info.success){
          //登陆成功应该跳转到首页
          location.href="index.html";
        }
        if(info.error===1000){
          //将表单用户名效验状态从成功更新到失败，并且给用户提示
          // alert("用户名不存在");
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if(info.error===1001){
          // alert("密码错误");
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    })
  })


  //添加重置功能 在表单插件中 有input的选中状态需要重置 而在插件中有resetform这个方法可以重置
  $('[type="reset"]').click(function(){
    //resetForm(boolean);
    // 传true，表示将表单内容和效验状态都重置
    // 传false，表示只重置效验状态
    $('#form').data("bootstrapValidator").resetform();
  })
  
})