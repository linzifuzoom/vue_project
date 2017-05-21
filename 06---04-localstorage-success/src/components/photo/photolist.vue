<template>
    <div class="tmpl">
        <!-- 1.0 图片分类 -->
        <div class="categoryStyle">
            <ul class="categoryUlStyle" ref="categoryUlRef">
                <li @click="getImageListByCategoryId(0)">全部</li>
                <li @click="getImageListByCategoryId(item.id)" v-for="item in photoCategoryList" :key="item.id">{{item.title}}</li>
            </ul>
        </div>

        <!-- 2.0 图片列表-->
        <div class="imageListStyle">
            <ul>
                <li v-for="item in imageList" :key="item.id">
                    <router-link :to="'/photo/photoinfo/'+item.id">
                        <img :src="item.img_url">
                        <p>
                            <span class="title">{{item.title}}</span>
                            <br/>
                            {{item.zhaiyao}}
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    /**
    图片分类样式
    */
    .categoryStyle{
        overflow-x: auto;
    }

    .categoryUlStyle{
        width: 1200px;
        padding-left: 0px;
        margin: 5px 0px;
        margin-bottom: 20px;
    }

    .categoryUlStyle li{
        list-style: none;
        display: inline;
        color: #0094ff;
        padding: 5px 5px;
    }

    /**
        图片列表的样式
    */
    .imageListStyle ul{
        margin: 2px;
        padding-left: 0;
    }

    .imageListStyle li img{
        width: 100%;
        height: 400px;
    }

    .imageListStyle li{
        position: relative;
    }

    .imageListStyle p{
        position: absolute;
        left: 0;
        bottom: 0;
        color: #ffffff;
        background-color: rgba(0,0,0,0.4);
    }

    .title{
        font-weight: bold;
    }
</style>

<script>
    import common from '../../common/common.js';

    import { Indicator } from 'mint-ui';

    export default{
        data(){
            return {
                photoCategoryList:[],
                imageList:[]
            };
        },
        created(){
            //获取图片分类的数据
            this.getPhotoCategoryData()
            //加载全部的数据
            this.getImageListByCategoryId(0)
        },
        destroyed(){
            //清理工作
            //console.log("photolist destroyed")
            Indicator.close();
        },
        methods:{
            //获取图片分类数据
            getPhotoCategoryData(){
                const url = `${common.apihost}api/getimgcategory`

                this.$http.get(url).then(res=>{
                    const count = (res.body.message.length + 1)

                    this.$refs.categoryUlRef.style.width = count * 76+"px"

                    this.photoCategoryList = res.body.message
                },err=>{

                })
            },
            //根据分类id获取图片列表
            getImageListByCategoryId(categoryId){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'triple-bounce'
                });

                const url = `${common.apihost}api/getimages/${categoryId}`

                this.$http.get(url).then(res=>{
                    Indicator.close();
                    this.imageList = res.body.message
                },err=>{
                    console.log(err)
                })
            }
        }
    }
</script>