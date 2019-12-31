<template>
  <div id="home">
    <nav-bar class="home_nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <TabControl :titles="['流行', '新品', '精选']" 
                  @tabClick="tabClick"
                  ref="tabControlFixed"
                  class="tab_control"
                  v-show="isFixed"/>

    <scroll class="content" ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperLoad="swiperLoad"/>
      <HomeRecommend :recommends="recommends"/>
      <Feature />
      <TabControl :titles="['流行', '新品', '精选']" 
                  @tabClick="tabClick"
                  ref="tabControl"/>
      <GoodsList :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick()" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import Feature from './childComps/Feature'

  import NavBar from 'components/common/navbar/NarBar'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultiData, getHomeGoods} from 'network/home'
  import {debounce } from 'common/utils.js'

  export default {
    components: {
      HomeSwiper,
      HomeRecommend,
      Feature,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    props: {},
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isFixed: false,
        saveY: 0
      };
    },
    watch: {},
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 事件监听相关方法
      */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControlFixed.currentIndex = index;
        this.$refs.tabControl.currentIndex = index;
      },
      //返回顶部
      backClick() {
        this.$refs.scroll.scrollTo(0,0,500);
      },
      //backTop和tabControl的显隐
      contentScroll(position) {
        //backTop的显隐
        this.isShowBackTop = -(position.y) > 1000
        //tabControl的显隐
        this.isFixed = -(position.y) > this.tabOffsetTop
      },
      //加载更多
      loadMore() {
        this.getGoods(this.currentType)
      },
      //获取轮播图高度
      swiperLoad() {
        //2.获取offset高度
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      },

      /** 
      * 网络请求相关方法
      */
      getMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          //方便重复调用上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    created() {
      //1.请求多个数据
      this.getMultiData()
      //2.请求商品数据
      this.getGoods('pop')
      this.getGoods('new')
      this.getGoods('sell')
    },
    mounted() {
      //1.图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('itemImgLoad', () => {
        refresh()
      })
    }
  };
</script>
<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home_nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab_control {
    position: relative;
    z-index: 9;
  }
</style>