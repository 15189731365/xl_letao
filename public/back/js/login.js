$(function(){
   /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */

   


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
          }
        }
      }
    }
  })
})