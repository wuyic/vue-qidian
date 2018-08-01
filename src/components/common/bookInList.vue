<template>
    <div>
        <!--书籍列表信息-->
        <div :class="{ansBook:true, isBottom:isBottom}"  v-if="position != 'bookListDetail'">
            <div style="font-size: 0;flex-shrink: 0;">
                <img class="bookImage" :src='"https://qidian.qpic.cn/qdbimg/" + bookInfo.AuthorId + "/" + bookInfo.BookId + "/180"' alt="">
            </div>
            <div class="right">
                <p class="bookTitle"  v-html="dealAnsWord(bookInfo.BookName)"></p>
                <p class="description"  v-html="dealAnsWord(bookInfo.Description)"></p>
                <div class="descBottom">
                    <div class="userBox" >
                        <img class="userImg" src="../../assets/image/icon_loginaccount_24x24.png" alt="">
                        <p class="author" v-html="dealAnsWord(bookInfo.Author)"></p>
                    </div>
                    <div class="biaoqianBox">
                        <p class="biaoqian">{{bookInfo.CategoryName}}</p>
                        <p class="biaoqian">{{bookInfo.BookStatus}}</p>
                        <p class="biaoqian">{{Math.round(bookInfo.WordsCount/1000)/10}}万字</p>
                    </div>
                </div>
            </div>
        </div>

        <!--书单详情中的书籍缩略信息-->
        <div :class="{ansBook:true, isBottom:isBottom}"  v-if="position == 'bookListDetail'">
            <div style="font-size: 0;flex-shrink: 0;">
                <img class="bookImage" style="width: 1.1rem; height: 1.5rem" :src='"https://qidian.qpic.cn/qdbimg/349573/" + bookInfo.bookId + "/180"' alt="">
            </div>
            <div class="right" style="height: 1.5rem">
                <div class="bookTitleInfo">
                    <p class="bookTitle"  v-html="bookInfo.bookName"></p>
                    <p v-if="bookInfo.bookEditTimeDesc">{{bookInfo.bookEditTimeDesc}}</p>
                </div>
                <p class="description"  v-html="bookInfo.bookBriefWords"></p>
                <div class="descBottom">
                    <div class="userBox" >
                        <p class="author">{{bookInfo.bookAuthor}} · </p>
                        <p class="author">{{bookInfo.categoryName}} · </p>
                        <p class="author" v-html="dealNum(bookInfo.bssReadTotal)"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		props:["bookInfo", 'isBottom', 'position'],
		name: 'bookInList',
		data() {
			return {
//				data:console.log("isBottom = "+this.isBottom)
            }
		},

        computed:{
	        ...mapGetters({
		        dealAnsWord:'search/dealAnsWord'
	        }),

        },

		mounted() {
		},
		methods: {
			dealNum(num) {
				if (num >= 10000) {
					return Math.floor(num/10000) + '万人读过';
				} else {
					return Math.floor(num) + '人读过';

				}
			}
        },
	}
</script>

<style scoped>
    .ansBook{
        height: 2.1rem;
        display: -webkit-flex;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 0.3rem
    }

    .isBottom {
        border-bottom: 1px solid #e7e7e7;
    }

    .ansBook .bookImage{
        width: 1.25rem;
        height: 1.70rem;
    }

    .ansBook .right {
        height: 1.7rem;
        margin: 0 0.2rem;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .ansBook .bookTitle {
        font-size: 0.28rem;
        color:#333;
        text-align: left;
        height: 0.4rem;
        line-height: 0.4rem;

    }

    .ansBook .description {
        padding: 0.1rem 0;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-moz-box;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp: 2;
        color: #9a9a9a;
        font-size:0.24rem;
        text-align: left;


        height: 0.6rem;
        line-height: 0.35rem;
    }

    .ansBook .userBox {
        height: 0.4rem;
        width:50%;
        display: -webkit-flex;
        display: flex;
        align-items: center
    }

    .ansBook .descBottom {
        display: -webkit-flex;
        display: flex;
        /*justify-content: space-around;*/
    }

    .ansBook .userImg {
        width: 0.35rem;
        height: 0.35rem
    }

    .ansBook .author {
        padding-left: 0.05rem;
        color: #9a9a9a;
        font-size: 0.22rem;
        white-space: nowrap;
    }


    .ansBook .biaoqianBox {
        width: 50%;
        display: -webkit-flex;
        display: flex;
        align-items: right;
        justify-content: flex-end;
        -webkit-transform: scale(0.8);
        -moz-transform: scale(0.8);
        -ms-transform: scale(0.8);
        -o-transform: scale(0.8);
        transform-origin:right;

    }

    .ansBook .biaoqian {
        text-align: center;
        color: #5A86B3;
        /*height: 0.2rem;*/
        border: 1px solid #5A86B3;
        margin-right: 0.06rem;
        font-size: 0.06rem;
        padding: 0 0.04rem;
        border-radius: 3px;
        white-space: nowrap;
    }

    .bookTitleInfo {
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        align-content: center;
        font-size: 0.22rem;
        color:#9a9a9a;
    }
</style>