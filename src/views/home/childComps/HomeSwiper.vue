<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
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
      banners: {
        tyep: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      };
    },
    watch: {},
    computed: {},
    methods: {
      imageLoad() {
        if(!this.isLoad) {
          this.$emit("swiperLoad");
        }
        this.isLoad = true;
      }
    },
    created() {},
    mounted() {}
  };
</script>
<style scoped>
</style>