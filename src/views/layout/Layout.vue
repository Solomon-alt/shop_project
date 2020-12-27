<template>
  <div>
  <!--私有部分-->
    <div>
        <router-view></router-view>
    </div>
    <!--公共部分-->
    <div class="foot">
      <foot></foot>
    </div>
  </div>
</template>

<script>
import foot from '../../components/layout/Foot'
export default {
  name: '',
  props:{},
  data () {
    return {
    }
  },
  components: {foot},
  methods: {},
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.foot{
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>