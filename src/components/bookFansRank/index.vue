<template>
    <div class="fansRank">
        <div class="indexTitle">
            <indexTitle
                    :headLeft="{text:'返回', type:'word'}"
                    :headCenter="{text:'粉丝榜',textSmall:'100万+', type:'word'}"
                    :headRight="{text:'', type:'word'}"
            ></indexTitle>
        </div>
        <div class="indexReco">
            <div class="fourFans">
                <div class="cell"
                     v-for="(item, index) in fourRankTop"
                     v-if="index != 3"
                     @click="!item.isHave && donate(item.type, 'open', )"
                >
                    <img :src="item.img" alt="">
                    <img :src="item.nameImg" alt="">
                    <p :style="{color:item.fontColor}">{{item.name}}</p>
                </div>
            </div>
            <div class="fansList">
                <loading
                 :isLoadMore="true"
                 :onLoadMore="getBookFansList"
                >
                    <div class="list" v-for="(item, index) in bookFansInfo.list">
                        <div class="rankLevel">
                            <img v-if="item.OrderId==1" src="../../assets/image/fanslistno1.png" alt="">
                            <img v-if="item.OrderId==2" src="../../assets/image/fanslistno2.png" alt="">
                            <img v-if="item.OrderId==3" src="../../assets/image/fanslistno3.png" alt="">
                            <p v-if="item.OrderId>3">{{item.OrderId}}</p>
                        </div>
                        <div class="rankInfo">
                            <div class="userImg">
                                <img :src="item.RealImageUrl" alt="">
                                <p>{{item.RankName}}</p>
                            </div>
                            <div>
                                <p>{{item.NickName}}</p>
                            </div>
                           <div>
                               <p>{{formatNum(item.Amount)}}</p>
                           </div>
                        </div>
                    </div>
                </loading>
            </div>
            <div class="mine">
                <div class="image">
                    <img :src="bookFansInfo.mineInBook.HeadImageUrl" alt="">
                    <p>{{bookFansInfo.mineInBook.RankName}}</p>
                </div>
                <div class="info">
                    <p>当前粉丝值{{bookFansInfo.mineInBook.Amount}}
                        <span>{{bookFansInfo.mineInBook.Rank==0?'未上榜':'第'+bookFansInfo.mineInBook.FansRank+'名'}}</span>
                    </p>
                    <p v-html="bookFansInfo.mineInBook.UpgradeDesc"></p>
                </div>
                <div class="rankImg">
                    <img src="../../assets/image/fanslist_cardenter.png" alt="">
                </div>
            </div>
        </div>

        <Toast
          :toastName="'BookFansBecomeMZ'"
          :type="'toastBox'"
          :position="'center'"
          ref="toast"
        >
            <div class="becomeMZ">
                <div class="close" @click="donate('', 'close')">
                    <img src="../../assets/image/icon_closePocket.png" alt="">
                </div>
                <div class="donateName">
                   <p> {{donateInfo.typeName}}</p>
                </div>
                <div class="number" v-if="donateInfo.amount">
                   <p> {{formatNum(donateInfo.amount)}} 点</p>
                </div>
                <div class="tips">
                    <p v-html="whiteSpace(donateInfo.message)"
                       :style="{color: donateInfo.amount ? '#9B9B9B' : '#4A4A4A'}"
                    ></p>
                </div>
                <div class="button" @click="donateBook({bookId:'', money:'', desc:''})">
                    <p>{{donateInfo.amount ? '打赏' : '我知道了'}}</p>
                </div>
            </div>
        </Toast>


    </div>
</template>

