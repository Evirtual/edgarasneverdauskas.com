<template>
  <div class="projects">
    <a class="project" v-for="project in projects" :key="project.id" :href="`${project.url}`" target="_blank" rel="noopener noreferrer">
      <div :style="{'background-image': `url(${project.url})`}">
        <h3>{{ project.name }}</h3>
        <h4>{{ project.description }}</h4>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      projects: [
        {
          url: "https://live.staticflickr.com/65535/51123492503_5c8da651ed_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51123333304_10c0db6da6_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51123585916_a8b39c341f_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51123608571_c762e24126_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51123042522_7d9ce2aae4_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51123042812_334774f073_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51124416505_869ecfd5bd_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51123522293_c85bdbf207_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51124425030_6d0e5184e1_h.jpg",
          name: "",
          description: ""
        },
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.projects {
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    margin-top: 2.66rem;
  }
}
.project {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: 20px;
  display: block;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.9);
  color: black;
  border: 3px solid white;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.25s ease-in-out, border 0.25s ease-in-out;
  @media only screen and (min-width: 768px) {
    width: 47%;
    padding-bottom: 47%;
    margin-bottom: 3%;
    margin-right: 1.5%;
    margin-left: 1.5%;
  }
  @media only screen and (min-width: 1024px) {
    width: 31.33%;
    padding-bottom: 31.33%;
    margin-bottom: 2%;
    margin-right: 1%;
    margin-left: 1%;
  }
  &:hover {
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.4);
  }
  div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  h3,
  h4 {
    margin: 0.5rem 0;
  }
  h3 {
    font-weight: bold;
  }
  h4 {
    font-size: 0.9em;
  }
  span.project-link {
    display: block;
    text-transform: uppercase;
    font-size: 0.7rem;
    letter-spacing: 1px;
    padding: 10px;
    font-weight: 400;
    border: 1px solid #ddd;
    margin-top: 1rem;
    transition: background 0.25s ease-in-out;
    &:hover {
      background: white;
    }
  }
}
</style>
