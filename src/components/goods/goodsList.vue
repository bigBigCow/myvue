<template>
    <div>
        <div>
            <van-grid :border="false" :column-num="2">
                <van-grid-item v-for="item in goodsListArr" :key="item.id" class="goodsInfo">
                    <router-link :to="'/goods/goodsinfo/' + item.id">
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
        this.addGoodsList();
    },
    methods:{
        getGoodsList(){
            this.$axios.get("api/getgoods?pageindex="+this.pageindex).then(res=>{
                // console.log(res);
                this.goodsListArr = res.data.message;
            })
        },
        addGoodsList(){
            window.addEventListener("scroll",()=>{
                let scrollBodyH = document.documentElement.scrollTop || document.body.scrollTop;
                let clientBodyH = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
                let bodyH = document.documentElement.scrollHeight;
                // console.log(bodyH +"..."+clientBodyH+"...."+scrollBodyH);
                let startY;
                let moveY;
                let isAdd = false;
                if(bodyH - scrollBodyH == clientBodyH){
                    isAdd = true;
                    document.body.addEventListener("touchstart",(e)=>{
                        // console.log(e.touches[0].clientY);
                        startY = e.touches[0].clientY;
                        // console.log(startY);
                    })
                    document.body.addEventListener("touchmove",(e)=>{
                        moveY = e.touches[0].clientY;
                        console.log(moveY -startY);
                    })
                    document.body.addEventListener("touchend",()=>{
                        if((moveY - startY < -30) && isAdd){
                        this.pageindex++;
                        // this.getGoodsList();
                        this.$axios.get("api/getgoods?pageindex="+this.pageindex).then(res=>{
                            // console.log(res);
                            this.goodsListArr = this.goodsListArr.concat(res.data.message);
                         })
                         isAdd = false;
                    }
                    })
                }
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