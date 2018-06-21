<template>
    <div class="title">
        <div class="flexbox">
            <div class="left">
                <img class="searchImage" src="../../assets/image/bookcase_search_icon_22x22.png" alt="">
                <input v-module="keyWord" class="searchText" type="text"  placeholder="输入关键字">
                <img class="searchImage" src="../../assets/image/icon_close_search_20x20.png" alt="">
            </div>
            <div class="right">
                <p class="cancle">取消</p>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'title',
		data() {
			return {
				isSelected: 'shujia',
				showTab: false,
			}
		},
        computed:{
	        keyWord () {
		        return this.$store.state.search.keyWord
	        }
        },
		mounted() {

		},
		methods: {
			goTo: function (name) {
				this.$router.push({name: name})
			},
		},
	}
</script>

<style scoped="">
    .title {

    }

    .title .flexbox {
        background-color: #d43c33;
        width: 7.2rem;
        height: 0.8rem;
        padding-left: 0.15rem;
        padding-right: 0.15rem;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }

    .flexbox .left {
        width: 6.4rem;
        height: 0.6rem;
        background-color: #fff;
        border-radius:0.1rem;
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .flexbox .right {
        width: 0.85rem;
        height: 0.6rem;

    }

    .flexbox .searchImage {
        width: 0.45rem;
        height: 0.45rem;
        padding: 0 0.1rem;
    }

    .flexbox .searchText{
        width: 100%;
        height: 100%;
        border:0;
        font-size: 0.28rem;

    }
    .flexbox .searchText:focus{
        width: 100%;
        height: 100%;
        border:0;
        outline: none;

    }
    .flexbox .cancle{
        font-size: 0.28rem;
        color:#fff;
        line-height: 0.6rem;
        text-align: center;

    }


</style>
