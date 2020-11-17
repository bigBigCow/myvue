<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in picArr" :key="item.id">
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<style lang="less" scoped>
.my-swipe{
      height: 200px;
}
.van-swipe-item img{
  width: 100%;
  height: 100%;
}
</style>
<script>
export default {
  props:["picArr"]
}
</script>