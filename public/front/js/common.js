/* 实现区域滚动 使用mui插件 需要进行 插件初始化 */
// 创建一个mui区域滚动实例，就可以调用插件实例方法了；
mui(".mui-scroll-wrapper").scroll({
  deceleration:0.0005,
  indicators:false,//是否显示滚动条
})

//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});