<template>
    <div class="subnumberStyle">
        <div @click="substrict" class="left">-</div>
        <div class="middle">{{count}}</div>
        <!--<input class="middle" type="number" v-model="count" />-->
        <div @click="add" class="right">+</div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                count:1
            }
        },
        methods:{
            substrict(){
                if(this.count<=1){
                    return
                }

                this.count--

                this.notify()
            },
            add(){
                this.count++
                this.notify()
            },
            notify(){
                //就将子组件中的count值，传递给父组件
                this.$emit('numberChange',this.count)
            }
        }
    }
</script>

<style>
    .subnumberStyle{
        margin-bottom: 10px;
    }

    .left,.middle,.right{
        display: inline-block;
        border: 1px solid rgba(92,92,92,0.3);
        width:30px;
        text-align: center;
        height: 25px;
        line-height: 25px;
    }

    .middle{
        width: 40px;
    }
</style>

