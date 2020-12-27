<template>
  <div>
    <div class="back" @click="back">
      <van-icon name="arrow-left" size="30" color="#DADADA" />
    </div>
    <van-swipe style="width:100%;" :loop="true" :autoplay="3000">
        <van-swipe-item><img :src="data.image_path" /></van-swipe-item>
        <van-swipe-item><img :src="data.image" /></van-swipe-item>
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
    data: {
      type: Object,
    },
  },
  data() {
    return {
      images: [],
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
  mounted() {
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.back {
  width: 40px;
  height: 40px;
  margin: 10px 0 15px 10px;
  border-radius: 50%;
  background: #7f7f7f;
  text-align: center;
  line-height: 60px;
}
img {
  display: block;
  margin: auto;
  width: 100%;
}
</style>
