<template>
  <b-carousel
    id="carousel-1"
    v-model="slide"
    :interval="4000"
    controls
    indicators
    background="#ababab"
    img-width="1024"
    img-height="380"
    style="text-shadow: 1px 1px 2px #333;"
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
  >

    <b-carousel-slide v-for="(image, index) in imgArray" :key="index">
      <template v-slot:img>
        <img
          class="d-block img-fluid w-100"
          width="1024"
          height="380"
          :src='image'
          alt="image slot" style="height:380px;"
        >
      </template>
    </b-carousel-slide>

  </b-carousel>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      slide: 0,
      sliding: null,
      imgArray: [
        require('@/assets/images/banner01.jpg'),
        require('@/assets/images/banner02.jpg'),
        require('@/assets/images/banner03.jpg'),
        require('@/assets/images/banner04.jpg')
      ]
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  }
}
</script>

<style scoped>
</style>