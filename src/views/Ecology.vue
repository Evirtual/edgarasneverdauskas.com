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
          url: "https://live.staticflickr.com/65535/51222928528_009f92b048_h.jpg",
          name: "",
          description: ""
        },
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
          url: "https://live.staticflickr.com/65535/51222644436_c34bbb3a6b_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51223769880_488fb1ad23_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51222913608_0c0be3550f_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51123608571_c762e24126_h.jpg",
          name: "",
          description: ""
        },
        {
          url: "https://live.staticflickr.com/65535/51223509424_02984c7657_h.jpg",
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
