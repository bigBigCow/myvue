<template>
    <div>
        <div>
            <van-grid :border="false" :column-num="2">
                <van-grid-item v-for="item in goodsListArr" :key="item.id" class="goodsInfo">
                    <router-link to="/goods/goodsinfo">
                        <van-image class="photos" :src="item.img_url"/>
                        <p class="title">{{item.title}}</p>
                    </router-link>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            pageindex:1,
            goodsListArr:[]
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            this.$axios.get("api/getgoods?pageindex="+this.pageindex).then(res=>{
                console.log(res);
                this.goodsListArr = res.data.message;
            })
        }
    }
}
</script>
<style lang="less" scoped>
.goodsInfo{
  overflow: hidden;
}
.photos{
    height: 30vh;
}
.router-link-exact-active{
    width: 100%;
}
.title{
    display: inline-block;
    width: 50vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    color: #000;
}
</style>