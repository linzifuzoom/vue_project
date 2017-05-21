<template>
    <div>
        <!-- 头部 -->
        <mt-header fixed title="Vue管理系统"></mt-header>
        <!-- 全局返回按钮 -->
        <div class="back" v-if="isShow">
            <a @click="goback">&lt;返回</a>
        </div>

        <!-- 中间显示的内容,用router-view先占个位置 -->
        <router-view></router-view>

        <!-- 尾部 -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-pengyouquan"></span>
                <span class="mui-tab-label">消息333</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcart">
                <span class="mui-icon mui-icon-contact">
                    <span id="badgeId" class="mui-badge">{{count}}</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/settings">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">设置</span>
            </router-link>
        </nav>
    </div>
</template>

<style scoped>
    .back{
        z-index: 1;
        position: fixed;
        left: 10px;
        top:10px;
    }

    .back a{
        font-size: 14px;
        color: #ffffff;
        font-weight: 900;
    }
</style>

<script>

    import {bus} from './common/commonvue.js'

    //导入shopCartHelper中的成员
    import {getGoodsCount} from './common/shopCartHelper.js'

    //集成jQuery
    //1.下载及安装包 npm i jquery@3.2.1 --save
    //2.导入 import $ from 'jquery'

    import $ from 'jquery'

    bus.$on('shopCount', function (goodsCount) {
        //console.log(goodsCount)
        const badgeObj = $("#badgeId")

        const oldValue = $("#badgeId").text() - 0

        badgeObj.text(oldValue + goodsCount)
    })

    export default{
        data(){
            return {
                isShow:false,
                count : 0
            }
        },
        created(){
            //console.log(this.$route.path)
            //this.$route.path 只会打印当前正在展示的组件的路由
            if (this.$route.path.includes('home')||
                    this.$route.path.includes('member')||
                    this.$route.path.includes('shopcart')||
                    this.$route.path.includes('settings')){
                this.isShow=false
            }else{
                this.isShow=true
            }

            //获取我们的购物车中商品的个数
            this.getLocalStorageGoodsCount()
        },
        methods:{
            //返回
            goback(){
                this.$router.go(-1)
            },
            //获取存储在localStorage中的购物车的数量
            getLocalStorageGoodsCount(){
                this.count = getGoodsCount()
            }
        },
        watch:{
            '$route':function (newValue,oldValue) {
                //console.log(newValue)
                if (newValue.path.includes('home')|| 
                        newValue.path.includes('member')||
                        newValue.path.includes('shopcart')||
                        newValue.path.includes('settings')){
                    this.isShow=false
                }else{
                    this.isShow=true
                }
            }
        }
    }
</script>