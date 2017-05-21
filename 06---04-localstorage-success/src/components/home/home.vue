<template>
    <div class="tmpl">
        <!-- 1.0 轮播图 用mint-ui中的Swipe组件 -->
        <div>
            <subimageslider :lunboList="imgList"></subimageslider>
        </div>

        <!-- 2.0 九宫格布局 用mui中的九宫格布局 -->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/news/newslist">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻咨询</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/photo/photolist">
                    <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
                    <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/goods/goodslist">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-location"></span>
                    <div class="mui-media-body">留言反馈</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">视频专区</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">联系我们</div></a></li>
            </ul>
        </div>
    </div>
</template>

//scoped的意思是 home.vue里面的样式，只能在home.vue的`template`中使用
<style scoped>
    /**1.0 九宫格的样式*/
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border-right:none;
        border-bottom:none;
    }

    /** 设置我们背景图片的宽度与高度 */
    .mui-icon{
        width: 50px;
        height: 50px;
    }

    .mui-icon.mui-icon-home{
        background-image: url('../../../statics/images/menu3.png');
        background-repeat: round;
    }

    .mui-icon.mui-icon-email{
        background-image: url('../../../statics/images/menu4.png');
        background-repeat: round;
    }

    .mui-icon.mui-icon-chatbubble{
        background-image: url('../../../statics/images/menu5.png');
        background-repeat: round;
    }

    .mui-icon.mui-icon-location{
        background-image: url('../../../statics/images/menu6.png');
        background-repeat: round;
    }

    .mui-icon.mui-icon-search{
        background-image: url('../../../statics/images/menu9.png');
        background-repeat: round;
    }

    .mui-icon.mui-icon-phone{
        background-image: url('../../../statics/images/menu10.png');
        background-repeat: round;
    }

    .mui-icon-home:before,
    .mui-icon-email:before,
    .mui-icon-chatbubble:before,
    .mui-icon-location:before,
    .mui-icon-search:before,
    .mui-icon-phone:before{
        content: '';
    }
</style>

<script>
    /**
     * 下面的相当于 module.exports = {}  //es5的写法
     * */

    //导入我们的公共的js文件
    import common from '../../common/common.js'

    //导入图片轮播子组件
    import subimageslider from '../subcomponents/subimageslider.vue' 

    export default{ //es6的新写法
        /**
         * es5的写法   data:function(){}
         * */
        data(){ //这个是es6的写法
            return {
                imgList : []
            }
        },
        created(){ //这个函数当我们的组件被创建出来的时候，就会被`自动调用`
            this.getLunboData()
        },
        methods:{ //所有我们自定义的函数，都会写在这里
            //1.获取轮播的数据
            getLunboData(){
                //利用vue-resource发送网络请求
                const url = common.apihost+'api/getlunbo'
                this.$http.get(url).then(res=>{
                    //console.log(res.body.message)
                    this.imgList = res.body.message
                },err=>{
                    console.log(err)
                })
            }
        },
        components:{
            subimageslider
        }
    }
</script>
