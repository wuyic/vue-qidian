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
                     v-for="(item, index) in fourList"
                     v-if="item.isHave"
                >
                    <img :src="item.img" alt="">
                    <img :src="item.nameImg" alt="">
                    <p>{{item.name}}</p>
                </div>
            </div>
            <div class="fansList">
                <div>
                    <div class="list">
                        <div class="rankLevel">
                            <img src="" alt="">
                        </div>
                        <div class="rankInfo">
                            <div class="userImg">

                            </div>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mine">
                <div class="image">
                    <img src="https://qidian.qpic.cn/qd_face/349573/6039679/100" alt="">
                    <p>见习</p>
                </div>
                <div class="info">
                    <p>当前粉丝值0 <span >未上榜</span></p>
                    <p>再获得是的撒风建设大街</p>
                </div>
                <div class="rankImg">
                    <img src="../../assets/image/fanslist_cardenter.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
	import indexTitle from '../common/title.vue';
	import loading from '../common/plug/loading.vue';

	export default {
		name: 'index',
		data() {
			return {
				fourList:[{
					fontColor:'#123',
					isHave:true,
                    name:'虚位以待',
                    img:require('../../assets/image/icon_fansVacancy_Gold.png'),
                    nameImg:require('../../assets/image/speciallabel_1.png'),
                },{
					fontColor:'#aacbdf',
					isHave:true,
					name:'虚位以待',
					img:require('../../assets/image/icon_fansVacancy_Silver.png'),
					nameImg:require('../../assets/image/speciallabel_2.png'),
                },{
					fontColor:'#c4c4c4',
					isHave:true,
					name:'虚位以待提队友机制直径',
					img:require('../../assets/image/icon_fansVacancy_Others.png'),
					nameImg:require('../../assets/image/speciallabel_3.png'),
                },{
					fontColor:'#c4c4c4',
					isHave:false,
					name:'虚位以待',
					img:require('../../assets/image/icon_fansVacancy_Others.png'),
					nameImg:require('../../assets/image/speciallabel_4.png'),
                },{
					fontColor:'#c4c4c4',
					isHave:true,
					name:'虚位以待',
					img:require('../../assets/image/icon_fansVacancy_Others.png'),
					nameImg:require('../../assets/image/speciallabel_5.png'),
				}]
            }
		},

		created() {
			this.bookDetail.getBookFansInfo();
        },

		components: {
			indexTitle
		},
		computed: {
			...mapGetters('bookcase', {
				bookDetail: 'getterBookDetail',
			}),
		},
		methods: {

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
                height: 9.35rem;
                background-color: #fff;
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




</style>
