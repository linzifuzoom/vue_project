<template>
    <div class="tmpl">
        <!-- 1.0 购物车列表 -->
        <div class="goodsListDiv">
            <div class="everyGoodsItemStyle" v-for="(item,index) in shopCartList" :key="item.id">
                <!-- 1.1 开关 -->
                <mt-switch @change="statisticsNumberAndPrice" v-model="switchValues[index]"></mt-switch>
                <!-- 1.2 图片 -->
                <img :src="item.thumb_path" />
                <!-- 1.3 商品信息 -->
                <div class="priceAndNumberInfo">
                    <h5>{{item.title}}</h5>
                    <p>
                        <span>{{item.sell_price}}</span>&nbsp;&nbsp;
                        商品数量:{{item.count}}
                    </p>
                </div>
                <!-- 1.4 删除按钮 -->
                <mt-button @click="deleteGoods(index)" size="small" type="danger">删除</mt-button>
            </div>
        </div>

        <!-- 2.0 合计 -->
        <div class="totalStyle">
            <h6>总计(不含运费)</h6>
            <p>已经勾选商品&nbsp;<span>{{totalCount}}</span>&nbsp;件
            ,总价&nbsp;<span>{{totalPrice}}</span>&nbsp;元</p>
            <mt-button class="jiesuanStyle" size="small" type="danger">去结算</mt-button>
        </div>
    </div>
</template>

<style scoped>
    /**
        1.0 购物车商品列表样式
    */
    .goodsListDiv{
        padding: 5px;
    }

    .everyGoodsItemStyle{
        display: flex;
        height: 100px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
        align-items: center;
    } 

    .everyGoodsItemStyle img{
        height: 75px;
        width: 75px;
        padding: 5px;
        border: 1px solid rgba(92,92,92,0.3);
        border-radius: 5px;
        margin-left: 8px;
    }

    .priceAndNumberInfo{
        margin-left: 8px;
        flex: 1;
    }

    h5{
        color: #0094ff;
    }

    .priceAndNumberInfo p{
        margin-top: 10px;
    }

    .priceAndNumberInfo span{
        color: red;
        font-size: 14px;
    }

    /**
        合计
    */
    .totalStyle{
        position: relative;
        margin-top: 10px;
        height: 100px;
        padding-top: 20px;
        padding-left: 15px;
        background-color: rgba(92,92,92,0.3)
    }

    h6{
        color: black;
        font-weight: bold;
        font-size: 16px;
    }

    .totalStyle p{
        margin-top: 10px;
    }

    .totalStyle span{
        font-size: 16px;
        color:red;
    }

    .jiesuanStyle{
        position: absolute;
        top: 35px;
        right: 15px;
    }
</style>


<script>

    //导入common.js
    import common from '../../common/common.js'

    //导入shopCartHelper中的成员
    import {getGoodsArray,deleteGoods} from '../../common/shopCartHelper.js'

    import {bus} from '../../common/commonvue.js'

    import { MessageBox } from 'mint-ui';

    export default {
        data(){
            return {
                switchValues : [],
                totalCount : 0,
                totalPrice : 0,
                shopCartList : []
            }
        },
        created(){
            this.getGoodsListData()
        },
        methods:{
            //获取页面上需要的商品信息
            getGoodsListData(){
                //1.获取localStorage中的商品数组
                const localStorageGoodsArray = getGoodsArray()
                
                //2.合并商品数组中的数量，整成一个新的数据 {87:4,88:2}
                const goodsObj = {} //{87:1}

                for(var i = 0 ;i<localStorageGoodsArray.length;i++){
                    const goodsId = localStorageGoodsArray[i]['goodsId']
                    if(goodsObj[goodsId]){//代表goodsObj对象中有个属性名称
                        var oldValue = goodsObj[goodsId] //获取旧的值

                        var newValue = oldValue + parseInt(localStorageGoodsArray[i]['count'])

                        goodsObj[goodsId] = newValue  //{87:4}
                    }else{
                        goodsObj[goodsId] = parseInt(localStorageGoodsArray[i]['count'])
                    }
                }

                //3.在上面新生成的数组中，获取每个商品的id组成 87,88(因为后台需要)
                const ids = []
                for(var key in goodsObj){
                    ids.push(key) 
                }
                //ids [87,88]

                const idsString = ids.join(',')
                
                //4.发送网络请求，获取每个商品的信息
                const url = common.apihost + `api/goods/getshopcarlist/${idsString}`
                this.$http.get(url).then(res=>{
                    //因为服务器返回的时候没有数量，我们动态的根据goodsId添加
                    res.body.message.forEach((item,index)=>{
                        item.count = goodsObj[item.id]

                        //循环给switchValues赋值
                        this.switchValues[index] = true
                    })

                    this.shopCartList = res.body.message
                    console.log(this.shopCartList)

                    //计算总数和价格
                    this.statisticsNumberAndPrice()

                },err=>{

                })
            },
            //统计商品数量和价格
            statisticsNumberAndPrice(){
                //统计数量和商品根据每一条的开关状态来，当开关打开，就统计
                //开关关闭不统计
                var statisticsTotalNumber = 0
                var statisticsTotalPrice = 0

                //this.switchValues 与 this.shopCartList索引是一致的
                this.switchValues.forEach((item,index)=>{
                    //item 的值只有两种 true 和 false
                    if(item){
                        const goodsObj = this.shopCartList[index]
                        //数量的累加
                        statisticsTotalNumber += goodsObj.count;
                        //金额的累加
                        statisticsTotalPrice += parseInt(goodsObj.count) * parseInt(goodsObj.sell_price)
                    }
                })

                //最终赋值，这样的话，就重新计算了
                this.totalCount = statisticsTotalNumber
                this.totalPrice = statisticsTotalPrice
            },
            //删除商品
            deleteGoods(index){
                MessageBox.confirm('确定执行此操作?').then(action => {
                    //1.购物车的徽标数量要更改(减少)
                    bus.$emit('shopCount',-(this.shopCartList[index].count))

                    //2.localStorage中该goodsId对应的数据全部干掉
                    deleteGoods(this.shopCartList[index].id)

                    //3.列表中的那一行商品会不见
                    this.shopCartList.splice(index,1)
                    
                    this.switchValues.splice(index,1)

                    //4.统计的价格和数量要重新计算
                    this.statisticsNumberAndPrice()
                },cancel=>{
                    console.log(cancel)
                })
            }
        }
    }
</script>
