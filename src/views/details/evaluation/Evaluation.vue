<template>
<div>
    <van-nav-bar title="评价中心" border :fixed='true' left-arrow @click-left="onClickLeft" />
    <div class="dog">
        <img src="../../../assets/evaluate.jpg" alt="">
    </div>
    <div class="label">
        <div @click="handle" class="fl one" :class="{'active' :num===0}">待评价</div>
        <div @click="handle1" class="fr two" :class="{'active' :num===1}">已评价</div>
    </div>
    <div class="container" v-if="num===0">
        <div class="box" v-for="item in list" :key="item._id">
            <img :src="item.image_path">
            <div class="son">
                <p>{{item.name}}</p>
                <span @click="goto(item)">
                    <van-icon name="chat-o" class="font" />评鉴晒单
                </span>
            </div>
        </div>
    </div>
    <div class="container" v-else>
        <div class="box" v-for="item in arr" :key="item._id">
        <img :src="item.goods[0].image_path">
            <div class="son">
                <p>{{item.goods[0].name}}</p>
                <span @click="view(item)">
                    <van-icon name="chat-o" class="font" />查看评价
                </span>
            </div>
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
            list: '',
            num: 0,
           arr:''
        }
    },
    components: {},
    methods: {
        view(item){
            this.$router.push({
                name:'view',
                query:{
                    view:JSON.stringify(item)
                }
            })
        },
        goto(item){
            this.$router.push({
                name:'evaluating',
                query:{
                    item:JSON.stringify(item)
                }
            })
        },
        handle() {
            this.num = 0
        },
        handle1() {
            this.num = 1
        },
        onClickLeft() {
            this.$router.go(-1)
        },
        getdataOne() {
            this.$api.tobeEvaluated().then(res => {
                this.list = res.data.list
            }).catch(err => {
                console.log(err);
            })
        },
        alreadyEvaluated(){
            this.$api.alreadyEvaluated().then(res=>{               
                this.arr = res.data.list
            }).catch(err=>{
                console.log(err);
            })
        }

    },
    mounted() {
        this.getdataOne()
        this.alreadyEvaluated()
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
.dog {
    position: fixed;
    top: 0;

    img {
        width: 375px;
        margin-top: 50px;
    }
}

.label {
    position: fixed;
    top: 250px;
    left: 37px;
    z-index: 5px;
    width: 300px;
    height: 60px;
    background: #fff;
    border-radius: 10px;
    line-height: 60px;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: .3)
}

.one {
    margin-left: 40px;
    height: 56px;
}

.two {
    margin-right: 40px;
    height: 56px;
}

.active {
    border-bottom: 3px solid #FF4444;
}

.container {
    margin-top: 320px;
    width: 375px;
    height: calc(100vh - 320px);
    overflow: auto;

    .box {
        width: 100%;
        height: 80px;
        display: flex;
        margin-bottom: 10px;
        border-bottom: 1px solid #F7F7F7;


        img {
            display: block;
            height: 80px;
            margin-left: 10px;
        }

        .son {
            width: 250px;
            height: 100%;
            margin-left: 20px;

            p {
                margin-top: 10px;
                width: 200px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            span {
                float: right;
                margin: 15px 12px 0 0;
                border: 1px solid #f00;
                color: #f00;
                padding: 0 5px;
                border-radius: 15px;

                .font {
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>
