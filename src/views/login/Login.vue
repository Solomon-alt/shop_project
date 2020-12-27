<template>
<div class="background">
    <div class="container">
        <div class="top">登录/注册</div>
        <van-form>
            <van-field v-model.trim="username" name="用户名" placeholder="USERNAME" :rules="[{ required: true, message: '请填写用户名' }]" class="ipt" />
            <van-field v-model.trim="password" type="password" name="密码" placeholder="PASSWORD" :rules="[{ required: true, message: '请填写密码' }]" class="ipt" />
            <div>
                <van-field v-model.trim="middleVerify" label="短信验证码" name="短信验证码" placeholder="短信验证码" class="ipt1" />
            </div>
            <div>
                <van-field v-model.trim="verify" label="验证码" name="验证码" placeholder="请输入验证码" :rules="[{ required: true, message: '请填写验证码' }]" class="ipt2" />
                <div class="verify" v-html="yanzhengma" @click="handle1"></div>
            </div>
        </van-form>
        <van-button type="primary" :disabled="flag" class="btn" @click="handle">{{msg}}</van-button>
        <van-button type="primary" class="butt" @click="handle3">登录</van-button>
        <van-button type="warning" class="butt" @click="handle2">注册</van-button>
    </div>
</div>
</template>

<script>
import Vue from "vue";
import {
    Toast
} from "vant";
import {
    setInterval,
    clearInterval
} from 'timers';
export default {
    name: "",
    props: {},
    data() {
        return {
            username: "",
            password: "",
            middleVerify: "",
            verify: "",
            msg: "发送验证码",
            yanzhengma: "",
            flag: false
        };
    },
    components: {},
    methods: {
        handle() {
            this.flag = true
            this.msg = 60
            this.timer = setInterval(() => {
                this.msg--
                if (this.msg === 0) {
                    this.flag = false
                    clearInterval(this.msg)
                    this.msg = "发送验证码"
                }
            }, 1000)
        },
        handle1() {
            this.$api
                .verify()
                .then((res) => {
                    this.yanzhengma = res;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handle2() {
            this.$api
                .register({
                    nickname: this.username,
                    password: this.password,
                    verify: this.verify,
                })
                .then((res) => {
                    if (res.code === -1) {
                        Toast.fail("用户名已存在");
                    } else if (res.code === -2) {
                        Toast.fail("验证码错误");
                    } else {
                        Toast.success("注册成功");
                        localStorage.setItem("username", JSON.stringify({
                            username: this.username
                        }));
                        this.$router.push("/");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handle3() {
            this.$api
                .login({
                    nickname: this.username,
                    password: this.password,
                    verify: this.verify,
                })
                .then((res) => {
                    if (res.code === -1) {
                        Toast.fail("密码错误");
                    } else if (res.code === -2) {
                        Toast.fail("验证码错误");
                    } else {
                        Toast.success("登录成功");
                        localStorage.setItem("username", JSON.stringify({
                            username: this.username
                        }));
                        this.$router.push("/");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    mounted() {
        this.handle1();
    },
    computed: {},
    watch: {},
};
</script>

<style lang="scss" scoped>
.background {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: url(../../assets/login.jpg);
    background-size: contain;

    .container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 95%;

        background: rgba($color: #fff, $alpha: 0.7);

        .top {
            font-size: 20px;
            margin: 5px 0 5px 10px;
        }

        .ipt {
            height: 60px;
        }

        div {
            display: flex;

            .ipt1 {
                height: 40px;
                width: 60%;
            }

            .ipt2 {
                height: 60px;
                width: 60%;
            }

            .verify {
                margin: 10px 0 0 25px;
            }
        }
    }
}

.btn {
    position: absolute;
    top: 160px;
    left: 235px;
    height: 40px;
    width: 110px;
}

.butt {
    margin: 20px 0 30px 20px;
}
</style>
