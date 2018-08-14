<template>
    <div style="background-color: #eee;">
        <!--头部有背景的-->
        <div class="bookDetailAll"
             :style="{backgroundImage: 'url('+bookDetail.CategoryPicture || urlBase+')'}"
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
                    <img class="bookImg"
                         :src='"https://qidian.qpic.cn/qdbimg/" + bookDetail.AuthorId + "/" + bookDetail.BookId + "/180"'
                         alt="">
                </div>
                <div class="bookInfo">
                    <div class="booktitle">
                        <p>{{bookDetail.BookName}}</p>
                    </div>
                    <div class="bookauthor">
                        <p class="name">{{bookDetail.AuthorInfo.AuthorName}}</p>
                        <p class="level">{{bookDetail.AuthorInfo.AuthorLevel}}</p>
                    </div>
                    <div class="bookstar">
                        <img src="../../assets/image/Staricon_16x16.png" alt=""
                             v-for="item in Math.floor(bookDetail.BookStar)">
                        <img src="../../assets/image/HalfStar_icon_16x16.png" alt=""
                             v-for="item in Math.round((bookDetail.BookStar*10%10)/10)">
                        <p>
                            {{dealNum(bookDetail.BssReadTotal)}}人读过
                        </p>
                    </div>
                    <div class="booktype">
                        <p>{{bookDetail.CategoryName + ' | ' + bookDetail.SubCategoryName}}</p>
                    </div>
                    <div class="bookstatus">
                        <p>
                            {{dealNum(bookDetail.WordsCnt, 1) + '字 | ' + bookDetail.BookStatus}}</p>
                    </div>
                </div>
            </div>
        </div>

        <!--月票粉丝推荐大赏信息-->
        <div class="rewardInfo">
            <div class="info"
                 v-for="(item, index) in calcReward"
                 @click=" index == 3 ? $router.push({name:'bookFansRank', params:{id:$route.params.id}}) : ''"
            >
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
                <p class="desc" :style="{maxHeight:showMoreDesc.height}"
                   v-html="whiteSpace(bookDetail.Description)"></p>
            </div>
            <div class="more" @click="bookDetailChangeMoreDesc">
                <img v-if="!showMoreDesc.more" src="../../assets/image/icon_open_16x16.png" alt="">
                <img v-if="showMoreDesc.more" src="../../assets/image/icon_stuff_16x16.png" alt="">
            </div>
        </div>
        <div class="mulu">
            <div>
                <p class="title">目录</p>
            </div>
            <div class="right">
                <p>
                    连载至 {{bookDetail.TotalChapterCount}} 章 更新与{{judgeTime(Math.max(bookDetail.LastChapterUpdateTime, bookDetail.LastVipChapterUpdateTime))}}以前</p>
                <img src="../../assets/image/more_small_16x16.png" alt="">
            </div>
        </div>
        <div class="hearBook" v-if="bookDetail.AudioInfo">
            <div>
                <p class="title">听书</p>
            </div>
            <div class="right">
                <p>连载至{{bookDetail.AudioInfo.ChapterIndex}}章</p>
                <img src="../../assets/image/more_small_16x16.png" alt="">
            </div>
        </div>
    </div>

    <!--荣誉-->
    <div class="sameDiv bookHonor">
        <div>
            <p class="title">作品荣誉</p>
        </div>
        <div class="right">
            <p>更上一层楼</p>
            <img src="../../assets/image/more_small_16x16.png" alt="">
        </div>
    </div>

    <!--书评-->
    <div class="sameDiv bookReviewList">
        <div class="listTitle">
            <div>
                <p class="title">书评</p>
            </div>
            <div class="right">
                <p>{{dealNumWithAdd(bookDetail.BookForumCount)}}</p>
                <img src="../../assets/image/more_small_16x16.png" alt="">
            </div>
        </div>
        <div class="reviewList"
             v-for="(item, index) in bookDetail.BookReviewList"
             v-if="index < 3"
        >
            <div>
                <img class="userImg" :src="item.UserHeadIcon"/>
            </div>
            <div class="discussInfo">
                <div class="userInfo">
                    <div class="info">
                        <p class="userName">{{item.UserName}}</p>
                        <p class="timeSource">{{item.From}}</p>
                    </div>
                    <div class="count">
                        <img src="../../assets/image/icon_comment.png" alt="">
                        <p>{{item.PostCount}}</p>
                    </div>
                </div>
                <p class="disContent" v-html="dealWithEmoji(item.Body)"></p>
            </div>

        </div>
    </div>

    <!--作家-->
    <div class="sameDiv authorInfo">
        <div class="authorTitle"
             @click="$router.push({name:'userInfo', params:{id:bookDetail.AuthorInfo.AuthorId, type:'author'}})"
        >
            <div>
                <p class="title">作家</p>
            </div>
            <div class="right">
                <img src="../../assets/image/more_small_16x16.png" alt="">
            </div>
        </div>
        <div class="userInfo"
             @click="$router.push({name:'userInfo', params:{id:bookDetail.AuthorInfo.AuthorId, type:'author'}})"
        >
            <div class="leftInfo">
                <img :src="bookDetail.AuthorInfo.RealImageUrl" alt="">
            </div>
            <div class="rightInfo">
                <p>{{bookDetail.AuthorInfo.AuthorName}}</p>
                <p>{{bookDetail.AuthorInfo.AuthorDesc}}</p>
            </div>
        </div>

        <div style="overflow: hidden; height: 3.7rem;"
             v-if="calcHaslength(bookDetail.AuthorRecommend)"
        >
            <div class="bookInfoList" v-if="calcHaslength(bookDetail.AuthorRecommend)">
                <div class="list" v-for="(item, index) in bookDetail.AuthorRecommend"
                     @click="$router.push({name:'bookDetail', params:{id:item.BookId}})"
                >
                    <img :src='"https://qidian.qpic.cn/qdbimg/" + item.AuthorId + "/" + item.BookId + "/180"'
                         alt="">
                    <div class="bookName">
                        <p>{{item.BookName}}</p>
                    </div>
                    <p>{{dealNum(item.BssReadTotal, 1)}}人读过</p>
                </div>
            </div>
        </div>
    </div>

    <!--书单收录-->
    <div class="sameDiv bookListhaveThisBook">
        <div class="authorTitle">
            <div>
                <p class="title" style="width: 4rem">书单收录 （{{relationBookList.allCount}}）</p>
            </div>
            <div class="right">
                <img src="../../assets/image/more_small_16x16.png" alt="">
            </div>
        </div>

        <div class="booklistDetail">
            <div class="list"
                 v-for="(item, index) in relationBookList.list"
                 :data-booklistId="item.id"
                 :style="{borderBottom:index+1<relationBookList.list.length?'1px solid #dcdcdc':''}"
            >
                <div class="booklistDesc">
                    <div>
                        <p class="desc" :style="{maxHeight:!item.isShowMoreDesc?'1.2rem':'none'}"
                           v-html="whiteSpace(item.bookIntroWords)"></p>
                    </div>
                    <div class="more" @click="item.changeShowMoreDesc()">
                        <img v-if="!item.isShowMoreDesc" src="../../assets/image/icon_open_16x16.png" alt="">
                        <img v-if="item.isShowMoreDesc" src="../../assets/image/icon_stuff_16x16.png" alt="">
                    </div>
                </div>
                <div class="booklistName">
                    <p>
                        <span>书单</span>
                        {{item.name}}
                    </p>
                </div>
                <div class="author">
                    <img :src="item.authorHeadImg" alt="">
                    <p>{{item.authorName}}</p>
                </div>
            </div>
        </div>
    </div>

    <!--书友还看过-->
    <div class="sameDiv bookFriendsRecommend"
         v-if="calcHaslength(bookDetail.BookFriendsRecommend)"
    >
        <div class="authorTitle">
            <div>
                <p class="title" style="width: 4rem">书友还看过</p>
            </div>
            <div class="right">
                <img src="../../assets/image/more_small_16x16.png" alt="">
            </div>
        </div>
        <div style="overflow: hidden; height: 3.6rem;padding-top: 0.3rem">
            <div class="bookInfoList">
                <div class="list"
                     v-for="(item, index) in bookDetail.BookFriendsRecommend"
                     @click="$router.push({name:'bookDetail', params:{id:item.BookId}})"
                >
                    <img :src='"https://qidian.qpic.cn/qdbimg/" + item.AuthorId + "/" + item.BookId + "/180"'
                         alt="">
                    <div class="bookName">
                        <p>{{item.BookName}}</p>
                    </div>
                    <p>{{dealNum(item.BssReadTotal, 1)}}人读过</p>
                </div>
            </div>
        </div>

    </div>

    <!--同类作品-->
    <div class="sameDiv sameRecommend" v-if="calcHaslength(bookDetail.SameRecommend)">
        <div class="authorTitle">
            <div>
                <p class="title" style="width: 4rem">同类作品</p>
            </div>
            <div class="right">
                <img src="../../assets/image/more_small_16x16.png" alt="">
            </div>
        </div>
        <div style="overflow: hidden; height: 3.6rem;padding-top: 0.3rem">
            <div class="bookInfoList">
                <div class="list"
                     v-for="(item, index) in bookDetail.SameRecommend"
                     @click="$router.push({name:'bookDetail', params:{id:item.BookId}})"
                >
                    <img :src='"https://qidian.qpic.cn/qdbimg/" + item.AuthorId + "/" + item.BookId + "/180"'
                         alt="">
                    <div class="bookName">
                        <p>{{item.BookName}}</p>
                    </div>
                    <p>{{dealNum(item.BssReadTotal, 1)}}人读过</p>
                </div>
            </div>
        </div>
    </div>

    <!--版权信息-->
    <div class="sameDiv copyRight">
        <div class="authorTitle">
            <p class="title" style="width: 4rem">版权信息</p>
        </div>

        <div class="desc">
            <p v-html="whiteSpace(bookDetail.CopyRight)">

            </p>
        </div>
    </div>
    </div>
