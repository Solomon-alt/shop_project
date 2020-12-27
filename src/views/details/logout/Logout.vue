<template>
<div class="box">
    <van-nav-bar title="退出登录" left-arrow @click-left="onClickLeft" border />
    <div class="btn"><van-button @click="tuichu" type="info">退出登录</van-button></div>
</div>
</template>

<script>
export default {
    name: '',
    props: {},
    data() {
        return {}
    },
    components: {},
    methods: {
        onClickLeft() {
           this.$router.push('/my')
        },
        tuichu(){
           this.$api.loginOut().then(res=>{
             console.log(res);
           }).catch(err=>{
             console.log(err);
           })
        }
    },
    mounted() {},
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
.box{
  position: relative;
  background: url(../../../assets/login.jpg);
  width: 100vw;
  height: 100vh;
  .btn{
   position: absolute;
   top: 350px;
   left: 50%;
   transform: translateX(-50%)
}
}

</style>
