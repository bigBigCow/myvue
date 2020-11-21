<template>
    <div>
        <div v-for="item in picInfo" :key="item.id">
            <p class="title">{{item.title}}</p>
            <div class="time">
                <span>{{item.add_time | time_format}}</span>
                <span>点击数{{item.click}}</span>
            </div>
        </div>
        <van-grid :column-num="3">
            <van-grid-item v-for="(item,index) in pictures" :key="index">
                <van-image :src="item.src" @click="picPreview()"/>
            </van-grid-item>
        </van-grid>
        <comment :commentid="picId" class="comments"></comment>
    </div>
</template>
<script>
import { ImagePreview } from 'vant';
import comment from "../comment/comment.vue"
export default {
    data(){
        return {
            picInfo:[],
            pictures:[],
            picId:0
        }
    },
    created(){
        this.getPhotoInfo();
        this.getPictures();
    },
    methods:{
        getPhotoInfo(){
            this.$axios.get("api/getimageInfo/" + this.$route.params.id).then(res=>{
                if(res.status === 200){
                    this.picInfo = res.data.message;
                    this.picId = this.picInfo[0].id;
                }
                // console.log(this.picInfo[0].id)
            })
        },
        getPictures(){
            this.$axios.get("api/getthumimages/"+this.$route.params.id).then(res=>{
                if(res.status === 200){
                    this.pictures = res.data.message;
                }
            })
        },
        picPreview(){
            var pic = [];
            this.pictures.forEach(item=>{
                pic.push(item.src)
            })
            ImagePreview({
                images: pic,
                startPosition: 0,
                closeable: true,
            });
        }
    },
    components:{
        comment:comment
    }
}
</script>
<style lang="less" scoped>
.title{
    text-align: center;
}
.time{
    display: flex;
    justify-content: space-between;
    line-height: 25px;
    >span{
        margin-left: 15px;
        margin-right: 15px;
    }
}
.comments{
    margin-top: 30px;
}
</style>