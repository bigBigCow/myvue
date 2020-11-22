<template>
  <div id="app">
    <van-nav-bar fixed title="小柠檬商城" style="background-color: #26a2ff;"/>
    <div class="back" @click="goback" v-show="isshow"> &lt; 回退</div>
    <router-view></router-view>
    <van-tabbar class="footer" v-show="footershow">
      <router-link to="/home">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      </router-link>
      <router-link to="/classify">
        <van-tabbar-item icon="qr">分类</van-tabbar-item>
      </router-link>
      <router-link class="cart" to="/cart">
          <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
          <span class="count" v-show="cartCount">{{cartCount}}</span>
      </router-link>
      <router-link to="/mine">
        <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
      </router-link>
    </van-tabbar>
  </div>
</template>

<style lang="less" scoped>
#app{
  padding-top: 46px;
}
// .van-nav-bar__content {
//   background-color: #26a2ff;
// }
.footer{
  display: flex;
}
.footer a{
  flex: 1;
}
.back{
  position: fixed;
  top: 12px;
  left: 8px;
  z-index: 9;
}
.footer .van-tabbar-item--active{
  color: #646566;
}
.cart{
  position: relative;
}
.count{
  background-color: red;
  position: absolute;
  width: 18px;
  height: 18px;
  right: 25%;
  top: 0;
  border-radius: 50%;
  text-align: center;
  font-size: 14px;
  line-height: 18px;
}
</style>
<script>
import bus from "../static/js/bus";
export default {
  data(){
    return {
      isgoback:true,
      isshow:true,
      footershow:true,
      cartCount:0
    }
  },
  created(){
    // console.log(Object.prototype.toString.call(this.$route.path))
    this.ishome();
    this.getGoodsCount();
  },
  methods:{
    ishome(){
      if(this.$route.path != "/home"){
        this.isgoback = true;
        this.isshow = true;
        this.footershow = false;
      }else{
        this.isgoback = false;
        this.isshow = false;
        this.footershow = true;
    }
    },
    goback:function(){
      if(this.isgoback == true){
        this.$router.go(-1);
      }
    },
    getGoodsCount(){
      bus.$on("giveCounts",val=>{
        console.log(val);
        this.cartCount += val;
      })
    }
  },
  watch:{
    $route:function(newpath){
      // console.log(oldpath);
      if(newpath.path != "/home"){
        this.isgoback = true;
        this.isshow = true;
        this.footershow = false;
      }else{
        this.isgoback = false;
        this.isshow = false;
        this.footershow = true;
      }
      // console.log(this.isgoback);
    }
  }
}
</script>
