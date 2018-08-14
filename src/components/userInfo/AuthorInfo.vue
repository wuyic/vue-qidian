<template>
    <div class="userInfo">
        <!--用户信息-->
        <div class="user">
            <div class="info">
                <img class="image" :src="author.RealImageUrl" alt="">
                <img class="type" v-if="author.AuthorLevel == '高级VIP'" src="../../assets/image/user_vip_red.png" alt="">
                <img class="type" v-if="author.AuthorLevel == '初级VIP'" src="../../assets/image/user_vip_golden.png" alt="">
                <p class="name">{{author.AuthorName}}</p>
                <p class="desc">{{author.AuthorDesc}}</p>
                <p
                        class="goto"
                        v-if="author.UserId"
                        @click="$router.push({name:'userInfo', params:{type:'user', id:author.UserId}})"
                >
                    他的社区主页
                </p>
            </div>
            <div class="count">
                <div class="cell" v-for="item in count">
                    <p>{{dealNum(item.num, 0, 100000)}}</p>
                    <p>{{item.name}}</p>
                </div>
            </div>
        </div>

        <!--作家动态-->
        <div class="dynamicList"  v-if="author.DynamicInfo && author.DynamicInfo.length">
            <div class="title">
                <p>作家动态</p>
            </div>

            <div
                    v-for="(item, index) in author.DynamicInfo"
                    :class="{cell:true, isBottom:index+1 < author.DynamicInfo.length}"
            >
                <p>{{item.title}}</p>
                <p>{{item.dateDesc}}</p>
            </div>
        </div>

        <!--粉丝称号-->
        <div class="AuthorTitleInfo" v-if="author.AuthorTitleInfo && author.AuthorTitleInfo.FansList.length">
            <div class="title">
                <div class="name">
                    <p>{{author.AuthorTitleInfo.FansTitle}}</p>
                </div>
                <div class="more">
                    <p>更多</p>
                    <img src="../../assets/image/more_small_16x16.png" alt="">
                </div>
            </div>

            <div class="fansImg">
                <div
                        v-for="(item, index) in author.AuthorTitleInfo.FansList"
                        class="cell"
                        v-if="index < 7"
                >
                    <img :src="item.FansImg" alt="">
                </div>
            </div>
        </div>

        <!--他的书籍-->
        <div class="Books" v-if="author.Books && author.Books.length">
            <div class="title">
                <p>作品列表({{author.Books.length}})</p>
            </div>
            <!--@click="$router.push({name:'booklistDetail', id:item.bookListId})"-->
            <div class="cell"
                 v-for="(item, index) in author.Books"
            >
                <bookInList
                        :position="'bookInfoInUserInfo'"
                        :bookInfo="item"
                        :isBottom="index+1 < author.Books.length"
                ></bookInList>
            </div>
        </div>

        <!--他的书单-->
        <div class="booklist" v-if="author.TABookList && author.TABookList.length">
            <div class="title">
                <p>TA的书单</p>
            </div>
            <!--@click="$router.push({name:'booklistDetail', id:item.bookListId})"-->
            <div class="cell"
                 v-for="(item, index) in author.TABookList"
                 @click="$router.push({name:'booklistDetail', params:{id:item.bookListId}})"
            >
                <bookListInfo
                        :type="'userInfoBookList'"
                        :bookListInfo="item"
                        :isBottom="index+1 < author.TABookList.length"
                ></bookListInfo>
            </div>
        </div>

        <!--他的书单-->
        <div class="YOUTABookList" v-if="author.YOUTABookList && author.YOUTABookList.length">
            <div class="title">
                <p>有TA书籍的书单</p>
            </div>
            <!--@click="$router.push({name:'booklistDetail', id:item.bookListId})"-->
            <div class="cell"
                 v-for="(item, index) in author.YOUTABookList"
                 @click="$router.push({name:'booklistDetail', params:{id:item.bookListId}})"
            >
                <bookListInfo
                        :type="'userInfoBookList'"
                        :bookListInfo="item"
                        :isBottom="index+1 < author.YOUTABookList.length"
                ></bookListInfo>
            </div>
        </div>

    </div>
</template>

