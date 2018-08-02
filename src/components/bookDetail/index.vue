<template>
    <div style="background-color: #eee; height: 100%">
        <!--头部有背景的-->
        <div class="bookDetailAll"
            :style="{backgroundImage: 'url('+bookDetail.bookDetail.CategoryPicture || urlBase+')'}"
        >
            <div class="indexTitle">
                <div class="headLeft" @click="$router.go(-1)">
                    <img class="headLeftImg" src="../../assets/image/QDNavBackButton_36x36_fff.png" alt="">
                    <p class="headLeftWord">返回</p>
                </div>
                <div class="headRight">
                    <img class="shareImg" src="../../assets/image/icon_share.png" alt="">
                </div>
            </div>
            <div class="bookInfoBox">
                <div>
                    <img class="bookImg" :src='"https://qidian.qpic.cn/qdbimg/" + bookDetail.bookDetail.AuthorId + "/" + bookDetail.bookDetail.BookId + "/180"' alt="">
                </div>
                <div class="bookInfo">
                    <div class="booktitle">
                        <p>{{bookDetail.bookDetail.BookName}}</p>
                    </div>
                    <div class="bookauthor">
                        <p class="name">{{bookDetail.bookDetail.AuthorInfo.AuthorName}}</p>
                        <p class="level">{{bookDetail.bookDetail.AuthorInfo.AuthorLevel}}</p>
                    </div>
                    <div class="bookstar">
                        <img src="../../assets/image/Staricon_16x16.png" alt="" v-for="item in Math.floor(bookDetail.bookDetail.BookStar)">
                        <img src="../../assets/image/HalfStar_icon_16x16.png" alt="" v-for="item in Math.round((bookDetail.bookDetail.BookStar*10%10)/10)">
                        <p>
                            {{bookDetail.dealNum(bookDetail.bookDetail.BssReadTotal)}}人读过
                        </p>
                    </div>
                    <div class="booktype">
                        <p>{{bookDetail.bookDetail.CategoryName + ' | ' + bookDetail.bookDetail.SubCategoryName}}</p>
                    </div>
                    <div class="bookstatus">
                        <p>{{bookDetail.dealNum(bookDetail.bookDetail.WordsCnt, 1) + '字 | ' + bookDetail.bookDetail.BookStatus}}</p>
                    </div>
                </div>
            </div>
        </div>

        <!--月票粉丝推荐大赏信息-->
        <div class="rewardInfo">
            <div class="info" v-for="(item, index) in calcReward">
                <p class="value">{{item.value.replace("万", '')}}
                    <span>
                        {{item.value.replace(/[0-9a-z.]/g, '')}}
                    </span>
                </p>
                <p class="name">{{item.name}}</p>
            </div>
        </div>

        <!--简介 目录 听书-->
        <div class="bookIntr">
            <div class="bookDesc">
                <div>
                    <p class="title">简介</p>
                    <p class="desc">{{bookDetail.bookDetail.Description}}</p>
                </div>
                <div class="more">
                    <img src="../../assets/image/icon_open_16x16.png" alt="">
                </div>
            </div>
            <div class="mulu"></div>
            <div class="hearBook"></div>
        </div>

    </div>
</template>
<!--bgImg: -->
<script>
	/**
	 * 书籍详情
	 */
	import {mapGetters, mapActions} from 'vuex'
	export default {
		name: 'bookDetail',
		data() {
			return {
				urlBase:'https://ih5.if.qidian.com/Atom.axd/Content/images/categorybg/4.jpg'
            }
		},
        created() {
			this.$store.dispatch('bookcase/getBookDetail');
        },
		mounted() {

		},
        computed:{
            ...mapGetters('bookcase', {
	            bookDetail:'getterBookDetail'
            }),

            calcReward() {
            	let arr = [];
            	arr.push({name:'月票', value:this.bookDetail.dealNum(this.bookDetail.bookDetail.MonthTicketCount, 1) || 0});
            	arr.push({name:'推荐', value:this.bookDetail.dealNum(this.bookDetail.bookDetail.RecommendAll, 0, 100000) || 0});
            	arr.push({name:'打赏', value:this.bookDetail.dealNum(this.bookDetail.bookDetail.DonateCount, 1) || 0});
            	arr.push({name:'粉丝', value:this.bookDetail.dealNum(this.bookDetail.bookDetail.BookFansCount, 1) || 0});
            	return arr;
            }
        },
		methods: {},
	}
</script>