<script>
	import {mapGetters, mapActions, mapMutations} from 'vuex'
	import indexTitle from '../common/title.vue';
	import loading from '../common/plug/loading.vue';
	import Toast from '../common/plug/Toast.vue';

	export default {
		name: 'index',
		data() {
			return {

            }
		},

		created() {
			this.getBookFansList(this.$route.params.id);
			this.getBookFansInfo();
        },

        mounted() {

        },

		components: {
			indexTitle,loading,Toast
		},
		computed: {
            ...mapGetters('book', {
            	bookFansInfo:'getterBookFansInfo',
	            fourRankTop :'getterFourRankTop',
	            donateInfo:'setFansInfoDonateInfoByType',
            })
		},
		methods: {
			...mapActions('book', {
				getBookFansList:'getBookFansList',
				getBookFansInfo:'getBookFansInfo'
			}),
            ...mapActions('account', {
	            donateBook:'donateBook',
			}),
            ...mapMutations('book', [
	            'setFansInfoDonateType'
            ]),

            donate(type, status) {
	            if (status == 'open') {
	            	this.setFansInfoDonateType(type);
	            	this.$refs.toast.toastBox({type:'BookFansBecomeMZ', status:true})
                } else {
		            this.$refs.toast.toastBox({type:'BookFansBecomeMZ', status:false})
                }
            },
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .fansRank {
        height: 100%;
        overflow: hidden;
        .indexTitle {
            top: 0;
            left: 0;
            width: 100vw;
            position: fixed;
            z-index: 1000;
        }
        .indexReco {
            position: relative;
            margin-top: 44px;
            height: 100%;
            background-color: #f5f5f5;


            .fourFans {
                height: 2rem;
                width: 7.5rem;
                background-color: #fff;

                display: -webkit-flex;
                display: flex;
                align-items: center;
                justify-content: space-between;


                .cell {
                    width: 1.8rem;
                    height: 100%;
                    position:relative;

                    :nth-child(1) {
                        top:0.3rem;
                        left:0.5rem;
                        position: absolute;
                        width: 0.8rem;
                        height: 0.8rem;
                        border-radius: 0.4rem;

                    }
                    :nth-child(2) {
                        top:0.85rem;
                        left:0.5rem;
                        width: 0.8rem;
                        position: absolute;
                    }
                    :nth-child(3) {
                        top:1.25rem;
                        position: absolute;
                        width: 100%;
                        text-align: center;
                        color: #4a4a4a;
                        font-size: 0.24rem;
                    }
                }
            }

            .fansList {
                margin-top: 0.3rem;
                height: 9.2rem;
                background-color: #fff;

                .list {
                    width: 7.2rem;

                    padding-left: 0.3rem;
                    display: -webkit-flex;
                    display: flex;
                    align-items: center;
                    background-color: #fff;

                    .rankLevel {
                        flex-shrink:0;
                        width: 0.8rem;
                        img {
                            margin-left: -0.1rem;
                            width: 0.4rem;
                        }

                        p {
                            color:#9b9b9b;
                            font-size: 0.30rem;
                            width: 0.8rem;
                            text-align: center;
                        }
                    }

                    .rankInfo {
                        width: 6.9rem;
                        padding-right: 0.3rem;
                        height: 1.05rem;
                        display: -webkit-flex;
                        display: flex;
                        align-items: center;
                        background-color: #fff;
                        border-bottom: 1px solid #f1f1f1;

                        .userImg {
                            flex-shrink: 0;
                            width: 0.64rem;
                            height: 100%;
                            position: relative;

                            img {
                                width: 0.64rem;
                                height: 0.64rem;
                                border-radius: 0.32rem;
                                position: absolute;
                                right: 0;
                                top:0.2rem;
                            }

                            p {
                                position: absolute;
                                background-color: #ffba02;
                                font-size: 0.24rem;
                                height: 0.4rem;
                                line-height: 0.4rem;
                                transform: scale(0.7);
                                border-radius: 0.2rem;
                                width: 0.8rem;
                                right: -0.05rem;
                                bottom: 0;
                                color:#fff;
                            }
                        }


                        :nth-child(2) {
                            flex-grow: 1;
                            margin-left: 0.15rem;

                            p {
                                font-size: 0.28rem;
                                text-align: left;
                            }
                        }
                        :nth-child(3) {
                            flex-shrink: 0;
                            p {
                                color:#b8b8b8;
                            }
                        }


                    }
                }
            }

            .mine {
                border-top: 2px solid #c69a66;
                position: fixed;
                bottom:0;
                left: 0;
                z-index:1000;
                height: 0.9rem;
                width: 7.5rem;
                background-color: #fff;

                display: -webkit-flex;
                display: flex;
                align-items: center;

                .image {
                    flex-shrink: 0;
                    position: relative;
                    width: 1.5rem;
                    height: 0.9rem;

                    img {
                        border-radius: 0.5rem;
                        width: 1rem;
                        height: 1rem;
                        position: absolute;
                        left: 0.3rem;
                        top:-0.25rem;
                    }

                    p {
                        position: absolute;
                        background-color: #ccc;
                        font-size: 0.24rem;
                        height: 0.4rem;
                        line-height: 0.4rem;
                        transform: scale(0.7);
                        border-radius: 0.2rem;
                        width: 0.8rem;
                        left: 0.4rem;
                        bottom: 0;
                        color:#fff;
                    }
                }


                .info {
                    flex-grow: 1;
                    text-align: left;

                    :nth-child(1) {
                        color:#4a4a4a;
                        font-size: 0.28rem;

                        span {
                            color:#caa372;
                        }
                    }

                    :nth-child(2) {
                        color:#9b9b9b;
                        font-size: 0.24rem;
                    }
                }


                .rankImg {
                    margin-right: 0.25rem;
                    img {
                        width: 0.42rem;
                    }

                }


            }
        }

    }


    .becomeMZ {
        width: 5.1rem;
        height: 4.5rem;
        background-color: #fff;
        border-radius: 0.1rem;

        .close {
            height: 0.6rem;
            display: -webkit-flex;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;

            img {
                width: 0.45rem;
                height: 0.45rem;
                padding-right: 0.2rem;
            }
        }

        .donateName {

            p {
                line-height: 0.6rem;
                font-size: 0.34rem;
                color:#4a4a4a;
            }
        }

        .number {

            p {
                line-height: 0.8rem;
                color:#4a4a4a;
                font-size: 0.45rem;
                font-family: "PingFangSC-Medium";
            }
        }

        .tips {

            p {
                padding: 0.2rem 0.5rem;
                color:#9b9b9b;
                font-size: 0.24rem;
            }
        }

        .button {

            background-color: #d43c33;
            margin: 0.4rem auto 0;
            border-radius: 0.31rem;
            width: 2.7rem;
            height: 0.62rem;

            p {
                font-size: 0.3rem;
                line-height: 0.62rem;
                color:#fff;
            }
        }
    }







</style>
