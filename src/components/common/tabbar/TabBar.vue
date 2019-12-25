<template>
  <div id="tab_bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
      components: {
      },
      props: {},
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
    #tab_bar {
        display: flex;
        background-color: #f6f6f6;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>