<style lang="scss" scoped>
    .bookDetailAll {
        height: 3.53rem;
        width: 7.5rem;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        -webkit-background-size: 100% 100%;
        overflow: hidden;

        .indexTitle {
            padding: 0 0.1rem;
            margin-top: 20px;
            height: 0.7rem;
            width: calc(100% - 0.2rem);
            display: -webkit-flex;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .headLeft {
                width: 1.6rem;
                display: -webkit-flex;
                display: flex;
                align-items: center;

                .headLeftImg {
                    width: 0.6rem;
                    height: 0.6rem;
                    align-self: flex-end;
                }

                .headLeftWord {
                    margin-left: -0.1rem;
                    color: #fff;
                    font-size: 0.3rem;
                }
            }

            .headRight {
                width: 1.2rem;
                .shareImg {
                    width: 0.6rem;
                    height: 0.6rem;
                    align-self: flex-end;
                }
            }

        }

        .bookInfoBox {
            height: 2.05rem;
            display: -webkit-flex;
            display: flex;
            width: 7rem;
            padding: 0.2rem 0.25rem;
            color:#fff;

            .bookImg {
                height: 2.05rem;
                width: 1.5rem;
            }

            .bookInfo {

                padding-left: 0.45rem;
                text-align: left;
                .booktitle {
                    p {
                        font-size: 0.34rem;
                        font-family: PingFangSC-Medium;
                    }
                }
                .bookauthor {
                    display: -webkit-flex;
                    display: flex;
                    align-items: center;
                    height: 0.4rem;
                    line-height: 0.4rem;

                    .name {
                        font-size: 0.24rem;
                        transform: scale(0.9);
                        transform-origin: left;
                        font-family: PingFangSC-Medium;
                    }
                    .level {
                        font-size: 0.24rem;
                        font-family: PingFangSC-Medium;
                        color:#69b4fe;
                        border: 1px solid #69b4fe;
                        border-radius: 0.2rem;
                        padding: 0 0.2rem;
                        transform: scale(0.8);
                        transform-origin: left;
                        height: 0.3rem;
                        line-height: 0.3rem;

                    }
                }
                .bookstar {
                    height: 0.4rem;
                    line-height: 0.4rem;
                    display: -webkit-flex;
                    display: flex;
                    align-items: center;

                    img {
                        width: 0.3rem;
                        height: 0.3rem;
                    }
                    p {
                        font-size: 0.24rem;
                        transform: scale(0.9);
                        transform-origin: left;
                        font-family: PingFangSC-Medium;
                    }
                }
                .booktype {
                    height: 0.4rem;
                    line-height: 0.4rem;
                    p{
                        font-size: 0.24rem;
                        transform: scale(0.9);
                        transform-origin: left;
                        font-family: PingFangSC-Medium;
                    }
                }
                .bookstatus {
                    height: 0.4rem;
                    line-height: 0.4rem;
                    p{
                        font-size: 0.24rem;
                        transform: scale(0.9);
                        transform-origin: left;
                        font-family: PingFangSC-Medium;
                    }
                }
            }

        }
    }

    .rewardInfo {
        background-color: #fff;
        width: 7.5rem;
        height: 1.25rem;
        display: -webkit-flex;
        display: flex;
        align-items: center;

        .info {
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 25%;
            height: 100%;

            .value {
                font-size: 0.34rem;
                font-family: PingFang-Medium;
            }

            .value span {
                font-size: 0.24rem;
                transform: scale(0.8);
                transform-origin: left;
                margin-left: -0.1rem;
            }

            .name {
                color:#9b9b9b;
                font-size: 0.24rem;
            }
        }

    }

    .bookIntr {
        margin-top: 0.2rem;
        width: 7.5rem;
        background-color: #fff;
        overflow: hidden;

        .bookDesc {
            border-bottom:1px solid #dcdcdc;
            margin-left: 0.3rem;
            width: 7.2rem;

            display: -webkit-flex;
            display: flex;
            justify-content: space-between;
            padding-bottom: 0.5rem;

            .title {
                height: 0.8rem;
                line-height: 0.8rem;
                text-align: left;
                width: 6.5rem;
                font-family: PingFang-Medium;
                color:#000;
                font-size: 0.34rem;
            }

            .desc {
                text-align: left;
                width: 6.5rem;
                color:#7a7a7a;
                font-size: 0.28rem;
                line-height: 0.4rem;
                overflow:hidden;
                text-overflow:clip;
                height: 1.2rem;

             }

            .more {
                width: 0.7rem;
                align-self: flex-end;
                img {
                    width: 0.32rem;
                    height: 0.32rem;
                }
            }
        }

        .mulu {
            height: 0.8rem;
            margin-left: 0.3rem;
            width: 7.2rem;
            border-bottom:1px solid #dcdcdc;
        }

        .hearBook {
            height: 0.8rem;
            margin-left: 0.3rem;
            width: 7.2rem;
        }
    }
</style>

