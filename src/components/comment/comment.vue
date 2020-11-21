<template>
    <div>
        <textarea ref="pushContent" cols="30" rows="10" placeholder="请输入评论" class="content"></textarea>
        <van-button type="info" size="large" @click="pushcomment()">评论</van-button>
        <p>评论列表</p>
        <div v-for="(item,index) in comments" :key="index" class="commentlist">
            <p>{{item.content}}</p>
            <div class="user">
                <span>{{item.add_time | time_format}}</span>
                <span>{{item.user_name}}</span>
            </div>
        </div>
        <van-button ref="more" type="info" size="large" @click="morecomment();">加载更多</van-button>
    </div>
</template>
<script>
export default {
    props:[
        "commentid"
    ],
    data(){
        return {
            pageindex:1,
            comments:[]
        }
    },
    created(){
        this.getcomment();
    },
    methods:{
        getcomment(){
            this.$axios.get("api/getcomments/"+this.commentid+"?pageindex="+ this.pageindex).then(response=>{
                // console.log(this.commentid);
                this.comments = response.data.message;
            })
        },
        morecomment(){
            this.pageindex++;
            this.getcomment();
        },
        pushcomment(){
            const pushContent = this.$refs.pushContent.value;
            if(pushContent == ""){
                this.$dialog.alert({message: '输入内容为空，请重新输入'});
                return
            }
            this.$axios.post(("api/postcomment/"+this.commentid),{content:pushContent},{emulateJSON:true}).then(response=>{
                // console.log(response)
                if(response.status === 200){
                    this.$dialog.alert({message: '评论成功'});
                }
                this.$refs.pushContent.value = "";
                this.pageindex = 1;
                this.getcomment();
            })
        }
    }
}
</script>
<style lang="less" scoped>
.content{
    margin-top: 30px;
    width: 100%;
    box-sizing: border-box;
}
p{
    margin:5px 0 0 5px;
}
.user{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 16px;
    margin: 0 5px 5px 5px;
}
.commentlist{
    display: flex;
    border-top: 1px solid #000;
    height: 90px;
    box-sizing: border-box;
    justify-content: space-between;
    flex-direction: column;
}
</style>
