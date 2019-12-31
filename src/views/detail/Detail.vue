<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'
  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll
    },
    props: {},
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
      };
    },
    watch: {},
    computed: {},
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    },
    created() {
      //1. 保存传入的id
      this.iid = this.$route.params.iid

      //2. 根据id请求数据
      getDetail(this.iid).then(res => {
        const data = res.result
        //获取轮播图数据
        this.topImages = data.itemInfo.topImages

        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //获取店铺信息
        this.shop = new Shop(data.shopInfo)

        //获取商品的详情数据
        this.detailInfo = data.detailInfo

        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //打印获取数据
        console.log(res)
      })
    },
    mounted() {}
  };
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>