<template>
  <Gallery v-bind:projects="projects" />
</template>

<script>
import Gallery from "@/components/Gallery.vue";

export default {
  name: "forest",
  components: {
    Gallery
  },
  data() {
    return {
      projects: [
        {
          url: "https://live.staticflickr.com/65535/51222531116_fa878eeeae_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51223286379_97518af857_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51221804027_d6a1bde57b_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51223665555_0d4341a700_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51222792223_447b2d24b5_h.jpg",
          name: "",
          description: ""
        },
         {
          url: "https://live.staticflickr.com/65535/51123042812_334774f073_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51123042522_7d9ce2aae4_h.jpg",
          name: "",
          description: ""
        },
      ]
    };
  }
};
</script>
