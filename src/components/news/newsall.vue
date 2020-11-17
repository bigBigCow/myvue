<template>
  <div>
    <router-link to="'/news/newsinfo/' + item.id">
      <van-card v-for="item in newslist" :key="item.id"
        :num="item.click"
        :price="item.add_time | time_format"
        :desc="item.zhaiyao"
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
        console.log(response);
        this.newslist = response.data.message;
      });
    }
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