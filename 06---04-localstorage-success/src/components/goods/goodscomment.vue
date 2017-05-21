<template>
    <div class="tmpl">
        <subcomment :commentId="this.$route.query.goodsId"></subcomment>
    </div>
</template>

<script>
    //导入子组件
    import subcomment from '../subcomponents/subcomment.vue'
    
    export default {
        components:{
            subcomment
        }
    }
</script>