</template>
<!--bgImg: -->
<script>

	/**
	 * 书籍详情
	 */
	import {mapGetters, mapActions, mapMutations} from 'vuex'

	export default {
		name: 'bookDetail',
		data() {
			return {
				urlBase: 'https://ih5.if.qidian.com/Atom.axd/Content/images/categorybg/4.jpg'
			}
		},
		watch: {
			'$route': function (to, from) {
				console.log('this', this);
				if (to.name == 'bookDetail' && from.name == to.name) {
					this.$router.go(0)
				}
			}

		},
		created() {
			console.log('id', this.$route.params.id);
			this.$store.dispatch('book/getBookDetail', {bookId: this.$route.params.id});
		},
		computed: {
			...mapGetters('book', {
				bookDetail: 'getterBookDetail',
				relationBookList: 'getRelationBookList',
				showMoreDesc: 'getterBookDetailShowMoreDesc',
			}),
			...mapGetters('chat', {
				dealWithEmoji: 'dealWithEmoji'
			}),

			calcReward() {
				let arr = [];
				console.log('bookDetail', this.bookDetail);
				arr.push({
					name: '月票',
					value: this.dealNum(this.bookDetail.MonthTicketCount, 1) || 0
				});
				arr.push({
					name: '推荐',
					value: this.dealNum(this.bookDetail.RecommendAll, 0, 100000) || 0
				});
				arr.push({name: '打赏', value: this.dealNum(this.bookDetail.DonateCount, 1) || 0});
				arr.push({
					name: '粉丝',
					value: this.dealNum(this.bookDetail.BookFansCount, 1) || 0,
				});
				return arr;
			},
		},
		methods: {
			...mapMutations('bookcase', [
				'bookDetailChangeMoreDesc'
			]),

			calcHaslength(item) {
				if (item) {
					return item.length;
				}
				return 0;
			}
		},
	}
