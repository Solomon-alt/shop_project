<template>
  <div class="box">
   <img :src="ad.PICTURE_ADDRESS">
  </div>
</template>

<script>
export default {
  name: '',
  props:{
      ad:{
        type:Object
      }
  },
  data () {
    return {
    }
  },
  components: {},
  methods: {},
  mounted() {
  },
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.box{
    height: 60px;
    background: #eee;
    img{
        width: 100%;
       margin-top: 10px;
    }
}
</style>