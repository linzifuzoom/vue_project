<template>
    <div class="tmpl">
        <!-- 1.0 轮播图 -->
        <div class="sliderStyle">
            <!--
                vue中凡是需要用到data(){}中的属性值的话，就必须v-bind
             -->
            <subimageslider :lunboList="lunboList"></subimageslider>
        </div>
        <!-- 2.0 商品信息 -->
        <div class="priceStyle">
            <h4>{{goodsInfo.title}}</h4>
            <!-- 价格信息 -->
            <p class="price">
                市场价:￥<s>{{goodsInfo.market_price}}</s>&nbsp;&nbsp;
                销售价:￥<span>{{goodsInfo.sell_price}}</span>
            </p>
            <!-- 数量子组件  todo -->
            <!--<button @click="btnClick"></button>-->
            <!-- 和上面对比下 -->
            <subnumber @numberChange="getSubnumberCount"></subnumber>
            <!-- 两个按钮 -->
            <div>
                <mt-button size="small" type="primary">立即购买</mt-button>
                <mt-button @click="addToShopCart" size="small" type="danger">加入购物车</mt-button>
            </div>
        </div>
        <!-- 3.0 商品参数 -->
        <div class="paramsStyle">
            <h5>商品参数</h5>
            <ul>
                <li>商品货号:{{goodsInfo.goods_no}}</li>
                <li>库存情况:剩余{{goodsInfo.stock_quantity}}件</li>
                <li>上架时间:{{goodsInfo.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</li>
            </ul>
        </div>

        <!-- 4.0 图文介绍&评论 -->
        <div class="pictureInfoAndCommentStyle">
            <mt-button size="large" @click="goPictureAndText" plain type="primary">图文介绍</mt-button>
            <mt-button class="commentStyle" @click="goGoodsComment" size="large" plain type="danger">商品评论</mt-button>
        </div>
    </div>
</template>

<style>
    .sliderStyle,.priceStyle,.paramsStyle,.pictureInfoAndCommentStyle{
        margin: 10px;
        padding: 10px;
        border: 1px solid rgba(92,92,92,0.3);
        border-radius: 5px;
    }

    .priceStyle h4{
        font-size: 16px;
        color: #0094ff;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }

    .price span{
        color: red;
        font-size: 16px;
    }

    .paramsStyle h5{
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }

    .paramsStyle ul{
        padding: 0
    }

    .paramsStyle li{
        list-style: none;
    }

    .commentStyle{
        margin-top: 20px;
    }

</style>


<script>
    import common from '../../common/common.js'

    //导入图片轮播子组件
    import subimageslider from '../subcomponents/subimageslider.vue'
    //导入商品数量子组件
    import subnumber from '../subcomponents/subnumber.vue'

    //导入commonvue.js中的bus
    import {bus,age} from '../../common/commonvue.js'

    //导入shopCartHelper中的成员
    import {addGoods} from '../../common/shopCartHelper.js'

    export default {
        data(){
            return {
                lunboList : [],
                goodsInfo : {}, //商品明细
                goodsCount : 1 //购物车的数量
            }
        },
        created(){
            //1.0 获取商品轮播的数据
            this.getGoodsLunboData()
            //2.0 获取商品明细的数据
            this.getGoodsInfoData()
        },
        methods:{
            //获取商品轮播数据
            getGoodsLunboData(){
                const url = common.apihost + `api/getthumimages/${this.$route.params.goodsId}`

                this.$http.get(url).then(res=>{
                    //console.log(res.body.message)
                    this.lunboList = res.body.message
                },err=>{

                })
            },
            //获取商品的明细信息
            getGoodsInfoData(){
                const url = common.apihost + `api/goods/getinfo/${this.$route.params.goodsId}`
                this.$http.get(url).then(res=>{
                    this.goodsInfo = res.body.message[0]
                },err=>{

                })
            },
            //跳转到商品评论页面
            goGoodsComment(){
                //参数1：在main.js中配置路由的时候的那个name属性
                //参数2：跳转到对应的组件去了之后给他带上参数
                //this.$router.push({ name: 'goodscomment', params: { goodsId: this.$route.params.goodsId }})

                //选择二
                this.$router.push({path: '/goods/goodscomment', query: { goodsId: this.$route.params.goodsId }})
            },
            //去图文介绍组件
            goPictureAndText(){
                this.$router.push({path:`/goods/goodspicturetext/${this.$route.params.goodsId}`})
            },
            //注册了numberChange之后，当子组件中触发了numberChange之后，就会自动执行父组件中对应的函数
            getSubnumberCount(count){
                //console.log("接收到的值:"+count)
                this.goodsCount = count
            },
            //加入购物车
            addToShopCart(){
                //1、更改App.vue中下面TabBar中购物车这个标签栏上面的徽标值
                bus.$emit('shopCount',this.goodsCount)

                //2.存在localstorage中
                addGoods({goodsId:this.$route.params.goodsId,count:this.goodsCount})
            }
        },
        components:{
            subimageslider,
            subnumber
        }
    }
</script>