</script>

<style lang="scss" scoped>

    .right {
        display: -webkit-flex;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        width: 5.5rem;

        p {
            color: #9b9b9b;
            font-size: 0.26rem;
            padding-right: 0.1rem;
        }

        img {
            width: 0.35rem;
            height: 0.35rem;
        }
    }

    .title {
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: left;
        font-family: PingFang-Medium;
        color: #000;
        font-size: 0.30rem;
    }

    .sameDiv {
        margin-top: 0.2rem;
        background-color: #fff;
        width: 7.5rem;
    }

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
            color: #fff;

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
                        color: #69b4fe;
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
                    p {
                        font-size: 0.24rem;
                        transform: scale(0.9);
                        transform-origin: left;
                        font-family: PingFangSC-Medium;
                    }
                }
                .bookstatus {
                    height: 0.4rem;
                    line-height: 0.4rem;
                    p {
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
                color: #9b9b9b;
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
            border-bottom: 1px solid #dcdcdc;
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
                color: #000;
                font-size: 0.34rem;
            }

            .desc {
                text-align: left;
                width: 6.5rem;
                color: #7a7a7a;
                font-size: 0.26rem;
                line-height: 0.4rem;
                overflow: hidden;
                text-overflow: clip;
                max-height: 1.2rem;
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
            padding-right: 0.3rem;
            width: 6.9rem;
            border-bottom: 1px solid #dcdcdc;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .hearBook {
            height: 0.8rem;
            margin-left: 0.3rem;
            padding-right: 0.3rem;
            width: 6.9rem;

            display: -webkit-flex;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    .bookHonor {
        height: 0.8rem;
        padding: 0 0.3rem;
        width: 6.9rem;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .bookReviewList {
        width: 7.5rem;
        background-color: #fff;

        .listTitle {
            height: 0.8rem;
            margin-left: 0.3rem;
            padding-right: 0.3rem;
            width: 6.9rem;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #dcdcdc;

        }

        .reviewList {
            display: -webkit-flex;
            display: flex;
            justify-content: flex-start;
            padding: 0.3rem 0 0 0.28rem;
            background-color: #fff;
            align-items: flex-start;

            .userImg {
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 0.3rem;
            }

            .discussInfo {
                padding: 0 0.25rem 0.3rem 0.1rem;
                width: 6.2rem;

                .userInfo {
                    height: 0.6rem;
                    display: -webkit-flex;
                    display: flex;
                    justify-content: space-between;
                    width: 6.2rem;
                    overflow: hidden;

                    .info {
                        width: 4.2rem;
                        .userName {
                            text-align: left;
                            font-size: 0.26rem;
                            color: #5c9cda;
                            line-height: 0.3rem;
                        }

                        .timeSource {
                            transform: scale(0.8);
                            transform-origin: left;
                            line-height: 0.37rem;
                            text-align: left;
                            font-size: 0.24rem;
                            color: #9b9b9b;
                        }
                    }

                    .count {
                        width: 2rem;
                        height: 0.6rem;
                        display: -webkit-flex;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        font-size: 0;
                        overflow: hidden;

                        p {
                            color: #9b9b9b;
                            font-size: 0.24rem;
                            line-height: 0.6rem;
                            padding: 0 0.1rem;

                        }
                        img {
                            width: 0.35rem;
                            height: 0.35rem;
                        }
                    }

                }

                .disContent {
                    padding-top: 0.1rem;
                    line-height: 0.4rem;
                    max-height: 1.2rem;
                    overflow: hidden;
                    text-align: left;
                    font-size: 0.27rem;
                    color: #4a4a4a;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }

    .authorInfo {
        width: 7.5rem;
        background-color: #fff;

        .authorTitle {
            height: 0.8rem;
            margin-left: 0.3rem;
            padding-right: 0.3rem;
            width: 6.9rem;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #dcdcdc;
        }

        .userInfo {
            display: -webkit-flex;
            display: flex;
            align-items: center;
            padding: 0.3rem 0.3rem;
            width: 6.9rem;

            .leftInfo {
                width: 0.85rem;
                flex-shrink: 0;
                img {
                    height: 0.85rem;
                    width: 0.85rem;
                    border-radius: 0.425rem;
                }
            }

            .rightInfo {
                text-align: left;
                padding-left: 0.2rem;

                :first-child {
                    color: #4a4a4a;
                    font-size: 0.3rem;
                    margin-top: -0.15rem;
                    line-height: 1.6;
                }

                :nth-child(2) {
                    color: #b7b7b7;
                    font-size: 0.24rem;
                    line-height: 1;
                }
            }
        }
    }

    .bookListhaveThisBook {
        width: 7.5rem;
        background-color: #fff;

        .authorTitle {
            height: 0.8rem;
            margin-left: 0.3rem;
            padding-right: 0.3rem;
            width: 6.9rem;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #dcdcdc;
        }

        .booklistDetail {
            margin-left: 0.3rem;
            width: 7.2rem;
            .booklistDesc {

                display: -webkit-flex;
                display: flex;
                justify-content: space-between;
                padding: 0.2rem 0 0.35rem 0;

                .desc {
                    text-align: left;
                    width: 6.5rem;
                    color: #4a4a4a;
                    font-size: 0.26rem;
                    line-height: 0.4rem;
                    overflow: hidden;
                    text-overflow: clip;
                    max-height: 1.2rem;
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

            .booklistName {

                text-align: left;
                p {
                    line-height: 0.35rem;
                    color: #549cda;
                    span {
                        color: #4a4a4a;
                    }
                }
            }

            .author {
                height: 1rem;
                width: 7.2rem;
                display: -webkit-flex;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                img {
                    width: 0.35rem;
                    height: 0.35rem;
                    border-radius: 0.175rem;
                }
                p {
                    padding-left: 0.1rem;
                    color: #9b9b9b;
                }
            }
        }

    }

    .bookFriendsRecommend {
        width: 7.5rem;
        background-color: #fff;

        .authorTitle {
            height: 0.8rem;
            margin-left: 0.3rem;
            padding-right: 0.3rem;
            width: 6.9rem;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    .sameRecommend {
        width: 7.5rem;
        background-color: #fff;

        .authorTitle {
            height: 0.8rem;
            margin-left: 0.3rem;
            padding-right: 0.3rem;
            width: 6.9rem;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    .copyRight {
        width: 7.5rem;
        background-color: #fff;
        padding-bottom: 0.3rem;

        .authorTitle p {
            height: 0.8rem;
            line-height: 0.8rem;
            margin: 0 0.3rem;
            width: 6.9rem;
        }

        .desc p {
            padding-left: 0.3rem;
            text-align: left;
            color: #7b7b7b;
            font-size: 0.28rem;
        }
    }

    .bookInfoList {
        background-color: #fff;
        width: auto;
        overflow-x: scroll;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .list {
            padding: 0 0.25rem;
            width: 1.5rem;
            img {
                width: 1.5rem;
                height: 2rem;
            }

            .bookName {
                display: -webkit-flex;
                display: flex;
                justify-content: center;
                flex-direction: column;
                min-height: 0.9rem;

                p {
                    text-align: left;
                    font-size: 0.28rem;
                    color: #4a4a4a;
                    line-height: 0.4rem;
                }
            }

            :nth-child(3) {
                line-height: 0.6rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
                font-size: 0.24rem;
                color: #9b9b9b;
                margin-bottom: 0.3rem;
            }
        }
    }


</style>
