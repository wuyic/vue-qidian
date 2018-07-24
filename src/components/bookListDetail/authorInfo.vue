<template>
    <div class="authorInfo">
        <div>
            <div class="flexBox smallBox">
                <div class="flexBox userInfo" @click="showBox('toastBookListUser')">
                    <img :src="bookListDetail.tips.authorHeadImg" alt="" class="userImg">
                    <p class="userName">{{bookListDetail.tips.authorName}}</p>
                </div>
                <div class="flexBox share">
                    <div class="discuss">
                        <img class="discussImg" src="../../assets/image/icon_comment_red_42x42.png" alt="">
                        <p class="discussNum">{{bookListDetail.info.commentCount}}</p>
                    </div>
                    <img class="shareImg" src="../../assets/image/icon_share_red_42x42.png" alt="">
                </div>
            </div>
        </div>
        <div>
            <Toast :type="'toastBox'" :position="'bottom'" :toastName="'toastBookListUser'" ref="toastBookListUser">
                <div class="bigBox">
                    <img class="userImg" :src="bookListDetail.tips.authorHeadImg" alt="">
                    <div class="flexBox body">
                        <div class="userName">
                            <p>{{bookListDetail.tips.authorName}}</p>
                        </div>
                        <div class="desc">
                            <p>{{bookListDetail.tips.ownerDes}}</p>
                        </div>
                        <div class="giveFlower"
                             v-if="!bookListDetail.info.isSelfCreate"
                             @click="showBox('toastSendFlower')"
                        >
                            <p>献花</p>
                        </div>
                        <div class="giveFlowerNum" v-if="bookListDetail.tips.tipTimes>0">
                            {{bookListDetail.tips.tipTimes}}人献花
                        </div>
                        <div class="flexBox giveFlowerPerson" v-if="bookListDetail.tips.voteHistoryList.length>0">
                            <div v-for="item in bookListDetail.tips.voteHistoryList">
                                <img :src="item.userImg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </Toast>
        </div>

        <div>
            <Toast :type="'toastBox'" :toastName="'toastSendFlower'" :position="'bottom'" ref="toastSendFlower">
                <div class="giveFlower">
                   <div class="flexBox header">
                       <div>
                           <img  class="userImg" :src="bookListDetail.tips.authorHeadImg" alt="">
                       </div>
                       <div class="right">
                           <p class="userName">献花给 {{bookListDetail.tips.authorName}}</p>
                           <p class="qdText">{{bookListDetail.tips.qdText}}</p>
                       </div>
                   </div>

                    <div class="flexBox body">
                        <div class="flexBox cellBox"
                             v-for="(item, index) in bookListDetail.tips.gearList"
                             v-if="index < 3"
                             :style="{border:getColor(item.selected, true)}"
                             @click="changeTipsGearList({index:index})"
                        >
                            <div class="flexBox">
                                <img class="flowerImg" src="../../assets/image/icon_flower_32x30.png" alt="">
                                <p :style="{fontSize:'0.34rem', color:getColor(item.selected)}">×{{item.text}}</p>
                            </div>
                            <p :style="{fontSize:'0.2rem', color:getColor(item.selected), paddingTop:'0.05rem'}">{{item.price+item.unit}}</p>
                        </div>
                    </div>

                    <div class="footer">
                        <div class="remain">
                            <p>余额: <span style="color: #444">0</span></p>
                        </div>
                        <div>
                            <div class="flexBox tip">
                                <div class="lineMid"></div>
                                <p class="lineMidWord">余额不足，立即充值</p>
                                <div class="lineMid"></div>
                            </div>
                            <div class="flexBox bottom">
                                <div class="flexBox cellBox"
                                     v-for="(item, index) in payConfig.channelList[0].amountList"
                                     v-if="index < 3"
                                     :style="{border:'1px solid '+ getColor(item.isSelected)}"
                                >
                                    <p style="font-size:0.30rem; color:#444">¥{{item.amount}}</p>
                                    <p style="font-size:0.22rem; color:#9b9b9b">{{item.ywAmount}}点</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Toast>
        </div>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex';
    import Toast from '../common/plug/Toast.vue'
	export default {
		props:[
			'isShow'
		],
		name: 'anthorInfoInBookListDetail',
		data() {
			return {
				show:true,
            }
		},
        components:{
	        Toast
        },
        computed: {
	        bookListDetail() {
		        return this.$store.state.booklist.bookListDetail;
	        },
            ...mapGetters('pay', [
            	'payConfig'
            ])
        },

		mounted() {

			this.$store.dispatch('pay/getSettingForPay');
		},
		methods: {
            ...mapActions('booklist', [
            	'changeTipsGearList'
            ]),

			showBox(type) {
				this.$refs[type].toastBox({type:type, status:true});
            },

            getColor(index, bg) {
				return bg ? (
					index ? '1px solid #d43c33' : ''
                ) : (
					index ? '#d43c33' : '#444'
				)
            }
        },
	}
