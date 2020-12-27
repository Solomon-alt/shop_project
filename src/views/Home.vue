<template>
  <div>
    <!--顶部搜索框-->
    <search></search>
    <!-- 轮播图 -->
    <slideshow :slices="slices" v-if="slices.length>0"></slideshow>
    <!-- 类别栏 -->
    <category :category="category" v-if="category.length>0"></category>
    <!-- 广告框 -->
    <ad :ad="ad" v-if="ad"></ad>
    <!-- 推荐 -->
    <recommend :recommend="recommend" v-if="recommend.length>0"></recommend>
    <!--楼层图-->
    <floor :name="name1" :floor="floor1" v-if="floor1.length>0"></floor>
    <floor :name="name2" :floor="floor2" v-if="floor2.length>0"></floor>
    <floor :name="name3" :floor="floor3" v-if="floor3.length>0"></floor>
    <!--商品热销-->
    <hot :hotGoods="hotGoods" v-if="hotGoods.length>0"></hot>
  </div>
</template>

<script>
import search from '../components/home/Search'
import slideshow from '../components/home/Slide'
import category from '../components/home/Category'
import ad from '../components/home/Ad'
import recommend from '../components/home/Recommend'
import floor from '../components/home/Floor'
import hot from '../components/home/HotGoods'
export default {
  name: '',
  props:{},
  data () {
    return {
      slices:'',
      category:'',
      ad:'',
      recommend:'',
      name1:'',
      name2:'',
      name3:'',
      floor1:'',
      floor2:'',
      floor3:'',
      hotGoods:''
    }
  },
  components: {search,slideshow,category,ad,recommend,floor,hot},
  methods: {},
  mounted() {
    this.$api.home().then(res=>{
      this.slices=res.data.slides;
      this.category = res.data.category
      this.ad = res.data.advertesPicture
      this.recommend = res.data.recommend
      this.floor1 = res.data.floor1
      this.floor2 = res.data.floor2
      this.floor3 = res.data.floor3
      this. name1 = `1f ${res.data.floorName.floor1}`
      this. name2 = `2f ${res.data.floorName.floor2}`
      this. name3 = `3f ${res.data.floorName.floor3}`
      this.hotGoods = res.data.hotGoods
    }).catch(err=>{
      console.log(err);
    })
  },
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>

</style>