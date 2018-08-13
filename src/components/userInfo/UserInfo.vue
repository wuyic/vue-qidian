<template>
    <div class="userInfo">
        <!--用户信息-->
        <div class="user">
            <div class="info">
                <img :src="user.userInfo.headImage" alt="">
                <p>{{user.userInfo.nickName}}</p>
                <p>{{user.userInfo.description}}</p>
                <p
                    v-if="user.userInfo.authorId"
                    @click="$router.push({name:'userInfo', params:{type:'author', id:user.userInfo.authorId}})"
                >
                    他的作家主页
                </p>
            </div>
            <div class="count">
                <div class="cell" v-for="item in count">
                    <p>{{dealNum(item.num, 0, 100000)}}</p>
                    <p>{{item.name}}</p>
                </div>
            </div>
        </div>

        <!--用户书单-->
        <div class="booklist">
            <div class="title">
                <p>TA的书单</p>
            </div>
            <!--@click="$router.push({name:'booklistDetail', id:item.bookListId})"-->
            <div class="cell"
                 v-for="(item, index) in user.bookList"

                 @click="gotoBookListDetail({router:$router, id:item.bookListId})"
            >
                <bookListInfo
                        :type="'userInfoBookList'"
                        :bookListInfo="item"
                        :isBottom="index+1 < user.bookList.length"
                ></bookListInfo>
            </div>
        </div>

        <!--chapterReviewList-->
        <div class="chapterReviewList">

        </div>

        <!--专栏-->
        <div class="columnList">
            <div class="title">
                <p>TA的专栏</p>
            </div>
            <div class="cell" v-for="(item, index) in user.columnList">
                <zlInfo
                        :type="'userInfoZhuanLan'"
                        :zlInfo="item"
                        :isBottom="index+1 < user.columnList.length"
                ></zlInfo>
            </div>
        </div>

        <!--动态-->
        <div class="dynamicList">
            <div class="title">
                <p>TA的动态</p>
            </div>

            <div
                 v-for="(item, index) in user.dynamicList"
                 :class="{cell:true, isBottom:index+1 < user.dynamicList.length}"
            >
                <p>{{item.title}}</p>
                <p>{{item.dateDesc}}</p>
            </div>
        </div>
    </div>
</template>

<script>
	/**
     * 用户信息
	 */
	import {mapGetters, mapActions, mapMutations} from 'vuex'
    import bookListInfo from '../common/bookListInfo.vue'
    import zlInfo from '../common/zhuanlan.vue'

	export default {
		name: 'index',
		data() {
			return {

            }
		},

		created() {
			this.GetUserPageInfo({id:this.$route.params.id});
        },

        mounted() {

        },

		components: {
			bookListInfo,zlInfo
		},
		computed: {
            ...mapGetters('user', {
            	user:'getterUserInfo'
            }),
            count() {
            	let count = [];
            	count.push({name:'书架作品', num:this.user.userInfo.bookCount});
            	count.push({name:'获得徽章', num:this.user.userInfo.badgeCount});
            	count.push({name:'粉丝称号', num:this.user.userInfo.authorTitleCount});
            	count.push({name:'获得花束', num:this.user.userInfo.flowerCount});
            	return count;
            }
		},
		methods: {
            ...mapActions('user', [
            	'GetUserPageInfo'
            ]),
            ...mapActions('booklist', [
            	'gotoBookListDetail'
            ])
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

                :nth-child(1) {
                    width: 1.26rem;
                    height: 1.26rem;
                    border-radius: 0.63rem;
                    border: 3px solid #fff;
                    margin-top: -0.55rem;
                    background-color: #fff;
                }
                :nth-child(2) {
                    line-height: 2;
                    color: #4a4a4a;
                    font-size: 0.32rem;
                    font-family: PingFangSC-Medium;
                }
                :nth-child(3) {
                    color:#9b9b9b;
                    padding-bottom: 0.2rem;
                }
                :nth-child(4) {
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
                    width: 25%;

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

        .columnList {
            margin-top: 0.2rem;
            background-color: #fff;
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
