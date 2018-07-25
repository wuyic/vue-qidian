<template>
    <div>
        <!--书单信息-->
        <div class="bookListInfo">
            <div class="bookListType">
                <p class="word">
                    {{bookListDetail.info.bookListType}}
                </p>
            </div>
            <div class="info">
                <div class="title">
                    <p>{{bookListDetail.info.name}}</p>
                </div>
                <div class="desc">
                    <p v-html="whiteSpace(bookListDetail.info.des)">
                    </p>
                </div>
                <div class="tips">
                    <div class="cell" v-for="item in bookListDetail.info.labels" :style="getStyle(item)">
                        <p>{{item.name}}</p>
                    </div>
                </div>
                <div class="author" style="justify-content: space-between;">
                    <div class="author">
                        <img class="authorImg" :src="bookListDetail.info.authorHeadImg" alt="">
                        <p class="authorName">{{bookListDetail.info.authorName}}</p>
                        <p class="authorTime">{{bookListDetail.info.bookEditTimeDesc}}</p>
                        <p class="authorTime"> · {{bookListDetail.info.bookCount}}本</p>
                    </div>
                    <!--他人的书单-->
                    <div class="author" style="justify-content: flex-end" @click="BookListCollect()" v-if="!bookListDetail.info.isSelfCreate">
                        <img class="authorFlower" v-if="bookListDetail.info.isCollect!=1" src="../../assets/image/icon_plus_follow_24x24.png" alt="">
                        <img class="authorFlower"  v-if="bookListDetail.info.isCollect==1" src="../../assets/image/icon_plus_followed_24x24.png" alt="">
                        <p class="authorFlowerNum" :style="{color:bookListDetail.info.isCollect==1?'#ccc':'#d43c33'}">{{bookListDetail.info.collectCount}}关注</p>
                    </div>

                    <!--我的书单 显示添加书籍按钮-->
                    <div class="author" style="justify-content: flex-end"
                         v-if="bookListDetail.info.isSelfCreate"
                         @click="myBookListAddBook()"
                    >
                        <img class="authorFlower" style="width: 0.4rem; height:0.4rem;" src="../../assets/image/icon_add_red_17x17.png" alt="">
                        <p class="authorFlowerNum" style="color:#d43c33">作品</p>
                    </div>
                </div>
            </div>
        </div>

        <!--书单内的书籍-->
        <div class="books" >
            <div class="bookInfo" v-for="(item, index) in bookListDetail.books">
                <bookInList :bookInfo="item" :position="'bookListDetail'"></bookInList>
                <div class="desc">
                    <p v-html="whiteSpace(item.bookIntroWords)"></p>
                </div>
                <div class="opera">
                    <div @click="BookListLikeOrNot({type:'like', index:index})" class="displayFlex like" v-if="!item.isSelftFavored"><img src="../../assets/image/icon_like_un_24x24.png" alt=""><p style="color:#373538;">喜欢{{calcIsShow(item.beFavoredCount)}}</p></div>
                    <div @click="BookListLikeOrNot({type:'like', index:index})" class="displayFlex like" v-if="item.isSelftFavored"><img src="../../assets/image/icon_like_bookList_24x24.png" alt=""><p style="color:#d43c33;">喜欢{{calcIsShow(item.beFavoredCount)}}</p></div>
                    <div @click="BookListLikeOrNot({type:'dislike', index:index})" class="displayFlex dislike" v-if="!item.hasDisliked"><img src="../../assets/image/icon_brick_grey_24x24.png" alt=""><p style="color:#373538;">拍砖{{calcIsShow(item.dislikedCount)}}</p></div>
                    <div @click="BookListLikeOrNot({type:'dislike', index:index})" class="displayFlex dislike" v-if="item.hasDisliked"><img src="../../assets/image/icon_brick_red_24x24.png" alt=""><p style="color:#d43c33;">拍砖{{calcIsShow(item.dislikedCount)}}</p></div>
                    <div class="displayFlex addbookcase" v-if="!findBookById(item.bookId)"><img src="../../assets/image/icon_addbookshelf_24x24.png" alt=""><p style="color: #373538;">加入书架</p></div>
                    <div class="displayFlex addbookcase" v-if="findBookById(item.bookId)"><img src="../../assets/image/icon_addbookshelf_u_24x24.png" alt=""><p style="color: #ccc;">已在书架</p></div>
                </div>
            </div>
        </div>

        <!--相关书单-->
        <div class="booklistRecomond" v-if="!bookListDetail.info.isSelfCreate">
            <div class="title">
                <p>相关书单</p>
            </div>
            <div v-for="(item, index) in bookListDetail.info.relationBookLists">
                <bookListInfo :bookListInfo="item" :type="'bookListRecomond'" :isBottom="index + 1 < bookListDetail.info.relationBookLists.length">

                </bookListInfo>
            </div>
        </div>


    </div>
</template>

