<template>
  <div class="box">
    <!--占位-->
    <div class="placeholder"></div>
    <!--轮播图-->
    <van-swipe :autoplay="3000" class="slideshow">
      <van-swipe-item v-for="item in slices" :key="item.goodsId" @click="handle(item)">
        <img v-lazy="item.image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "vant";

Vue.use(Lazyload);
export default {
  name: "",
  props: {
    slices: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    handle(item) {
      this.$router.push({
        name: "particular",
        query: {
          id: JSON.stringify(item.goodsId),
        },
      });
      this.$save('browerHistory', item)
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.placeholder {
  height: 42px;
  width: 375px;
}
.slideshow {
  width: 100%;
  height: 167px;
  img {
    width: 375px;
  }
}
</style>
