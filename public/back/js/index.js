$(function(){
  //1.左侧柱状图
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.querySelector('.echarts-1'));

          // 指定图表的配置项和数据
          var option = {
              title: {
                //标题文本
                  text: '2017 注册人数',
                  //配置标题样式
                  textStyle:{
                    color:"red",
                  }
              },
              //提示框组件 鼠标移入柱状图显示数据
              tooltip: {},
              //图例
              legend: {
                  data:['人数']
              },
              //表示x轴
              xAxis: {
                  data: ["1月","2月","3月","4月","5月","6月"]
              },
              //表示y轴
              yAxis: {},
              //传的数组 可以传多个 然后显示不同的柱状图；
              series: [{
                  name: '人数',//与上面的legend的data数据是一样的
                  //type表示图标的类型 bar柱状图 line折线图 pie饼图 饼图有点问题
                  type: 'bar',
                  data: [1000, 1500, 2500, 1300, 1800, 2400]
              }]
          };
  
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);


   //2.右侧饼状图
   var myChart = echarts.init(document.querySelector('.echarts-2'));

   // 指定图表的配置项和数据
   var option = {
    title : {
        text: '热门品牌销售',
        //子标题
        subtext: '2017年6月',
        //控制水平对齐方式
        x:'center'
    },
    //提示框组件
    tooltip : {
      //鼠标滑动到数据项上面时触发
        trigger: 'item',
        //自定义提示框内容
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    //图例
    legend: {
      //配置图例的显示方式，horizontal水平排列
        orient: 'vertical',
        //配置水平方式对齐
        left: 'left',
        data: ['耐克','阿迪','李宁','耐克王','李宁王']
    },
    series : [
        {
            name: '品牌销量',
            type: 'pie',
            //圆的大小
            radius : '55%',
            //圆心的位置
            center: ['50%', '60%'],
            data:[
              {value:335, name:'耐克'},
              {value:310, name:'阿迪'},
              {value:234, name:'李宁'},
              {value:135, name:'耐克王'},
              {value:1548, name:'李宁王'}
            ],
            //表示额外的阴影效果
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

   // 使用刚指定的配置项和数据显示图表。
   myChart.setOption(option); 
})