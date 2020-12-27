<template>
  <div>
    <ul>
        <li v-for="(item,index) in arr" :key="index" :class="{'active' :index===0}" @click="handle(item.path)">
            <div>
                <van-icon :name="item.icon"  class="van"/>
                <p>{{item.message}}</p>
            </div>
             <van-icon name="arrow" class="fr"/>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  props:{},
  data () {
    return {
        arr:[{
            icon:"label-o",
            message:'全部订单',
            path:'/orders'
        },{
          icon:"points",
            message:'收藏商品', 
            path:'/collection'
        },{
            icon:"balance-o",
            message:'地址管理',
            path:'/address'
        },{
            icon:"send-gift-o",
            message:'最近浏览',
            path:'/browse'
        }]
    }
  },
  components: {},
  methods: {
      handle(item){
          this.$router.push(item)
      }
  },
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
ul{
   width: 100%;
   li{
       height: 40px;
       border: 1px solid #F8F9F9;
       div{
           display: flex;
           line-height: 40px;
           .van{
               display: block;
               margin: 12px 5px 0 10px;
           }
       }
       .fr{
           position: relative;
           top: -28px;
           margin-right: 10px;
       }
   }
    
}
.active{
    margin-bottom: 20px!important;
}
</style>