<script>
    import bookInList from '../common/bookInList.vue'
    import bookListInfo from '../common/bookListInfo.vue'
    import {mapActions} from 'vuex'
	export default {
		name: 'HelloWorld',
		data() {
			return {
				color: [
					{text: '#e27892', bg: '#ffeaef'},
					{text: '#63a7f8', bg: '#ecf4ff'},
					{text: '#63a7f8', bg: '#ecf4ff'},
					{text: '#576886', bg: '#ebebf7'},
					{text: '#de7782', bg: '#fff1f1'},
					{text: '#de7782', bg: '#fff1f1'},
					{text: '#de7782', bg: '#fff1f1'},
				],
			}
		},
        components:{
	        bookInList,bookListInfo
        },
		computed: {
			bookListDetail() {
				console.log(this.$store.state.booklist.bookListDetail);
				return this.$store.state.booklist.bookListDetail;
            },
        },
		mounted() {

        },
		methods: {
            ...mapActions('booklist', [
            	'BookListCollect', 'BookListLikeOrNot'
            ]),
            /**
             * 查找Id是否存在
             */
            findBookById(id) {
            	let book = this.$store.state.bookcase.bookCase.getBookById(id);
            	if(book) {
            		return true;
                } else {
            		return false;
                }
            },
			/**
             * 换行符 转化
			 * @param desc
			 */
			whiteSpace(desc) {
				let regx = /\n/g;
				if (desc && desc.length > 0) {
					return desc.replace(regx, '<br/>')
                } else {
					return ''
                }

			},
			/**
             * 获取标签颜色与背景颜色
			 * @param item
			 * @returns {{color, backgroundColor: (string|string|string|string|*)}}
			 */
			getStyle(item) {
				let groupID = Math.max(Math.min(item.groupId, 6), 0)
				return {
					color: this.color[groupID].text,
					backgroundColor: this.color[groupID].bg,
				}
			},
			/**
             * 是否显示 数量 0就不显示 其他数字显示
			 * @param val
			 * @returns {*}
			 */
			calcIsShow(val) {
				if (val > 0) {
					return '('+val +')'
				} else {
					return '';
				}
			},

		},

	}
</script>

<style>

    .displayFlex{
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bookListInfo {
        position: relative;
        width: 7.5rem;
        min-height: 3.3rem;
        background-color: #fff;
    }

    .bookListType {
        position: absolute;
        top: 0.2rem;
        right: 0;
        background-image: url('../../assets/image/pic_tag_blue_84x28.png');
        background-size: 100% 100%;
        height: 0.52rem;
        width: 1.56rem;
    }

    .bookListType .word {
        font-size: 0.26rem;
        color: #fff;
        text-align: center;
        width: 1.6rem;
        line-height: 0.55rem;
    }

    .bookListInfo .info {
        margin: 0 0.25rem;
        padding-top: 0.2rem;
    }

    .bookListInfo .info .title {
        width: 5.2rem;
        text-align: left;
        font-size: 0.32rem;
        padding: 0.3rem 0;
        color: #333;
    }

    .bookListInfo .info .desc {
        text-align: left;
        font-size: 0.26rem;
        color: #7f7f7f;
        line-height: 1.5;
    }

    .bookListInfo .info .tips {
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 0.25rem;
        margin-bottom: 0.15rem;

    }

    .bookListInfo .info .tips .cell {
        height: 0.48rem;
        font-size: 0.22rem;
        border-radius: 0.24rem;
        background-color: #fff1f1;
        padding: 0 0.2rem;
        color: #bc7679;
        line-height: 0.48rem;
        margin: 0 0.05rem 0.11rem 0;
    }

    .bookListInfo .info .author {
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 1rem;
    }

    .bookListInfo .info .authorImg {
        width: 0.44rem;
        height: 0.44rem;
        border-radius: 0.22rem;
        font-size: 0;
    }

    .bookListInfo .info .authorName {
        padding-left: 0.1rem;
        color: #4c91bc;
        font-size: 0.26rem;
        line-height: 0.44rem;
    }

    .bookListInfo .info .authorTime {
        padding-left: 0.1rem;
        color: #ccc;
        font-size: 0.26rem;
        line-height: 0.44rem;

    }

    .bookListInfo .info .authorFlower {
        width: 0.44rem;
        height: 0.44rem;
        line-height: 0.44rem;
        justify-self: flex-end;
    }

    .bookListInfo .info .authorFlowerNum {
        color: #ccc;
        font-size: 0.26rem;
        line-height: 0.44rem;
        align-content: flex-end;
        padding-left: 0.05rem;
    }

    .books {
        background-color: #f5f5f5;
    }

    .bookInfo {
        background-color: #fff;
        margin-top: 0.25rem;
    }

    .bookInfo .desc {
        color:#333;
        font-size: 0.26rem;
        text-align: left;
        line-height: 1.5;
        padding: 0 0.28rem;
    }

    .bookInfo .opera {
        height: 0.8rem;
        width: 7.5rem;
        display: -webkit-flex;
        display: flex;
        justify-content: space-around;
        align-content: center;
        background-color: #f8fbff;
        margin-top: 0.3rem;
    }

    .bookInfo .opera img{
        width: 0.45rem;
        height: 0.45rem;
    }

    .bookInfo .opera p {
        font-size: 0.26rem;
        padding-left: 0.05rem;
    }

    .bookInfo .opera .like {
        /*justify-content: space-around;*/
    }
    .bookInfo .opera .dislike {
        /*margin-left: 1rem;*/
        /*justify-content: space-around;*/

    }
    .bookInfo .opera .addbookcase {
        /*margin-left: 1rem;*/
        /*justify-content: space-between;*/

    }

    .booklistRecomond {
        background-color: #fff;
        margin-top: 0.25rem;
    }

    .booklistRecomond .title {
        width: 7.2rem;
        margin-left: 0.28rem;
        height: 0.75rem;
        line-height: 0.75rem;
        color:#333;
        font-weight: 600;
        font-size: 0.30rem;
        text-align: left;
        border-bottom: 1px solid #e7e7e7;
    }
</style>