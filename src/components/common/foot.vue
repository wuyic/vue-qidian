<template>
    <div class="foot" v-if="titleInfo.isShowFoot">
        <div class="flex-box">
            <div class="flex-squ" @click="goto('/')">
                <div style="font-size: 0">
                    <img v-if="titleInfo.bottom != 1" src="../../assets/image/icon_bookshelf_normal_30x30.png"
                         class="img"/>
                    <img v-if="titleInfo.bottom == 1" src="../../assets/image/icon_bookshelf_30x30.png" class="img"/>
                </div>
                <div :class="{word:1, colorRed:titleInfo.bottom == 1}">书架</div>
            </div>
            <div class="flex-squ" @click="goto('/good')">
                <div style="font-size: 0">
                    <img v-if="titleInfo.bottom != 2" src="../../assets/image/icon_collection_normal_30x30.png"
                         class="img"/>
                    <img v-if="titleInfo.bottom == 2" src="../../assets/image/icon_collection_30x30.png"
                         class="img"/>
                </div>
                <div :class="{word:1, colorRed:titleInfo.bottom == 2}">精选</div>
            </div>
            <div class="flex-squ" @click="goto('/find')">
                <div style="font-size: 0">
                    <img v-if="titleInfo.bottom != 3" src="../../assets/image/icon_discover_normal_30x30.png"
                         class="img"/>
                    <img v-if="titleInfo.bottom == 3" src="../../assets/image/icon_discover_30x30.png" class="img"/>
                </div>
                <div :class="{word:1, colorRed:titleInfo.bottom == 3}">发现</div>
            </div>
            <div class="flex-squ" @click="goto('/mine')">
                <div style="font-size: 0">
                    <img v-if="titleInfo.bottom != 4" src="../../assets/image/icon_account_normal_30x30.png"
                         class="img"/>
                    <img v-if="titleInfo.bottom == 4" src="../../assets/image/icon_account_30x30.png" class="img"/>
                </div>
                <div :class="{word:1, colorRed:titleInfo.bottom == 4}">我</div>
            </div>
        </div>
    </div>
</template>

<script>

	export default {
		name: 'index',
		data() {
			return {
				titleInfo: {}
			}
		},
		watch: {
			'$route'(to, from) {
				this.getData();
			}
		},
		mounted() {
			this.getData();
		},
		methods: {

			getData: function () {
				this.titleInfo = this.getTitle;
			},

			goto: function (path) {
				this.$router.push({path});
			},
		},
	}
</script>

<style >
    /*@import "../assets/css/detailMaxdeal.css";*/
    .foot {
        z-index: 1000;
        position: fixed;
        left: 0;
        bottom: 0;
        border-top: 1px solid #eee;
    }

    .foot .flex-box {
        width: 100vw;
        height: 50px;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .foot .flex-squ {
        align-items: center;
        height: 45px;
    }

    .foot .img {
        width: 35px;
        height: 35px;
    }

    .foot .word {
        height: 13px;
        line-height: 13px;
        font-size: 12px;
        color: #666;
        transform: scale(0.8);
    }

    .foot .colorRed {
        color: #ee7160;
    }
</style>
