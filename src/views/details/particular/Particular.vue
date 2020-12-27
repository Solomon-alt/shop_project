<template>
<div>
    <pic :data="data" v-if="data"></pic>
    <labeler :data="data" v-if="data"></labeler>
    <goods :data="data" :comment="comments" v-if="data&&comments.length>0" ></goods>
    <navigation :id="id" :data="data" v-if="data">navigation</navigation>
</div>
</template>

<script>
import pic from "../../../components/particular/Pic";
import labeler from "../../../components/particular/Label";
import goods from "../../../components/particular/Goods";
import navigation from "../../../components/particular/Navigation";
export default {
    name: "",
    props: {},
    data() {
        return {
            data: "",
            id: '',
            comments:'',
        };
    },
    components: {
        pic,
        labeler,
        goods,
        navigation
    },
    methods: {},
    mounted() {
        let id = JSON.parse(this.$route.query.id);
        this.id = id
        this.$api
            .GoodsAction(id)
            .then((res) => {
                this.data = res.goods.goodsOne;
                this.comments = res.goods.comment
            })
            .catch((err) => {
                console.log(err);
            });
    },
    computed: {},
    watch: {},
};
</script>

<style lang="scss" scoped></style>
