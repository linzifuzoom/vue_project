<template>
    <div>
        <!-- 1.0 提交评论 -->
        <div class="postCommentStyle">
            <h4>提交评论</h4>
            <div class="submitCommentStyle">
                <textarea ref="textAreaRef" rows="5" class="submitTextAreaStyle" placeholder="请输入要提交的内容"></textarea>

                <mt-button @click="postComment" size="large" type="primary">提交评论</mt-button>
            </div>
        </div>

        <!-- 2.0 评论列表 -->
        <div class="commentListStyle">
            <h4>评论列表</h4>
            <div v-for="(item,index) in commentListData" :key="index" class="commentItem">
                <h5>{{item.content}}</h5>
                <p class="commentUserAndTime">
                    <span class="commentUser">
                        {{item.user_name}}
                    </span>
                    <span class="commentTime">
                        {{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}
                    </span>
                </p>
            </div>
            <mt-button @click="loadMore" class="loadmore" plain size="large" type="danger">加载更多</mt-button>
        </div>
    </div>
</template>

<style scoped>
    h4{
        padding: 5px 5px 10px 5px;
        border-bottom: 1px solid rgba(92,92,92,0.2);
    }

    .submitCommentStyle,.commentListStyle{
        padding: 5px;
    }

    .commentItem{
        padding: 5px;
        border-bottom: 1px solid rgba(92,92,92,0.2);
        height: 70px;
        overflow-y: auto;
    }

    h5{
        font-size: 16px;
        color: black;
    }

    .commentUserAndTime{
        margin-top: 15px;
        color: #0094ff;
    }

    .commentUser{
        float: left;
        width: 50%;
    }

    .commentTime{
        float: right;
    }

    .loadmore{
        margin-top: 20px;
        margin-bottom: 10px;
    }
</style>

<script>
    import common from '../../common/common.js';

    //导入Toast
    import { Toast } from 'mint-ui';

    export default{
        data(){
            return {
                pageIndex : 1, //请求的页数
                isLoadFirstPage : true, //是否加载第一页
                commentListData : [] //获取到的列表数据
            };
        },
        created(){
            this.getCommentListData()
        },
        methods:{
          //1.获取对应`id`的评论数据
          getCommentListData(){
              const url = `${common.apihost}api/getcomments/${this.commentId}?pageindex=${this.pageIndex}`

              this.$http.get(url).then(res=>{
                  if(this.isLoadFirstPage){ //加载第一页
                    this.commentListData = res.body.message
              }else{ //加载更多
                        this.commentListData = this.commentListData.concat(res.body.message)
              }

              },err=>{

              })
          },
          //2.0 加载更多
            loadMore(){
                this.isLoadFirstPage = false //不是去加载第一页
                this.pageIndex++

                this.getCommentListData()
            },
            //3.0 提交评论
            postComment(){
                const commentContent = this.$refs.textAreaRef.value

                if (commentContent==null || commentContent.trim().length<=0){
                    Toast({
                        message: '您没有输入评论的内容',
                        position: 'middle',
                        duration: 3000
                    });
                    return
                }

                //提交
                const url = `${common.apihost}api/postcomment/${this.commentId}`
                this.$http.post(url,{content:commentContent},{emulateJSON:true}).then(res=>{
                    //1.弹出提示
                    Toast({
                            message:res.body.message
                    })
                    //2.清空texaArea的内容
                    this.$refs.textAreaRef.value = ''
                    //3.重新查询第一页的内容
                    this.pageIndex = 1
                    this.isLoadFirstPage = true
                    this.getCommentListData()
                },err=>{
                    console.log(err)
                })
            }
        },
        props: ['commentId']
    }
</script>