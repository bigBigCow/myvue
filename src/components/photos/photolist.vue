<template>
    <div>
        <!-- 头部滑动区域 -->
        <ul class="newsAll">
            <li v-for="item in photoTitle" :key="item.id" @click="getPhotoDetail(item.id)">{{item.title}}</li>
        </ul>
        <!-- 图片列表区域 -->
        <ul>
            <li v-for="item in photoDetail" :key="item.id" class="photoLi">
                <p>{{item.title}}</p>
                <router-link :to="'/photos/photoDetail/'+item.id">
                    <img class="photos" :src="item.img_url" alt="">
                </router-link>
                <span class="zhaiyao">{{item.zhaiyao}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            photoTitle:[],
            photoDetail:[],
            firstId:0,
            photoArr:[]
        }
    },
    created(){
        this.getPhotoList();
        this.getPhotoDetail(this.firstId);
    },
    methods:{
        getPhotoList(){
            this.$axios.get("api/getimgcategory").then(response=>{
                // console.log(response);
                if(response.status === 200){
                    this.photoTitle = response.data.message; 
                    this.firstId = this.photoTitle[3].id;
                }
                // console.log(this.firstId)
            })
        },
        getPhotoDetail(liId){
            this.$axios.get("api/getimages/" + liId).then(response=>{
                // console.log(response);
                if(response.status === 200){
                    this.photoDetail = response.data.message;
                    // response.data.message.forEach(item=>{
                    //     this.photoArr.push(item.img_url);
                    // })
                }
                // console.log(this.photoArr)
            })
        }
    },
//     components: {
//     [ImagePreview.Component.name]: ImagePreview.Component,
//   },
}
</script>
<style lang="less" scoped>
.newsAll{
    height: 30px;
    white-space: nowrap;
    overflow-x: auto;
    >li{
        display: inline-block;
        margin-right: 5px;
    }
}
.photos{
    width: 100%;
}
.photoLi{
    position: relative;
}
.zhaiyao{
    position: absolute;
    // width: 100%;
    left: 0;
    bottom: 10px;
    text-align: left;
    color:hotpink;
    opacity: .5;
}
</style>