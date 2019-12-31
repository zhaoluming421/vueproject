<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" class="title_item"
             :class="{active: currentIndex === index}"
             @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NarBar'
  export default {
    components: {
      NavBar
    },
    props: {},
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      };
    },
    watch: {},
    computed: {},
    methods: {
      titleClick(index) {
        this.currentIndex = index;
      },
      backClick() {
        this.$router.back();
      }
    },
    created() {},
    mounted() {}
  };
</script>
<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }
  .title_item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text)
  }
  .back {
    margin-top: 6px;
    padding-left: 10px;
  }
</style>