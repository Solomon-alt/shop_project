<template>
  <div>
    <div class="title">热销商品</div>
    <ul>
        <li v-for="item in hotGoods" :key="item.goodsId" @click="handle(item)">
            <img :src="item.image">
            <div>{{item.name}}</div>
            <p>
                <span>￥{{item.mallPrice}}</span>
                <del>￥{{item.price}} </del>
            </p>
        </li>
    </ul>
    <div class="foot"></div>
  </div>
</template>

<script>
export default {
  name: '',
  props:{
      hotGoods:{
          type:Array
      }
  },
  data () {
    return {
    }
  },
  components: {},
  methods: {
      handle(item){
          this.$router.push({
              name:'particular',
              query:{
                 id:JSON.stringify(item.goodsId)
              }
          })
          this.$save('browerHistory', item)
      }
  },
  mounted() {
  },
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.title{
    text-align: center;
    padding: 10px 0;
    background: #F5F5F9;
    color: red;
}
ul{
    display: flex;
    flex-wrap: wrap;
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
    li{
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        width: 186px;
        img{
            display: block;
            width: 100%;
        }
        div{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 10px;
        }
        p{
            text-align: center;
            margin: 10px 0;
            del{
                color: #E0322B;
            }
        }
    }
}
.foot{
    height: 40px;
}
</style>