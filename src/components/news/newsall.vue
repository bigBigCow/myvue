<template>
  <div>
    <router-link v-for="item in newslist" :key="item.id" :to="'/news/newsinfo/' + item.id">
      <van-card
        :num="item.click"
        :price="item.add_time | time_format"
        :title="item.title"
        :thumb="item.img_url"/>
    </router-link>
  </div>
</template>
<script>
export default {
    data(){
        return {
            newslist:[],
            newsid:[]
         }
    },
  created() {
    this.getnewslist();
  },
  methods: {
    getnewslist() {
      this.$axios.get("api/getnewslist").then(response => {
        // console.log(response);
        this.newslist = response.data.message;
      });
    },
    // getnewsid(newsid){
    //   console.log(newsid)
    // }
  }
};
</script>
<style lang="less" scoped>
.van-card__title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.van-card__price span{
    font-size: 12px;
}
.van-card__price-currency{
  display: none;
}
</style>