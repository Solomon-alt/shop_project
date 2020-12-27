<template>
<div>
    <van-nav-bar title="个人资料" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-cell-group>
        <van-field value="github" readonly />
    </van-cell-group>
    <van-field v-model="text" label="用户名" class="ipt1" placeholder="请输入用户名" />
    <van-cell-group>
        <van-field v-model="value1" label="昵称" placeholder="请输入昵称" />
    </van-cell-group>
    <van-field v-model="gender" label="性别" class="ipt1" />
    <van-cell-group>
        <van-field label="出生年月" v-model="data" readonly @click="handle" />
    </van-cell-group>
    <van-datetime-picker v-model="currentDate" v-if="this.flag===true" type="date" @confirm="confirm" title="出生年月" />
    <van-button type="primary" block @click="save">保存</van-button>
    <van-button type="info" block plain @click="cancel">取消</van-button>
</div>
</template>

<script>
import Vue from "vue";
import {
    DatetimePicker
} from "vant";
import {
    Toast
} from "vant";
import {
    Field
} from "vant";

Vue.use(DatetimePicker);
Vue.use(Field);
export default {
    name: "",
    props: {},
    data() {
        return {
            text: "",
            value: "",
            value1: '',
            gender: "",
            currentDate: new Date(),
            data: '',
            flag: false,
            id: '',
            day:''
        };
    },
    components: {},
    methods: {
        onClickLeft() {
            this.$router.push("/my");
        },
        confirm(value) {
            console.log(value);
            let year = value.getFullYear();
            let mont = value.getMonth() + 1;
            let month = mont < 10 ? '0' + mont : mont;
            let day = value.getDate();
            this.data = year + '年' + month + '月' + day + '日';
            this.flag = false;
            console.log(this.day);
        },
        handle() {
            this.flag = true
        },
        save() {
            console.log(this.day);
            this.$api.saveUser({
                gender: this.gender,
                year: this.data.substring(0, 4),
                month: this.data.substring(5, 7),
                day: this.day,
                id: this.id,
                nickname: this.value1
            }).then(res => {
                if(res.code===200){
                    Toast.success('修改成功');
                }
            }).catch(err => {
                console.log(err);
            })
        },
        cancel() {

        },
    },
    mounted() {
        this.$api
            .queryUser()
            .then((res) => {
                console.log(res.userInfo);
                this.text = res.userInfo.username
                this.value1 = res.userInfo.nickname
                this.gender = res.userInfo.gender
                this.data = `${res.userInfo.year}年${res.userInfo.month}月${res.userInfo.day}日`
                this.id = res.userInfo._id
                this.day = res.userInfo.day
            })
            .catch((err) => {
                console.log(err);
            });
    },
    computed: {},
    watch: {},
};
</script>

<style lang="scss" scoped>
.ipt1 {
    border: 1px solid transparent;
    border-bottom: 1px solid #ccc;
}
</style>
