import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/plants",
      name: "plants",
      component: () =>
        import("./views/Plants.vue")
    },
    {
      path: "/forest",
      name: "forest",
      component: () =>
        import("./views/Forest.vue")
    },
    {
      path: "/beach",
      name: "beach",
      component: () =>
        import("./views/Beach.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import("./views/About.vue")
    }
  ]
});
