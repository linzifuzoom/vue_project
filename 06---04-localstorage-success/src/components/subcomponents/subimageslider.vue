<template>
  <div>
    <!-- 1.0 轮播图 用mint-ui中的Swipe组件 -->
    <mt-swipe class="mtswipe" :auto="2000">
        <mt-swipe-item v-for="item in lunboList" :key="item.url">
            <a :href="item.url">
                <img :src="item.img">
            </a>
        </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<style scoped>
    /**1.0 轮播图的样式*/
    /*
        设置轮播的区域大小
    */
    .mtswipe{
        height: 250px;
        width: 100%;
    }

    /*
        设置轮播每个item的大小
    */
    .mtswipe img{
        height: 250px;
        width: 100%;
    }
</style>


<script>
    import common from '../../common/common.js'
    export default {
        data(){
            return {
            }
        },
        props:['lunboList']
    }
</script>


