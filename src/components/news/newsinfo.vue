<template>
    <div>
        <div v-for="item in newinfo" :key="item.id">
            <p class="title">{{item.title}}</p>
            <div class="time">
                <span>{{item.add_time | time_format}}</span>
                <span>点击数:&nbsp;{{item.click}}</span>
            </div>
            <div v-html="item.content">
            </div>
            <comment :commentid="item.id"></comment>
        </div>
    </div>
</template>
<script>
import comment from "../comment/comment.vue"
export default {
    data(){
        return {
            newinfo:[]
        }
    },
    created(){
        this.getnew()
    },
    methods:{
        getnew(){
            this.$axios.get("api/getnew/"+this.$route.params.id).then((response)=>{
                // console.log(response);
                if(response.status === 200){
                    this.newinfo = response.data.message;
                }else{
                    console.log("获取新闻失败");
                }
            })
        }
    },
    components:{
        comment
    }
}
</script>
<style lang="less" scoped>
.title{
    text-align: center;
    padding: 10px;
    margin: 0;
}
.time{
    display: flex;
    justify-content: space-between;
    >span{
        line-height: 20px;
        margin-left: 8px;
        margin-right: 8px;
    }
}
</style>