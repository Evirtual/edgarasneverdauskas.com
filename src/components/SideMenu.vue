<template>
  <div>
    <router-link to="/" class="logo">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 1000 1000"
        enable-background="new 0 0 1000 1000"
        xml:space="preserve"
      >
        <g id="Layer_2" display="none">
          <g display="inline">
            <polygon
              fill="#D0494A"
              points="533,250 476,250 250,250 250,750 750,750 750,250"
            ></polygon>
          </g>
        </g>
        <g id="Layer_3"></g>
        <g id="symbols">
          <rect fill="#FFFFFF" width="1000" height="88"></rect>
          <rect fill="#FFFFFF" width="94" height="1000"></rect>
          <rect y="902" fill="#FFFFFF" width="1000" height="98"></rect>
          <rect x="899" fill="#FFFFFF" width="104" height="1000"></rect>
          <polygon
            fill="#FFFFFF"
            points="230.6,312.1 172.3,370.4 629.9,827.7 688.2,769.5"
          ></polygon>
          <polygon
            fill="#FFFFFF"
            points="288.9,370.4 87.8,571.4 29.5,513.1 230.6,312.1"
          ></polygon>
          <polygon
            fill="#FFFFFF"
            points="488.5,569.9 287.4,770.9 229.2,712.7 430.3,511.7"
          ></polygon>
          <polygon
            fill="#FFFFFF"
            points="688.2,769.5 487.1,970.5 428.8,912.2 629.9,711.2"
          ></polygon>
          <polygon
            fill="#FFFFFF"
            points="513.3,29.5 455,87.8 912.6,545.2 970.9,486.9"
          ></polygon>
          <polygon
            fill="#FFFFFF"
            points="230.6,312.1 213.2,390.9 912.6,545.2 930,466.3"
          ></polygon>
        </g>
      </svg>
    </router-link>
    <div class="nav">
      <router-link to="/" class="nav-home"></router-link>
      <router-link to="/about" class="nav-about"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
  data: function() {
    return {
      isActive: false
    };
  },
  methods: {
    makeActive: function() {
      this.isActive = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.logo {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  @media only screen and (min-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    margin: 3em;
  }
}
.nav {
  position: absolute;
  top: 25px;
  right: 20px;
  height: 40px;
  width: 110px;
  @media only screen and (min-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 3em;
    left: calc(3em + 25px);
    margin: 0;
    width: 50px;
    height: 140px;
  }
  a {
    display: inline-block;
    width: 40px;
    margin-left: 15px;
    height: 40px;
    background-size: 40px;
    background-position: center;
    opacity: 0.5;
    transition: opacity 0.25s ease-in-out, background 0.25s ease-in-out,
      box-shadow 0.25s ease-in-out;
    border-radius: 50%;
    @media only screen and (min-width: 768px) {
      display: block;
      width: 50px;
      height: 50px;
      background-size: 50px;
      margin-left: auto;
      margin-top: 20px;
    }
    &:hover {
      opacity: 1;
    }
    &.router-link-exact-active {
      opacity: 1;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    }
  }
}
.nav-home {
  background-image: url("../assets/home.svg");
}
.nav-about {
  background-image: url("../assets/about.svg");
}
</style>
