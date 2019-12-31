<template>
  <swiper class="detail_swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
      };
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {}
  };
</script>
<style scoped>
  .detail_swiper {
    height: 300px;
    overflow: hidden;
  }
</style>