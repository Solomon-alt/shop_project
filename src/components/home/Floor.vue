<template>
  <div>
    <div class="name">{{name}}</div>
    <ul>
        <li class="first">
            <img :src="floor[0].image" width="186px" height="201px" @click="handle(floor[0])">
        </li>
        <li class="second">
            <img :src="floor[1].image"  width="186px" height="100px" @click="handle(floor[1])">
        </li>
        <li class="third">
            <img :src="floor[2].image"  width="186px" height="100px" @click="handle(floor[2])">
        </li>
        <li class="fourth">
            <img :src="floor[3].image"  width="186px" height="100px" @click="handle(floor[3])">
        </li>
        <li class="fifth">
            <img :src="floor[4].image"  width="186px" height="100px" @click="handle(floor[4])">
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  props:{
     floor:{
         type:Array
     },
     name:{
         type:String
     }
  },
  data () {
    return {
    }
  },
  components: {},
  methods: {
      handle(floorindex){
          this.$router.push({
              name:'particular',
              query:{
                  id:JSON.stringify(floorindex.goodsId)
              }
          })
          this.$save('browerHistory', floorindex)
      }
  },
  mounted() {
  },
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.name{
    text-align: center;
    color: red;
    padding: 10px 0;
    background: #eee;
}
ul{
    position: relative;
    border-left: 1px solid #F5F5F5;
    border-top: 1px solid #F5F5F5;
     li{
         width: 186px;
         height: 100px;
        border-right: 1px solid #F5F5F5;
        border-bottom: 1px solid #F5F5F5; 
     }
     .first{
         width: 186px;
         height: 201px;
     }
    .second{
        position: absolute;
        top: 0;
        right: 0;
    }  
    .third{
        position: absolute;
        top: 101px;
        right: 0;
    }  
    .fifth{
        position: absolute;
        top: 202px;
        right: 0;
    }  
}
</style>