import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    goodsList:[]
  },
  getters:{
    getTotalCount(state){
      const goodsList = state.goodsList;
      let totalCount = 0;
      for (let i = 0; i < goodsList.length; i++) {
        totalCount += goodsList[i].goodsCount;
      }
      return totalCount
    },
    getGoodsList(state){
      return state.goodsList
    }
  },
  mutations: {
    // 同步保存
    pushGoods(state,goodsobj){
      state.goodsList.push(goodsobj);
      // console.log(state.goodsList);
    }
  },
  actions: {
    //异步保存，依赖mutations
    // asyncPushGoods(context,goods){
    //   setTimeout(() => {
    //     context.commit("pushGoods",goods);
    //   }, 2000);
    // }
  },
  modules: {}
});
