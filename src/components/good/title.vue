<template>
    <div class="common">
        <div class="headTitle">
            <div class="headLeft" @click="showTab=!showTab">
                <p>{{headLeft.list[indexPos].text}}</p>
                <img  class="headLeftImg"
                      src="../../assets/image/icon_down.png" alt=""
                      :style="{transform:'rotate('+ (showTab ?'-':'+') + '90deg)'}"
                >
            </div>

            <div class="headCenter">
                <p style="font-size: 0.30rem">{{headCenter.text}}</p>
            </div>

            <div class="headRight">
                <img class="rightImg" src="../../assets/image/search.png" alt=""  @click="goTo('search')">
                <img class="shaixuan" src="../../assets/image/saixuan.png" alt="">
            </div>
        </div>


        <!--更多显示列表-->
        <div :class="{floatBox:1 , styleHeight:showTab}">
            <div class="top">
            </div>
            <div class="mid">
                <div v-for="(item, index) in headLeft.list"
                     :class="{tabList:1, borderBottom: (index < headLeft.list-1) }"
                     @click="indexPos = index; showTab=false"
                >
                    <p class="tab-list-word">{{item.text}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		props:{

        },
		name: 'commonTitle',
		data() {
			return {
				showTab:false, //是否显示下拉列表
                indexPos:0,
				headLeft   :{text:'返回', type:'word', func:null, list:[
                    {text:'男生', func:null, funcParams:{},},
                    {text:'女生', func:null, funcParams:{},},
                ],},
				headCenter :{text:'精选', type:'word', func:null},
				headRight  :{text:'确定', type:'word', func:null, funcParams:{}, opt:1},
            }
		},
        components: {

        },
        computed: {

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

<style scoped>
    p {
        font-size: 0.28rem;
        color:#fff;
    }

    .common .headTitle {
        background-color: #d43c33;
        width: 6.7rem;
        height: 44px;
        padding-left: 0.4rem;
        padding-right: 0.4rem;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .common .headLeftImg {
        width: 15px;
        height: 15px;
        margin-left: 0.1rem;

        transition: transform 0.1s;
        -moz-transition: transform 0.1s; /* Firefox 4 */
        -webkit-transition: transform 0.1s; /* Safari 和 Chrome */
        -o-transition: transform 0.1s; /* Opera */
    }

    .common .headLeft {
        width: 80px;
        display: -webkit-flex;
        display: flex;
        align-items: center;
    }

    .common .headCenter {
        width: 50vw;
        flex-grow: 1;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .common .headCenter .headCenterSmall {
        font-size: 0.24rem;
        color:#fff;
        transform: scale(0.8);
        line-height: 1;
    }

    .common .headRight {
        width: 80px;
        flex-grow: 0;
        font-size: 0;
        text-align: right;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }

    .common .rightImg {
        width: 35px;
        height: 35px;
    }

    .common .shaixuan {
        padding-left: 10px;
        width: 25px;
        height: 25px;
    }

    .floatBox {
        width: 2rem;
        height: 0;
        float: left;
        margin-left: 0.15rem;
        overflow: hidden;
        -webkit-transition: height 0.3s ease-out;
        -moz-transition: height 0.3s ease-out;
        -o-transition: height 0.3s ease-out;
        transition: height 0.3s ease-out;
    }

    .floatBox .top {
        width: 0;
        height: 0;
        border-width: 0 0.15rem 0.2rem;
        border-color: transparent transparent #4a4a4a;
        border-style: solid;
        margin-left: 0.2rem;
        position: relative;
        border-radius: 0.05rem;
    }

    .floatBox .mid {
        background-color: #4a4a4a;
        width: 100%;
        /*height: 5.73rem;*/
        margin-top: -0.02rem;
    }

    .tabList {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 0.8rem;
        margin: 0 0.3rem;

    }

    .borderBottom {
        border-bottom: 0.01rem solid #5a5a5a
    }

    .tab-list-word {
        color: #fff;
        font-size: 0.29rem;
        padding-left: 0.2rem;
    }

    .tab-list-img {
        width: 0.4rem;
        height: 0.4rem;
    }

    .styleHeight {
        height: 6rem;
    }
</style>
