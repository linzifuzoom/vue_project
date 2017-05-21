/**
 * Created by huangwei on 2017/5/5.
 */
/***
 * 负责导入其它文件  .vue .js .css xxxx 这些文件，然后统一打包
 * */

//导入相应的包
import Vue from 'vue' // 相当于es5中的 var Vue = require('vue')
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import moment from 'moment'
import VuePreview from 'vue-preview'

//导入mint
import Mint from 'mint-ui'
//导入mint的css样式
import 'mint-ui/lib/style.css' // es5使用require关键字

//导入mui的样式
import '../statics/mui/css/mui.min.css'
import '../statics/mui/css/icons-extra.css'

//导入我们项目自己的css
import '../statics/css/common.css'

//统一使用基于Vue的中间件
//使用Mint这个中间件
Vue.use(Mint)
//使用Vue-Router这个中间件
Vue.use(VueRouter)
//使用Vue-Resource
Vue.use(VueResource)
//使用Vue-Preview
Vue.use(VuePreview)

//全局过滤器
//input 代表要被格式化的时间字符串 像2015-04-16T03:50:28.000Z
//dateFmtString 格式化成的最终的样子 YYYY-MM-DD 还是 YYYY-MM-DD HH:mm:ss
Vue.filter('dateFmt',(input,dateFmtString)=>{
    const lastFmtString = dateFmtString || 'YYYY-MM-DD HH:mm:ss'

    return moment(input).format(lastFmtString)
})

//导入根组件
import App from './App.vue'  // 相当于es5中的 var App = require('./App.vue')

//导入对应的组件
import home from './components/home/home.vue'
import member from './components/member/member.vue'
import shopcart from './components/shopcart/shopcart.vue'
import settings from './components/settings/settings.vue'
import newslist from './components/news/newlist.vue'
import newsinfo from './components/news/newsinfo.vue'
import photolist from './components/photo/photolist.vue'
import photoinfo from './components/photo/photoinfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import goodscomment from './components/goods/goodscomment.vue'
import goodspicturetext from './components/goods/goodspicturetext.vue'

//路由设置
const vueRouter = new VueRouter({
    routes : [
        {path:'/',redirect: {name:'home'}},
        {name:'home',path:'/home',component:home},//首页
        {path:'/member',component:member}, //会员
        {path:'/shopcart',component:shopcart}, //购物车
        {path:'/settings',component:settings}, //设置
        {path:'/news/newslist',component:newslist}, //新闻列表
        {path:'/news/newsinfo/:newsId',component:newsinfo}, //新闻详情
        {path:'/photo/photolist',component:photolist},//图片列表
        {path:'/photo/photoinfo/:photoId',component:photoinfo}, //图片详情
        {path:'/goods/goodslist',component:goodslist}, //商品列表
        {path:'/goods/goodsinfo/:goodsId',component:goodsinfo},//商品明细
        //{name:'goodscomment',path:'/goods/goodscomment/:goodsId',component:goodscomment}//商品评论
        {name:'goodscomment',path:'/goods/goodscomment',component:goodscomment},//商品详情
        {name:'goodspicturetext',path:'/goods/goodspicturetext/:goodsId',component:goodspicturetext} //图文列表
    ],
    linkActiveClass: 'mui-active', // 这是链接激活时的class
})

//创建Vue实例
new Vue({
    el:'#app',
    //es6简便写法
    router:vueRouter,
    render : h=>h(App) //告诉我们Vue实例,程序已启动去渲染哪个组件
    //es6 完整写法
    //render : (h) => {return h(App)}
    /*render : function (createElement) {
        return createElement(App)
    }*/
})