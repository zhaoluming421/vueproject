<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    components: {
      BScroll
    },
    props: {
      probeType: {
        type: Number,
        default() {
          return 0
        }
      },
      pullUpLoad: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        scroll: null
      };
    },
    watch: {},
    computed: {},
    methods: {
      scrollTo(x, y, time) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    },
    created() {},
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //监听滚动位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position);
      })

      //监听下拉事件
      this.scroll.on("pullingUp", () => {
        this.$emit('pullingUp')
      })
    }
  };
</script>
<style scoped>
</style>