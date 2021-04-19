<template>
  <Gallery v-bind:projects="projects" />
</template>

<script>
import Gallery from "@/components/Gallery.vue";

export default {
  name: "plants",
  components: {
    Gallery
  },
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
      ]
    };
  }
};
</script>