<script>
	/**
	 * 作家信息
	 */
	import {mapGetters, mapActions, mapMutations} from 'vuex'
	import bookListInfo from '../common/bookListInfo.vue'
	import bookInList from '../common/bookInList.vue'
	import zlInfo from '../common/zhuanlan.vue'

	export default {
		name: 'index',
		data() {
			return {

			}
		},

		created() {
			this.GetAuthorInfo({id:this.$route.params.id});
		},

		mounted() {

		},

		components: {
			bookListInfo,zlInfo,bookInList
		},
		computed: {
			...mapGetters('user', {
				author:'getterAuthorInfo'
			}),
			count() {
				let count = [];
				count.push({name:'累计创作', num:this.author.AuthorWordsCount});
				count.push({name:'粉丝', num:this.author.AuthorFansCount});
				return count;
			}
		},
		methods: {
			...mapActions('user', [
				'GetAuthorInfo'
			]),
			...mapActions('booklist', [
				'gotoBookListDetail'
			]),
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .isBottom {
        border-bottom: 1px solid #e8e9ea;
    }

    .userInfo {

        .user {
            width: 7.5rem;
            background-color: #fff;

            .info {
                min-height: 2.2rem;
                margin: 0 0.3rem;
                border-bottom: 1px solid #e8e9ea;
                text-align:left;
                position:relative;

                .image {
                    width: 1.26rem;
                    height: 1.26rem;
                    border-radius: 0.63rem;
                    border: 0.05rem solid #fff;
                    margin-top: -0.55rem;
                    background-color: #fff;
                }

                .type {
                    display: block;
                    height: 0.3rem;
                    width: 0.84rem;
                    margin:-0.35rem 0 0 0.26rem;
                }

                .name {
                    line-height: 2;
                    color: #4a4a4a;
                    font-size: 0.32rem;
                    font-family: PingFangSC-Medium;
                }
                .desc {
                    color:#9b9b9b;
                    padding-bottom: 0.2rem;
                }
                .goto {
                    width: 2rem;
                    height: 0.65rem;
                    line-height: 0.65rem;
                    color:#d2403d;
                    text-align: center;
                    border: 1px solid #d2403d;
                    border-radius: 5px;
                    position: absolute;
                    right: 0;
                    top:0.3rem;
                }
            }

            .count {
                width: 6.9rem;
                height: 1.4rem;
                margin: 0 0.3rem;
                display: -webkit-flex;
                display: flex;
                align-items: center;
                justify-content: center;


                .cell {
                    width: 50%;

                    :nth-child(1) {
                        font-weight:600;
                        color: #4a4a4a;
                        font-size: 0.32rem;
                        font-family: PingFang Medium;
                    }

                    :nth-child(2) {
                        color: #9b9b9b;
                        font-size: 0.24rem;
                    }
                }
            }
        }

        .title {
            height: 0.8rem;
            width: 7.2rem;
            margin-left: 0.3rem;
            border-bottom: 1px solid #e4e3e6;

            p {
                text-align: left;
                line-height: 0.8rem;
                font-size: 0.3rem;
                font-family: "PingFangSC-Medium";

            }
        }

        .booklist {
            margin-top: 0.2rem;
            background-color: #fff;
        }

        .Books {
            margin-top: 0.2rem;
            background-color: #fff;
        }

        .AuthorTitleInfo {
            margin-top: 0.2rem;
            background-color: #fff;

            .title {

                display: -webkit-flex;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .name {
                    flex-grow: 1;

                    p {

                    }
                }

                .more {

                    flex-shrink:0;
                    display: -webkit-flex;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin-right: 0.3rem;

                    p {
                        color:#ababab;
                        font-size: 0.26rem;
                    }

                    img {
                        width: 0.35rem;
                        height: 0.35rem;
                    }
                }
            }



            .fansImg {
                height: 1.4rem;
                width: 6.9rem;
                margin:0 0.3rem;

                display: -webkit-flex;
                display: flex;
                align-items: center;

                .cell {
                    img {
                        width: 0.8rem;
                        height: 0.8rem;
                        border-radius: 0.4rem;
                        margin-right: 0.2rem;
                    }
                }
            }

        }

        .dynamicList {
            margin-top: 0.2rem;
            background-color: #fff;

            .cell {
                display: -webkit-flex;
                display: flex;
                justify-content:space-between;
                width: 6.9rem;
                margin-left: 0.3rem;
                padding-right: 0.3rem;
                height:0.9rem;
                line-height:0.9rem;

                :nth-child(1) {
                    flex-grow: 1;
                    font-size: 0.28rem;
                    color:#5c5c5c;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    text-align: left;
                }

                :nth-child(2) {
                    flex-shrink: 0;
                    font-size: 0.28rem;
                    color:#9b9b9b;
                    text-align: right;
                }
            }
        }
    }



</style>


