<template>
    <div class="common">
        <div class="headTitle">
            <div class="headLeft"  @click="getRouter.go(-1)">
                <img class="headLeftImg" src="../../assets/image/QDNavBackButton_36x36_fff.png" alt="">
                <p style="margin-left: -0.1rem;">{{headLeft.text}}</p>
            </div>

            <div class="headCenter">
                <p style="font-size: 0.30rem">{{headCenter.text}}</p>
            </div>

            <div class="headRight">
                <p v-if="headRight.type=='word'" :style="{opacity: headRight.opt || 1}" @click="headRight.func({router:getRouter, toast:getToast})">{{headRight.text}}</p>
                <img v-if="headRight.type=='list'" class="rightImg" src="../../assets/image/more.png" alt="" @click="showTab=!showTab">
                <img v-if="headRight.type=='image'" class="rightImg" style="width: 0.5rem; height: 0.5rem" src="../../assets/image/User_set_refresh_26x26.png" alt="" @click="headRight.func(headRight.funcParams)">
            </div>
        </div>
        <Toast ref="toast" :type="'toast'"></Toast>

        <!--更多显示列表-->
        <div :class="{floatBox:1 , styleHeight:showTab}" v-if="headRight.type=='list'">
            <div class="top">
            </div>
            <div class="mid">
                <div v-for="(item, index) in headRight.list"
                     :class="{tabList:1, borderBottom: (index < headRight.list-1) }"
                     @click="item.func(item.funcParams)"
                >
                    <img class="tab-list-img" :src="item.iconUrl" alt="">
                    <p class="tab-list-word">{{item.name}}</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Toast from './plug/Toast.vue'
	export default {
		props:{
			headLeft   :{type:Object, default:()=>({text:'返回', type:'word', func:null,})},
			headCenter :{type:Object, default:()=>({text:'标题', type:'word', func:null})},
			headRight  :{type:Object, default:()=>({text:'确定', type:'word', list:[], func:null, funcParams:{}, opt:1})},
        },
		name: 'commonTitle',
		data() {
			return {
				showTab:false, //是否显示下拉列表
            }
		},
        components: {
	        Toast
        },
        computed: {
	        getRouter() {
		        return this.$router
	        },
	        getToast() {
	        	return this.$refs.toast.toastText
            }
        },
		mounted() {
//			this.getToast({text:'张三李岁似懂非懂发送到发送地方撒风到发送地方', timeout:500000})
		},
		methods: {

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
        width: 6.96rem;
        height: 0.8rem;
        padding-left: 0.27rem;
        padding-right: 0.27rem;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .common .headLeftImg {
        width: 0.6rem;
        height: 0.60rem;
        margin-left: -0.2rem;
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
    }

    .common .headRight {
        width: 80px;
        flex-grow: 0;
        font-size: 0;
        text-align: right
    }

    .common .rightImg {
        width: 0.7rem;
        height: 0.7rem;
        align-self: flex-end;
    }

    .floatBox {
        width: 3.04rem;
        height: 0;
        float: right;
        margin-right: 0.15rem;
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
        margin-left: 2.6rem;
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
