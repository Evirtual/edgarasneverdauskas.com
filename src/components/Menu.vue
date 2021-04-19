<template>
  <div>
    <router-link to="/" class="logo">
      <img alt="vorn logo" src="../assets/beat.svg" />
    </router-link>
    <div class="nav">
      <router-link to="/" class="nav-home"></router-link>
      <router-link to="/plants" class="nav-plants"></router-link>
      <router-link to="/forest" class="nav-forest"></router-link>
      <router-link to="/beach" class="nav-beach"></router-link>
      <router-link to="/about" class="nav-about"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
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
  width: 70px;
  height: 40px;
  margin: 20px;
  @media only screen and (min-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 125px;
    height: 125px;
    margin: 3em 2em;
  }
}
.nav {
  position: absolute;
  top: 25px;
  right: 20px;
  height: 35px;
  @media only screen and (min-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 2em;
    left: 3em;
    margin: 0;
    width: 90px;
    height: auto;
  }
  @media only screen and (min-width: 1024px) {
    bottom: 4em;
    left: 4rem;
    width: 50px;
  }
  a {
    display: inline-block;
    width: 35px;
    margin-left: 15px;
    height: 35px;
    background-size: 20px;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.5;
    border: 1px solid white;
    transition: opacity 0.25s ease-in-out, background 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
    border-radius: 50%;
    @media only screen and (min-width: 768px) {
      margin: 5px;
    }
    @media only screen and (min-width: 1024px) {
      display: block;
      width: 55px;
      height: 55px;
      background-size: 32px;
      margin-left: auto;
      margin-top: 20px;
    }
    &:hover {
      opacity: 1;
    }
    &.router-link-exact-active {
      opacity: 1;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    }
  }
}
.nav-home {
  background-position: 5px center !important;
  background-image: url("../assets/picture.svg");
  @media only screen and (min-width: 1024px) {
    background-position: 9px center !important;
  }
}
.nav-plants {
  background-image: url("../assets/plant.svg");
}
.nav-forest {
  background-image: url("../assets/tree.svg");
}
.nav-beach {
  background-image: url("../assets/nautilus.svg");
}
.nav-about {
  background-image: url("../assets/man.svg");
}
</style>
