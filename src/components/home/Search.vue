<template>
<div>
    <div class="box">
        <!--高德地图定位-->
        <span @click="add" class="left">{{ cityName }}
            <van-icon name="arrow-down" /></span>
        <!--中间搜索框-->
        <div class="center">
            <van-search v-model="value" placeholder="请输入搜索关键词" class="ipt" />
            <div class="son">
                <div v-for="item in fruit" :key="item.id" class="fruit" @click="goto(item)">
                    <img :src="item.image">
                    <!-- 关键词高亮 -->
                    <div v-html="item.name.replace(value,`<span style='color:red'>${value}</span>`)"></div>
                </div>
                <div class="footer"></div>
            </div>
        </div>
        <!--右侧搜索-->
        <div class="right">搜索</div>
    </div>
    <!--设置地址-->
    <div>
        <!--让弹框从左侧出来大小为100%-->
        <van-popup v-model="show" position="left" :style="{ height: '100%', width: '100% ' }">
            <!-- 顶部列表返回-->
            <div class="top">
                <!--返回-->
                <div @click="back" class="icon">
                    <van-icon name="arrow-left" />
                </div>
                <!--中间列表-->
                <div class="list">城市列表</div>
            </div>
            <!--搜索城市框-->
            <div class="keyword">
                <van-search v-model="value1" placeholder="请输入城市关键字" @input="search" />
            </div>
            <!--当前城市-->
            <div class="current">
                <div class="word">当前城市</div>
                <div class="down">
                    <span>
                        {{ cityName }}
                    </span>
                </div>
            </div>
            <div class="hot">
                <div class="word">热门城市</div>
                <ul>
                    <li v-for="item in hotcity" :key="item.id" @click="handle(item)">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
            <div>
                <!--循环出城市列表-->
                <van-index-bar>
                    <div v-for="(value, key) in citys" :key="key" style="background: #f2f2f2">
                        <van-index-anchor :key="key" :index="key" />
                        <van-cell :key="item.id" :title="item.name" v-for="item in value" @click="handle(item)" />
                    </div>
                </van-index-bar>
            </div>
        </van-popup>
    </div>
</div>
</template>

<script>
import Vue from "vue";
import {
    Popup
} from "vant";

Vue.use(Popup);
// 导入城市和地区
import city from "../../js/city.js";
import area from "../../js/area.js";
export default {
    name: "",
    props: {},
    data() {
        return {
            cityName: "加载中",
            value: "",
            value1: "",
            show: false,
            citys: city.data.cities,
            area,
            hotcity: "",
            fruit: '',
            arr: [],
        };
    },
    components: {},
    methods: {
        // 点击显示地址选择弹框
        add() {
            this.show = true;
        },
        // 点击关闭地址弹框
        back() {
            this.show = false;
        },
        handle(item) {
            this.cityName = item.name;
            this.show = false;
        },
        search() {
            console.log(this.value1.substring(0, 1));
        },
        goto(item) {
            this.$router.push({
                name: 'particular',
                query: {
                    id: JSON.stringify(item.id)
                }
            })
            this.$save('browerHistory', item)
           
        }
    },
    mounted() {
        let uname =JSON.parse( localStorage.getItem('cityName'))
        if(uname===null){
        //获得热门城市
        this.hotcity = city.data.hotCities;
        // 高德地图定位
        let _this = this;
        AMap.plugin("AMap.Geolocation", function () {
            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: "RB",
            });
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, "complete", onComplete);
            AMap.event.addListener(geolocation, "error", onError);

            function onComplete(data) {
                // data是具体的定位信息
                _this.cityName = data.addressComponent.city;
                localStorage.setItem("cityName", JSON.stringify({
                    cityName: _this.cityName
                }));
                let region = JSON.parse(JSON.stringify({
                    cityName: _this.cityName
                }));
                console.log(region);
            }

            function onError(data) {
                // 定位出错
            }
        });
         }else{
             this.cityName = uname.cityName
         }
    },
    computed: {},
    watch: {
        'value': {
            handler(value) {
                this.$api.search({
                    value
                }).then(res => {
                    this.fruit = res.data.list
                    if (value.length === 0) {
                        this.fruit = this.arr
                    }
                }).catch(err => {
                    console.log(err);
                })
                 if(value.length===0){
                   this.show=false
               }
            },
            deep: true
        }
},
};
</script>

<style lang="scss" scoped>
.box {
    position: fixed;
    z-index: 5;
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;

    .left {
        padding-left: 10px;
        display: flex;
        width: 70px;
        background: #eee;

        div {
            width: 50px;
        }

        i {
            line-height: 40px;
        }
    }

    .center {
        position: relative;
        height: 40px;
        flex: 1;

        .ipt {
            height: 40px;
        }
    }

    .right {
        width: 57px;
        text-align: center;
        background: #eee;
    }
}

.top {
    position: relative;
    display: flex;
    height: 40px;
    background: #fff;

    .icon {
        width: 30px;
        height: 30px;
        line-height: 30px;
        margin-left: 10px;
    }

    .list {
        position: absolute;
        left: 50%;
        line-height: 30px;
        transform: translateX(-50%);
    }
}

.van-cell {
    line-height: 25px;
}

.keyword {
    width: 100%;
    height: 60px;
    background: #f2f2f2;
}

.allCity {
    position: fixed;
}

.current {
    background: #f2f2f2;
    overflow: hidden;

    .word {
        margin: 5px 0 5px 10px;
    }

    .down {
        height: 40px;
        background: #fff;
        overflow: hidden;
        padding-top: 10px;

        span {
            height: 30px;
            line-height: 30px;
            margin-left: 20px;
            border: 1px solid #d2d2d2;
            padding: 2px 20px;
        }
    }
}

.hot {
    background: #f2f2f2;
    overflow: hidden;

    .word {
        margin: 5px 0 5px 10px;
    }

    ul {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        background: #fff;

        li {
            border: 1px solid #d2d2d2;
            padding: 2px 30px;
            margin: 5px;
        }
    }
}

.fruit {
    display: flex;
    background: #fff;

    img {
        width: 30px;
        vertical-align: middle;
    }

    div {
        font-size: 12px;
    }
}

.son {
    position: absolute;
    width: 375px;
    top: 40px;
    left: -80px;
}
</style>
