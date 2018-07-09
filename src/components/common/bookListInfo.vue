<template>
    <div :class="{ansBookList:true,isBottom:isBottom}">
        <div class="allImg">
            <!--<img class="bookImage" :src='"https://qidian.qpic.cn/qdbimg/" + bookInfo.AuthorId + "/" + bookInfo.BookId + "/180"' alt="">-->
            <img class="bookImage1" :src='"https://qidian.qpic.cn/qdbimg/349573/" + bookListInfo.ThreeBookIds[0] + "/180"' alt="">
            <img class="bookImage2" :src='"https://qidian.qpic.cn/qdbimg/349573/" + bookListInfo.ThreeBookIds[1] + "/180"' alt="">
            <img class="bookImage3" :src='"https://qidian.qpic.cn/qdbimg/349573/" + bookListInfo.ThreeBookIds[2] + "/180"' alt="">
        </div>
        <div class="right">
            <div class="bookTitleBox">
                <p class="bookTitle" v-html="dealAnsWord(bookListInfo.Name)"></p>
                <div class="bookTips" :style="{backgroundColor:getColor(bookListInfo.Type)}" >{{bookListInfo.Label}}</div>
            </div>
            <p class="description"  v-html="dealAnsWord(bookListInfo.Des)"></p>
            <div class="descBottom">
                <div class="userBox" >
                    <img class="userImg" :src="bookListInfo.OwnerIconUrl" alt="">
                    <p class="author" v-html="dealAnsWord(bookListInfo.OwnerName)"></p>
                    <p class="author">{{bookListInfo.BookCount}}本 · {{bookListInfo.CollectCount}}关注</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		props:["bookListInfo", 'isBottom'],
		name: 'bookListInfo',
//		data() {
//			return {
//				bookListInfo: {
//					BookCount: 100,
//					CollectCount: 15651,
//					Des: "我不喜欢说废话，喜欢简短有力的书评。如果喜欢本书单，想淘到好书，请收藏(点亮下方的五角星)！！！",
//					Id: 357212,
//					Label: "超⛄精选",
//					Name: "⚡火爆精品⛽绝世好书⛵极品神作⛲爽文宅文⛳斗破苍穹",
//					OwnerIconUrl: "https://qidian.qpic.cn/qd_face/349573/5108227/100",
//					OwnerName: "龙尤天",
//					OwnerUserId: 3308835,
//					ThreeBookIds: [1012285292,1010770545,1005394024],
//			        Type: 100
//                }
//            }
//		},

		computed:{
			...mapGetters({
				dealAnsWord:'search/dealAnsWord'
			}),

		},

		mounted() {

		},
		methods: {
			getColor(type) {
				let color = ['#ffbb40', '#ffbb40', '#e66a68', '#61a7f8', '#63c860', '#9c7cdf'];
				if (color[type]) {
					return color[type];
				}
				return color[2];
			}
        },
	}
</script>

<style scoped>
    .ansBookList {
        height: 2.1rem;
        display: -webkit-flex;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 0.3rem;
        background-color:#fff;
    }

    .allImg {
        width: 1.3rem;
        height: 1.3rem;
        position: relative;
    }

    .isBottom {
        border-bottom: 1px solid #e7e7e7;
    }

     .bookImage1{
        width: 0.84rem;
        height: 1.12rem;
        position: absolute;
        left:0;
        bottom:0;
        z-index:22;
    }
     .bookImage2{
        width: 0.94rem;
        height: 1.3rem;
        position: absolute;
        left:0.18rem;
        z-index: 33;
    }
     .bookImage3{
        width: 0.84rem;
        height: 1.12rem;
        position: absolute;
        z-index:22;
        right:0;
        bottom:0;
    }

     .right {
        width: 5.7rem;
        height: 1.7rem;
        margin-left: 0.2rem;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .bookTitleBox {
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .bookTitle {
        font-size: 0.28rem;
        color:#333;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex:1;
    }

    .bookTips {
        width: 1.1rem;
        height: 0.4rem;
        color:#fff;
        font-size: 0.12rem;
        padding: 0 0.1rem;
        margin-left: 0.2rem;
    }

     .description {
        /*height: 0.8rem;*/
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        color: #9a9a9a;
        font-size:0.24rem;
        text-align: left;
        margin-right: 0.2rem;
    }

     .userBox {
        /*width:50%;*/
        display: -webkit-flex;
        display: flex;
        align-items: center;
    }

     .descBottom {
        display: -webkit-flex;
        display: flex;
        /*justify-content: space-around;*/
    }

     .userImg {
        width: 0.40rem;
        height: 0.40rem;
        border-radius: 0.2rem;
    }

     .author {
        padding-left: 0.1rem;
        color: #9a9a9a;
        font-size: 0.22rem;
    }




     .biaoqianBox {
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

     .biaoqian {
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