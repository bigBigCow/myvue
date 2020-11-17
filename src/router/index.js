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
  path:'/newsall',
  component:()=>
    import(/* webpackChunkName: "newsall" */ "../components/news/newsall.vue")
},
{
  path:'/newsinfo:id',
  component:()=>
    import(/* webpackChunkName: "newsall" */ "../components/news/newsall.vue")
}
];

const router = new VueRouter({
  routes
});

export default router;
