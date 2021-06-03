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
      path: "/landscape",
      name: "landscape",
      component: () =>
        import("./views/Landscape.vue")
    },
    {
      path: "/ecology",
      name: "ecology",
      component: () =>
        import("./views/Ecology.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import("./views/About.vue")
    }
  ]
});
