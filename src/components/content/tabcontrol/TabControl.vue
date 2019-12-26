<template>
  <div class="tab_control">
    <div class="tab_control_item" v-for="(item, index) in titles" :key="index"
          :class="{active: index === currentIndex}"
          @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      };
    },
    watch: {},
    computed: {},
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index);
      }
    },
    created() {},
    mounted() {}
  };
</script>
<style scoped>
  .tab_control {
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
    height: 40px;
    line-height: 40px;
  }
  .tab_control_item {
    flex: 1;
  }
  .tab_control span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>