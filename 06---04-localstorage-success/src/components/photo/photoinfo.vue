<template>
    <div class="tmpl">
        <!-- 1.0 标题 -->
        <div class="title">
            <h4>{{photoInfo.title}}</h4>
            <p>
                {{photoInfo.add_time | dateFmt('YYYY-MM-DD')}}
                &nbsp;&nbsp;
                {{photoInfo.click}}次浏览
            </p>
        </div>

        <!-- 2.0 缩略图 -->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="(item,index) in thumbnailImages" :key="item.src"  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <img class="preview-img" height="100" :src="item.src" @click="$preview.open(index, thumbnailImages)">
                </li>
            </ul>
        </div>

        <!-- 3.0 内容 -->
        <div class="content">
            <span v-html="photoInfo.content"></span>
        </div>

        <!-- 4.0 评论子组件 -->
        <subcomment :commentId="this.$route.params.photoId"></subcomment>
    </div>
</template>

<style scoped>
    .title{
        padding: 5px;
        border-bottom: 2px solid rgba(92,92,92,0.3);
    }

    .title h4{
        color: #0094ff;
    }

    .content{
        padding: 5px;
        font-size: 14px;
        color: #777777;
    }
</style>

<script>
    import common from '../../common/common.js';

    //1.导入评论子组件
    import subcomment from '../subcomponents/subcomment.vue'

    export default{
        data(){
            return {
                photoInfo : {},//图片详情
                thumbnailImages : [] //缩略图
            };
        },
        created(){
            //获取图片详情数据
            this.getPhotoInfoData()
            //获取缩略图数据
            this.getThumbnailImagesData()
        },
        methods:{
            //1.0 获取图片信息数据
            getPhotoInfoData(){
                const url = `${common.apihost}api/getimageInfo/${this.$route.params.photoId}`

                this.$http.get(url).then(res=>{
                    this.photoInfo = res.body.message[0]
                },err=>{

                })
            },
            //2.0 获取图片的缩略图
            getThumbnailImagesData(){
                const url = `${common.apihost}api/getthumimages/${this.$route.params.photoId}`

                this.$http.get(url).then(res=>{
                    res.body.message.forEach(item=>{
                        item.w = 600
                        item.h = 400
                    })
                    console.log(res.body.message)
                    this.thumbnailImages = res.body.message
                },err=>{

                })
            }
        },
        components:{ //2.0 注册子组件
            subcomment //属性名称和属性值一样
        }
    }
</script>