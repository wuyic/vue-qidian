<template>
    <div :class="{ansBook:true, isBottom:isBottom}">
        <div>
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
                    <p class="biaoqian">玄幻</p>
                    <p class="biaoqian">{{bookInfo.BookStatus}}</p>
                    <p class="biaoqian">97.1万字</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		props:["bookInfo", 'isBottom'],
		name: 'bookInList',
		data() {
			return {
//				data:console.log("isBottom = "+this.isBottom)
            }
		},

        computed:{
	        ...mapGetters({
		        dealAnsWord:'search/dealAnsWord'
	        })
        },

		mounted() {

		},
		methods: {},
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
    }

    .ansBook .description {
        /*height: 0.8rem;*/
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        color: #9a9a9a;
        font-size:0.24rem;
        text-align: left;
    }

    .ansBook .userBox {
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
    }
</style>