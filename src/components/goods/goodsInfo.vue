<template>
    <div>
        <swiper :picArr="this.swiperPic"></swiper>
        <div v-for="item in goodsInfoArr" :key="item.id">
            <p>{{item.title}}</p>
            <!-- <span>{{item.add_time | time_format}}</span> -->
            <div class="price">
                <span>市场价:￥{{item.market_price}}</span>
                <span>销售价:￥{{item.sell_price}}</span>
            </div>
            <p class="count">
                <span @click="subtractCount()">-</span>
                <span :v-model="goodsCount">{{goodsCount}}</span>
                <span @click="addCount()">+</span>
            </p>
            <div>
                <van-button type="info" @click="pushCart()">加入购物车</van-button>
                <van-button type="danger">立即购买</van-button>
            </div>
            <div class="info">
                <p>商品参数</p>
                <p>商品货号：{{item.goods_no}}</p>
                <p>库存情况：{{item.stock_quantity}}</p>
                <p>上架时间:{{item.add_time | time_format}}</p>
            </div>
        </div>
        <van-button plain size="large" type="info" @click="getGoodsDetail()">图文介绍</van-button>
        <van-button plain size="large" type="danger" @click="getGoodsComment()">商品评论</van-button>
    </div>
</template>
<script>
import swiper from "../swipers/swiper.vue"
import bus from "../../../static/js/bus.js"
export default {
    data(){
        return{
            swiperPic:[],
            goodsInfoArr:[],
            goodsCount:1
        }
    },
    created(){
        this.getGoodsSwiper();
        this.getGoodsInfo();
    },
    methods:{
        getGoodsSwiper(){
        this.$axios.get("api/getthumimages/"+ this.$route.params.id).then((res)=>{
            this.swiperPic = res.data.message;
            // console.log(this.swiperPic);
            this.swiperPic.forEach((item)=>{
                item.img = item.src;
            })
        })
        },
        getGoodsInfo(){
            this.$axios.get("api/goods/getinfo/" + this.$route.params.id).then((res)=>{
                // console.log(res);
                if(res.data.status === 0){
                    this.goodsInfoArr = res.data.message;
                }
            })
        },
        // 给图片详情传值id
        getGoodsDetail(){
            this.$router.push({
                path:"/goods/goodsDetail/"+this.$route.params.id
            })
        },
        getGoodsComment(){
            this.$router.push({
                path:"/goods/goodsComment/"+this.$route.params.id
            })
        },
        // 选择的商品数量的增加和减少
        addCount(){
            this.goodsCount++;
        },
        subtractCount(){
            if(this.goodsCount>0){
                this.goodsCount--;
            }
        },
        pushCart(){
            // 用bus组件间传值
            bus.$emit("giveCounts",this.goodsCount);
        }
    },
    components:{
        swiper
    },
}
</script>
<style lang="less" scoped>
p{
    margin: 5px;
}
span{
    margin-left: 5px;
}
.price{
    color: rgb(80, 53, 80);
    font-size: 14px;
    >span:nth-child(1){
        text-decoration: line-through;
    }
    >span:nth-child(2){
        font-size: 16px;
        color: #ee0a24;
        font-weight:bolder;
    }
}
.count{
    >span{
        display: inline-block;
        border: 1px solid #646;
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
    }
}
.info{
    font-size: 14px;
}
.van-button{
    margin-left: 5px;
    border-radius: 5px;
}
.van-button--large{
    margin: 5px 0 0 0;
}
</style>