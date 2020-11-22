<template>
    <div>
        <!-- {{$route.params.id}} -->
        <div v-for="(item,index) in goodsDetail" :key="index">
            <p>{{item.title}}</p>
            <div v-html="item.content"></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            goodsDetail:[]
        }
    },
    created(){
        this.getGoodsDetail();
    },
    methods:{
        getGoodsDetail(){
            this.$axios.get("api/goods/getdesc/"+this.$route.params.id).then((res)=>{
                console.log(res);
                if(res.data.status === 0){
                    this.goodsDetail = res.data.message;
                }
            })
        }
    }
}
</script>
