<template>
    <div>
        <div v-show="haveGoods">您的购物车为空，快去选购吧!!</div>
        <ul class="cartAll" v-for="(item,index) in goodsArr" :key="item.id">
            <li class="left">
                <van-switch @change="switchGoods()" v-model="item.checked" size="20"/>
            </li>
            <li class="goodsPic">
                <img :src="item.thumb_path" alt="">
            </li>
            <li class="title">
                <p>{{item.title}}</p>
                <p>
                    <span style="margin-right:10px">售价:{{item.sell_price}}</span>
                    <span>数量:{{item.count}}</span>
                </p>
            </li>
            <li class="right">
                <button ref="removeBtn" @click="removeGoods(index,item.id)">删除</button>
            </li>
        </ul>
        <div class="priceTotal">
            <div>
                <p>总计（不含运费）</p>
                <p>已经勾选商品{{totalCount}}件，总共{{totalPrice}}元</p>
            </div>
            <van-button class="jiesuan" type="danger">立即结算</van-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            // checked: [],
            goodsArr:[],
            goodsIdArr:[],
            haveGoods:false,
            totalPrice:0,  //选中商品总价格
            totalCount:0   //选中商品总数量
        }
    },
    created(){
        this.getCartGoods();
    },
    updated(){
        // updated要改变的数据页面渲染后才能被调用
        // this.getCartGoods();
    },
    methods:{
        getCartGoods(){
            const goodsAll = this.$store.getters.getGoodsList;
            const goodsObj = {};
            goodsAll.forEach(item=>{
                if(goodsObj[item.goodsId]){
                    goodsObj[item.goodsId] += item.goodsCount;
                }else{
                    goodsObj[item.goodsId] = item.goodsCount;
                }
            })
            for (const key in goodsObj) {
                this.goodsIdArr.push(key);
            }
            if(this.goodsIdArr.length>0){
                this.haveGoods = false;
                this.$axios.get("api/goods/getshopcarlist/" + this.goodsIdArr.join(",")).then(res=>{
                    console.log(res);
                    if(res.data.status === 0){
                        this.goodsArr = res.data.message;
                        this.goodsArr.forEach(item=>{
                            item.count = goodsObj[item.id];
                            item.checked = true;
                            // this.checked.push(true);
                            this.switchGoods();
                        })
                    }
                })
            }else{
                this.haveGoods = true;
            }
        },
        switchGoods(){  //计算总价
            let priceEach = 0;
            let countEach = 0;
            this.goodsArr.forEach(item=>{
                if(item.checked == true){
                    priceEach += item.sell_price * item.count; 
                    countEach += item.count;
                }
            })
            this.totalPrice = priceEach;
            this.totalCount = countEach;
        },
        removeGoods(index,id){
            // 删除数据中对应索引的每一项
            this.goodsArr.splice(index,1);
            this.switchGoods();
            // 删除vuex中的数据 ，从后往前删
            for(let i = (this.$store.state.goodsList.length - 1); i>=0 ; i--){
                if(this.$store.state.goodsList[i].goodsId == id){
                    this.$store.state.goodsList.splice(i,1);
                }
            }
            // console.log(this.$store.state.goodsList);
            // this.getCartGoods();
        }
    }
}
</script>
<style lang="less" scoped>
.cartAll{
    display: flex;
    height: 110px;
    >.left{
        flex: 1;
        line-height: 110px;
        // padding-left: 5px;
    }
    >.goodsPic{
        flex: 1;
        position: relative;
        >img{
            width: 100%;
            height: 70px;
            position: absolute;
            top: 50%;
            transform: translate(0,-50%);
        }
    }
    >.title{
        flex: 3;
    }
    >.right{
        flex: 1;
        line-height: 110px;
        >button{
            background-color: #ee0a24;
            border: 0;
            color: cornsilk;
            width: 50px;
            height: 30px;
            line-height: 30px;
        }
    }
}
.goodsPic{
    width: 100px;
    height: 100px;
    margin-right: 5px;
}
.priceTotal{
    margin-top: 20px;
    background-color: rgb(233, 219, 219);
    display: flex;
    justify-content: space-between;
    position: relative;
}
.jiesuan{
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(0,-50%);
}
</style>