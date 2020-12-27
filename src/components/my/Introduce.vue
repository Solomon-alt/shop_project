<template>
<div>
    <div class="box">
        <van-icon name="setting" color="#eee" size="25" class="icon" @click="goto('/personal')" />
        <div class="img">
            <img src="../../assets/1.png" width="70px">
        </div>
        <div class="wel" @click="handle1('/login')">{{welcome}}</div>
        <div class="exit" @click="go()" v-if="flag===0">退出登录</div>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import {
    Toast
} from 'vant';

Vue.use(Toast);
export default {
    name: '',
    props: {},
    data() {
        return {
            welcome: '',
            flag: 1
        }
    },
    components: {},
    methods: {
        getName() {
            let username = localStorage.getItem('username')
            let uname = JSON.parse(localStorage.getItem('username'))
            if (username) {
                this.welcome = `欢迎您:${uname.username}`
                this.flag = 0
            } else {
                this.welcome = `登录/注册`
            }
        },
        handle1(path) {
            this.$router.push(path)
        },

        goto(path) {
            let username = localStorage.getItem('username')
            let uname = JSON.parse(localStorage.getItem('username'))
            if (username) {
                this.$router.push(path)
            } else {
                Toast('请登录');
                this.$router.push('/login')
            }
        },
        go() {
            this.$api.loginOut().then(res => {
                console.log(res);
                if (res.code === 0) {
                    localStorage.clear()
                    this.flag = 1
                    Toast.success('退出成功');
                     this.$store.commit('modify', 0)
                } else {
                    Toast('已经退出，请重新登录');
                }
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.getName()
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
.box {
    position: relative;
    height: 200px;
    background: #E30C7B;

    .icon {
        position: absolute;
        top: 5px;
        right: 5px;
    }

    .img {
        position: absolute;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        width: 70px;
        border-radius: 50%;
        overflow: hidden;
    }

    .wel {
        position: absolute;
        top: 120px;
        left: 50%;
        transform: translateX(-50%);
        color: #eee;
    }

    .exit {
        position: absolute;
        top: 150px;
        left: 50%;
        transform: translateX(-50%);
        color: #eee;
    }
}
</style>
