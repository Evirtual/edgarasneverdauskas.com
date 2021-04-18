<template>
  <div id="app">
    <div class="gradient"></div>
    <SideMenu />
    <div class="wrapper">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideMenu from "@/components/SideMenu.vue";

export default {
  name: "App",
  components: {
    SideMenu
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700");
*{
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
  background: #555;
  @media only screen and (min-width: 768px) {
    height: 100vh;
  }
}
body {
  @media only screen and (min-width: 768px) {
    height: 100%;
  }
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 300;
}
.fade-enter-active,
.fade-leave-active {
  transition: height 0.25s ease, 0.25s opacity ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
#app {
  font-family: "Ubuntu", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  font-weight: 300;
  font-size: 14px;
  height: 100%;
  @media only screen and (min-width: 768px) {
    padding-bottom: 0;
  }
}
.gradient {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  opacity: 0.85;
  animation: colorChange 20s linear 0s infinite;
}
.wrapper {
  position: relative;
  width: auto;
  margin-left: 20px;
  margin-right: 20px;
  min-height: calc(100vh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (min-width: 768px) {
    margin-left: calc(100px + 6em);
    margin-right: 3em;
    min-height: 100vh;
  }
}
@keyframes colorChange {
  0% {
    background: linear-gradient(to right, #ff8888, #ffb088);
  }
  1% {
    background: linear-gradient(to right, #ff8f88, #ffb788);
  }
  2% {
    background: linear-gradient(to right, #ff9688, #ffbe88);
  }
  3% {
    background: linear-gradient(to right, #ff9d88, #ffc588);
  }
  4% {
    background: linear-gradient(to right, #ffa588, #ffcc88);
  }
  5% {
    background: linear-gradient(to right, #ffac88, #ffd388);
  }
  6% {
    background: linear-gradient(to right, #ffb388, #ffdb88);
  }
  7% {
    background: linear-gradient(to right, #ffba88, #ffe288);
  }
  8% {
    background: linear-gradient(to right, #ffc188, #ffe988);
  }
  9% {
    background: linear-gradient(to right, #ffc888, #fff088);
  }
  10% {
    background: linear-gradient(to right, #ffcf88, #fff788);
  }
  11% {
    background: linear-gradient(to right, #ffd788, #fffe88);
  }
  12% {
    background: linear-gradient(to right, #ffde88, #f9ff88);
  }
  13% {
    background: linear-gradient(to right, #ffe588, #f2ff88);
  }
  14% {
    background: linear-gradient(to right, #ffec88, #eaff88);
  }
  15% {
    background: linear-gradient(to right, #fff388, #e3ff88);
  }
  16% {
    background: linear-gradient(to right, #fffa88, #dcff88);
  }
  17% {
    background: linear-gradient(to right, #fdff88, #d5ff88);
  }
  18% {
    background: linear-gradient(to right, #f5ff88, #ceff88);
  }
  19% {
    background: linear-gradient(to right, #eeff88, #c7ff88);
  }
  20% {
    background: linear-gradient(to right, #e7ff88, #c0ff88);
  }
  21% {
    background: linear-gradient(to right, #e0ff88, #b8ff88);
  }
  22% {
    background: linear-gradient(to right, #d9ff88, #b1ff88);
  }
  23% {
    background: linear-gradient(to right, #d2ff88, #aaff88);
  }
  24% {
    background: linear-gradient(to right, #cbff88, #a3ff88);
  }
  25% {
    background: linear-gradient(to right, #c4ff88, #9cff88);
  }
  26% {
    background: linear-gradient(to right, #bcff88, #95ff88);
  }
  27% {
    background: linear-gradient(to right, #b5ff88, #8eff88);
  }
  28% {
    background: linear-gradient(to right, #aeff88, #88ff8a);
  }
  29% {
    background: linear-gradient(to right, #a7ff88, #88ff91);
  }
  30% {
    background: linear-gradient(to right, #a0ff88, #88ff98);
  }
  31% {
    background: linear-gradient(to right, #99ff88, #88ff9f);
  }
  32% {
    background: linear-gradient(to right, #92ff88, #88ffa6);
  }
  33% {
    background: linear-gradient(to right, #8aff88, #88ffad);
  }
  34% {
    background: linear-gradient(to right, #88ff8d, #88ffb4);
  }
  35% {
    background: linear-gradient(to right, #88ff94, #88ffbc);
  }
  36% {
    background: linear-gradient(to right, #88ff9b, #88ffc3);
  }
  37% {
    background: linear-gradient(to right, #88ffa2, #88ffca);
  }
  38% {
    background: linear-gradient(to right, #88ffa9, #88ffd1);
  }
  39% {
    background: linear-gradient(to right, #88ffb0, #88ffd8);
  }
  40% {
    background: linear-gradient(to right, #88ffb8, #88ffdf);
  }
  41% {
    background: linear-gradient(to right, #88ffbf, #88ffe6);
  }
  42% {
    background: linear-gradient(to right, #88ffc6, #88ffee);
  }
  43% {
    background: linear-gradient(to right, #88ffcd, #88fff5);
  }
  44% {
    background: linear-gradient(to right, #88ffd4, #88fffc);
  }
  45% {
    background: linear-gradient(to right, #88ffdb, #88fbff);
  }
  46% {
    background: linear-gradient(to right, #88ffe2, #88f4ff);
  }
  47% {
    background: linear-gradient(to right, #88ffea, #88edff);
  }
  48% {
    background: linear-gradient(to right, #88fff1, #88e6ff);
  }
  49% {
    background: linear-gradient(to right, #88fff8, #88deff);
  }
  50% {
    background: linear-gradient(to right, #88ffff, #88d7ff);
  }
  51% {
    background: linear-gradient(to right, #88f8ff, #88d0ff);
  }
  52% {
    background: linear-gradient(to right, #88f1ff, #88c9ff);
  }
  53% {
    background: linear-gradient(to right, #88eaff, #88c2ff);
  }
  54% {
    background: linear-gradient(to right, #88e2ff, #88bbff);
  }
  55% {
    background: linear-gradient(to right, #88dbff, #88b4ff);
  }
  56% {
    background: linear-gradient(to right, #88d4ff, #88acff);
  }
  57% {
    background: linear-gradient(to right, #88cdff, #88a5ff);
  }
  58% {
    background: linear-gradient(to right, #88c6ff, #889eff);
  }
  59% {
    background: linear-gradient(to right, #88bfff, #8897ff);
  }
  60% {
    background: linear-gradient(to right, #88b8ff, #8890ff);
  }
  61% {
    background: linear-gradient(to right, #88b0ff, #8889ff);
  }
  62% {
    background: linear-gradient(to right, #88a9ff, #8e88ff);
  }
  63% {
    background: linear-gradient(to right, #88a2ff, #9588ff);
  }
  64% {
    background: linear-gradient(to right, #889bff, #9d88ff);
  }
  65% {
    background: linear-gradient(to right, #8894ff, #a488ff);
  }
  66% {
    background: linear-gradient(to right, #888dff, #ab88ff);
  }
  67% {
    background: linear-gradient(to right, #8a88ff, #b288ff);
  }
  68% {
    background: linear-gradient(to right, #9288ff, #b988ff);
  }
  69% {
    background: linear-gradient(to right, #9988ff, #c088ff);
  }
  70% {
    background: linear-gradient(to right, #a088ff, #c788ff);
  }
  71% {
    background: linear-gradient(to right, #a788ff, #cf88ff);
  }
  72% {
    background: linear-gradient(to right, #ae88ff, #d688ff);
  }
  73% {
    background: linear-gradient(to right, #b588ff, #dd88ff);
  }
  74% {
    background: linear-gradient(to right, #bc88ff, #e488ff);
  }
  75% {
    background: linear-gradient(to right, #c488ff, #eb88ff);
  }
  76% {
    background: linear-gradient(to right, #cb88ff, #f288ff);
  }
  77% {
    background: linear-gradient(to right, #d288ff, #f988ff);
  }
  78% {
    background: linear-gradient(to right, #d988ff, #ff88fd);
  }
  79% {
    background: linear-gradient(to right, #e088ff, #ff88f6);
  }
  80% {
    background: linear-gradient(to right, #e788ff, #ff88ef);
  }
  81% {
    background: linear-gradient(to right, #ee88ff, #ff88e8);
  }
  82% {
    background: linear-gradient(to right, #f588ff, #ff88e1);
  }
  83% {
    background: linear-gradient(to right, #fd88ff, #ff88da);
  }
  84% {
    background: linear-gradient(to right, #ff88fa, #ff88d3);
  }
  85% {
    background: linear-gradient(to right, #ff88f3, #ff88cb);
  }
  86% {
    background: linear-gradient(to right, #ff88ec, #ff88c4);
  }
  87% {
    background: linear-gradient(to right, #ff88e5, #ff88bd);
  }
  88% {
    background: linear-gradient(to right, #ff88de, #ff88b6);
  }
  89% {
    background: linear-gradient(to right, #ff88d7, #ff88af);
  }
  90% {
    background: linear-gradient(to right, #ff88cf, #ff88a8);
  }
  91% {
    background: linear-gradient(to right, #ff88c8, #ff88a1);
  }
  92% {
    background: linear-gradient(to right, #ff88c1, #ff8899);
  }
  93% {
    background: linear-gradient(to right, #ff88ba, #ff8892);
  }
  94% {
    background: linear-gradient(to right, #ff88b3, #ff888b);
  }
  95% {
    background: linear-gradient(to right, #ff88ac, #ff8c88);
  }
  96% {
    background: linear-gradient(to right, #ff88a5, #ff9388);
  }
  97% {
    background: linear-gradient(to right, #ff889d, #ff9a88);
  }
  98% {
    background: linear-gradient(to right, #ff8896, #ffa188);
  }
  99% {
    background: linear-gradient(to right, #ff888f, #ffa988);
  }
  100% {
    background: linear-gradient(to right, #ff8888, #ffb088);
  }
}
</style>
