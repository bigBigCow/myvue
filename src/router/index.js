import Vue from "vue";
import VueRouter from "vue-router";
import home from "../components/home/home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    redirect:'/home'  
  },
  {
    path: "/home",
    component: home
  },
  {
     path:"/classify",
     component: () =>
      import(/* webpackChunkName: "classify" */ "../components/classify/classify.vue") 
  },
  {
    path:"/cart",
    component: () =>
     import(/* webpackChunkName: "cart" */ "../components/cart/cart.vue") 
 },
 {
  path:"/mine",
  component: () =>
   import(/* webpackChunkName: "mine" */ "../components/mine/mine.vue") 
},
{
  path:"/news/newsall",
  component:()=>
    import(/* webpackChunkName: "newsall" */ "../components/news/newsall.vue")
},
{
  path:"/news/newsinfo/:id",  //这个路径一定要和to里面的一样，少个/找了半天
  component:()=>
    import(/* webpackChunkName: "newsinfo" */ "../components/news/newsinfo.vue")
}
];

const router = new VueRouter({
  routes
});

export default router;
