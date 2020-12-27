<template>
<div>
    <van-nav-bar title="最近浏览" :fixed="true" left-arrow @click-left="goto"></van-nav-bar>
    <div class="box">
        <div v-for="(item,index) in data" :key="item.id" class="content">
            <img :src="item.image" alt="">
            <ul class="container">
                <li style="color:#666; font-size:14px;">{{item.name}}</li>
                <li style="color:#f00; font-size:12px;"><span>￥{{item.present_price}}</span><del style="color:#666">￥{{item.orl_price}}</del></li>
                <li style="border: 1px solid #666; width:15px; height:15px; text-align:center; line-height:10px; border-radius: 50%;margin-left:220px;" @click="handle(index)"><van-icon name="cross" /></li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: '',
    props: {},
    data() {
        return {
            data: '',
            name:''
        }
    },
    components: {},
    methods: {
        goto() {
            this.$router.push('/my')
        },
        handle(index){
          this.data.splice(index,1)
           localStorage.setItem(`${this.name}browerHistory`,JSON.stringify(this.data))
        }
    },
    mounted() {
        let uname = JSON.parse(localStorage.getItem('username')).username
        let data = JSON.parse(localStorage.getItem(`${uname}browerHistory`))
        this.name = uname
        let arr = data.filter(item => {
            return item.goodsId
        })
        let arr1 = data.filter(item => {
            return !item.goodsId
        })
        arr.map(item => {
            let id = item.goodsId
            this.$api.GoodsAction(id).then(res => {
                if (res.code === 200) {
                    arr1.push(res.goods.goodsOne)
                }
            })
        })
        this.data = arr1
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
.box {
    width: 100vw;
    margin-top: 47px;
    height: calc(100vh - 45px);
    overflow: auto;

    .content {
        height: 80px;
        border-bottom: 1px solid #f2f2f2;
        margin-bottom: 10px;
        display: flex;

        img {
            height: 70px;
            border: 1px solid #f2f2f2;
            margin: 5px 15px 0 10px;
        }

        .container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 70px;
            width: 250px;
            border: 1px solid #f2f2f2;
            margin-top: 5px;
            
            li{
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
        }
    }
}
</style>
