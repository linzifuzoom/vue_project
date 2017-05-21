<template>
    <!-- 每一个template之间要有唯一的根元素 -->
    <div class="tmpl">
        <div class="mui-content">
            <ul class="mui-table-view">
                <li v-for="item in newsListData" class="mui-table-view-cell mui-media" :key="item.id">
                    <router-link :to="'/news/newsinfo/'+item.id">
                        <img class="mui-media-object mui-pull-left" :src="item.img_url">
                        <div class="mui-media-body">
                            <div class="news_title">
                                {{item.title}}
                            </div>
                            <p class='mui-ellipsis'>
                                {{item.add_time | dateFmt('YYYY-MM-DD HH:mm')}}
                                <span>
                                    点击数:{{item.click}}
                                </span>
                            </p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .mui-media-object.mui-pull-left{
        height:65px;
        max-width: 65px;
    }

    .news_title{
        /*以下4句是实现文字显示两行，超出的在第二行用...替代关键代码*/
        /* http://www.css88.com/webkit/-webkit-line-clamp/ */
        width:260px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }

    .mui-ellipsis{
        position: relative;
        margin-top: 20px;
        font-size: 12px;
        color: #0094ff;
    }

    .mui-ellipsis > span{
        position: absolute;
        right: 10px;
    }
</style>

<script>
    import common from '../../common/common.js'

    export default{
        data(){ //作用: template需要的数据，都由我来提供
            return {
                newsListData:[]
            }
        },
        created(){ //自动调用，组件创建出来的时候 eslint
            this.getNewsListData()
        },
        methods:{
            //获取新闻列表数据
            getNewsListData(){
                const url = common.apihost + 'api/getnewslist'
                this.$http.get(url).then(res=>{
                    //console.log(res.body.message)
                    this.newsListData = res.body.message
                },err=>{

                })
            }
        }
    }
</script>