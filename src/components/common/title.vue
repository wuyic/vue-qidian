<template>
    <div class="common">
        <div class="headTitle">
            <div class="headLeft">
                <!--<img class="headLeftImg" src="../../assets/image/close.png" alt="">-->
                <p>{{headLeft.text}}</p>
            </div>

            <div class="headCenter">
                <p style="font-size: 0.30rem">{{headCenter.text}}</p>
            </div>

            <div class="headRight">
                <p :style="{opacity: headRight.opt || 1}">{{headRight.text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		props:{
			headLeft   :{type:Object, default:()=>({text:'返回', type:'word', func:null,})},
			headCenter :{type:Object, default:()=>({text:'标题', type:'word', func:null})},
			headRight  :{type:Object, default:()=>({text:'确定', type:'word', func:null, opt:1})},
        },
		name: 'commonTitle',
		data() {
			return {}
		},
		mounted() {
			console.log(this)
		},
		methods: {},

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
        width: 0.40rem;
        height: 0.40rem;
    }

    .common .headLeft {
        width: 44px;
    }

    .common .headCenter {
        width: 50vw;
        flex-grow: 1;
    }

    .common .headRight {
        width: 44px;
        flex-grow: 0;
    }
</style>
