<template>
  <div>
    <swiper :picArr="this.picArr"></swiper>
    <van-grid :border="false" :column-num="3">
      
      <van-grid-item>
        <router-link to="/news/newsall">
          <img src="../../assets/menu1.png" alt="">
          <p>新闻资讯</p>
        </router-link>
      </van-grid-item>     
      <van-grid-item>
        <router-link to="/photos/photolist">
          <img src="../../assets/menu2.png" alt="">
          <p>图片分享</p>
        </router-link>
      </van-grid-item>
      <van-grid-item>
        <img src="../../assets/menu3.png" alt="">
        <p>商品购买</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../../assets/menu4.png" alt="">
        <p>留言反馈</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../../assets/menu5.png" alt="">
        <p>视频专区</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../../assets/menu6.png" alt="">
        <p>联系我们</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import swiper from "../swipers/swiper.vue";
export default {
   data(){
    return {
      picArr:[]
    }
  },
  created(){
    this.getswiper();
  },
  methods:{
    getswiper(){
      this.$axios.get("api/getlunbo").then((response) => {
        this.picArr = response.data.message;
      })
    }
  },
  components: {
    swiper
  }
};
</script>
<style lang="less" scoped>
.van-grid-item .van-grid-item__content--center p{
  margin: 8px 0 0 0;
  font-size: 14px;
}
.van-grid-item__content--center img{
  width: 50px;
  height: 50px;
}
.van-grid-item__content a{
  color: #000;
}
</style>