</script>

<style scoped>
    .flexBox {
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .smallBox {
        background-color: #fff;
        height: 1.2rem;
        width: 6.94rem;
        justify-content: space-between;
        padding:0 0.28rem;
        box-shadow:  0 -0.05rem 0.1rem #f1f1f1;
    }
    .smallBox .userName {
        color:#333;
        font-size: 0.28rem;
        padding-left: 0.15rem;
    }
    .discuss {
        position: relative;
        width: 0.75rem;
        height: 0.75rem;
        margin-right: 0.45rem;
    }
    .discuss .discussImg {
        width: 0.75rem;
        height: 0.75rem;

    }
    .discuss .discussNum {
        top:0;
        left:0.55rem;
        font-size: 0.24rem;
        transform: scale(0.8);
        color:#d43c33;
        position: absolute;
    }
    .userImg {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 0.375rem;
    }
    .shareImg {
        width: 0.75rem;
        height: 0.75rem;
    }
    .bigBox {
        width: 7.5rem;
        background-color: #fff;
        position: relative;
    }
    .bigBox .userImg {
        width: 1.14rem;
        height: 1.14rem;
        border-radius: 0.5925rem;
        border: 0.05rem solid #fff;
        position: absolute;
        top:-0.62rem;
        left:3.13rem;
    }
    .bigBox .body{
        flex-direction: column;
        justify-content: flex-start;

        margin-top: 0.62rem;
        padding-top: 0.62rem;
    }
    .bigBox .userName {
        height: 0.6rem;
        line-height: 0.6rem;
        color: #333;
    }
    .bigBox .desc {
        font-size: 0.24rem;
        height: 0.5rem;
        line-height: 0.5rem;
        color:#9b9b9b;
    }
    .bigBox .giveFlower {
        color: #fff;
        width: 1.83rem;
        height: 0.66rem;
        line-height: 0.66rem;
        margin-top: 0.2rem;
        border-radius: 0.33rem;
        background-color: #d43c33;
    }
    .bigBox .giveFlowerNum {
        margin-top: 0.1rem;
        height: 0.4rem;
        line-height: 0.4rem;
        color:#a0a0a0;
        font-size: 0.22rem;
    }
    .bigBox .giveFlowerPerson {
        margin: 0.1rem 0 0.3rem;

    }
    .bigBox .giveFlowerPerson img {
        width: 0.46rem;
        height: 0.46rem;
        border-radius: 0.23rem;
        padding-right: 0.06rem;
    }
    .giveFlower {
        background-color: #fff;
    }
    .giveFlower .header{
        height: 1.4rem;
        width: 6.94rem;
        padding: 0 0.28rem;
        justify-content: flex-start;

    }
    .giveFlower .header .userImg{
        width: 0.88rem;
        height: 0.88rem;
        border-radius: 0.44rem;
    }
    .giveFlower .header .right{
        padding-left: 0.2rem;
        height:0.88rem;
    }
    .giveFlower .header .userName{
        color:#333;
        font-size: 0.26rem;
        text-align:left;
    }
    .giveFlower .header .qdText{
        padding-top: 0.1rem;
        color:#b5b5b5;
        text-align:left;
        font-size: 0.22rem;
    }

    .giveFlower .body{
        height: 2.05rem;
        width: 7.5rem;
        background-color: #f6f7f9;
        justify-content: space-around;
    }

    .giveFlower .body .cellBox{
        height: 1.3rem;
        width: 1.85rem;
        background-color: #fff;
        flex-direction: column;
    }
    .giveFlower .body .cellBox .flowerImg{
        width: 0.62rem;
        height: 0.6rem;
        padding-right: 0.05rem;
    }


    .giveFlower .footer{
        width: 6.94rem;
        padding: 0 0.28rem;
    }
    .giveFlower .footer .remain{
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: left;
        color:#9b9b9b;

    }
    .giveFlower .footer .tip{

    }
    .giveFlower .footer .tip .lineMidWord{
        color: #9b9bb9;
        padding: 0 0.25rem;
    }

    .giveFlower .footer .bottom {
       padding: 0.3rem 0;
    }

    .giveFlower .footer .bottom .cellBox{
        margin-right: 0.22rem;
        height: 0.85rem;
        width: 1.85rem;
        flex-direction: column;
    }

    .lineMid {
        width: 2rem;
        border-top: 1px solid #d7d7d7;
    }



</style>