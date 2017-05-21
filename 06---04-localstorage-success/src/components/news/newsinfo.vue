<template>
    <div class="tmpl">
        <!-- 1.0 标题 -->
        <div class="title">
            <h4>{{newsInfoData.title}}</h4>
            <p>
                {{newsInfoData.add_time | dateFmt('YYYY-MM-DD')}}&nbsp;&nbsp;
                {{newsInfoData.click}}次浏览&nbsp;&nbsp;
                分类:民生经济
            </p>
        </div>
        <!-- 2.0 内容 -->
        <div class="content">
            <span v-html="newsInfoData.content"></span>
        </div>
        <!-- 3.0 新闻详情评论子组件 -->
        <subcomment :commentId="this.$route.params.newsId"></subcomment>
    </div>
</template>

<style scoped>
    .title{
        border-bottom: 1px solid rgba(92,92,92,0.2);
    }

    .title h4{
        color: #0094ff;
    }

    .content{
        margin-top: 10px;
    }

    .title,.content{
        padding: 5px;
    }
</style>

<script>
    import common from '../../common/common.js';

    //1.0导入评论子组件
    import subcomment from '../subcomponents/subcomment.vue'

    export default{
        data(){
            return {
                newsInfoData:{}
            };
        },
        created(){
            this.getNewsInfoData()
        },
        methods:{
            //获取对应id的新闻数据this.$route.params.newsId
            getNewsInfoData(){
                const url = common.apihost + 'api/getnew/'+this.$route.params.newsId
                this.$http.get(url).then(res=>{
                    //console.log(res.body)
                    this.newsInfoData = res.body.message[0]
                },err=>{

                })
            }
        },
        components:{
            subcomment:subcomment //属性名称和属性值
        }
    }
</script>