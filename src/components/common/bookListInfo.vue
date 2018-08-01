<template>
    <div>
        <!--搜索结果里的书单列表数据-->
        <div :class="{searchResult:true,isBottom:isBottom}" v-if="type=='searchResult'">
            <div class="allImg">
                <img class="bookImage1"
                     :src='calcImage(bookListInfo.ThreeBookIds, 0)'
                     onError="this.src=require('../../assets/image/QDDefaultNoBookImage_white_48x64.png')" alt="">
                <img class="bookImage2"
                     :src='calcImage(bookListInfo.ThreeBookIds, 0)'
                     onError="this.src=require('../../assets/image/QDDefaultNoBookImage_white_48x64.png')" alt="">
                <img class="bookImage3"
                     :src='calcImage(bookListInfo.ThreeBookIds, 0)'
                     onError="this.src=require('../../assets/image/QDDefaultNoBookImage_white_48x64.png')" alt="">
            </div>
            <div class="right">
                <div class="bookTitleBox">
                    <p class="bookTitle" v-html="dealAnsWord(bookListInfo.Name)"></p>
                    <div class="bookTips" :style="{backgroundColor:getColor(bookListInfo.Type)}">
                        {{bookListInfo.Label}}
                    </div>
                </div>
                <p class="description" v-html="dealAnsWord(bookListInfo.Des)"></p>
                <div class="descBottom">
                    <div class="userBox">
                        <img class="userImg" :src="bookListInfo.OwnerIconUrl" alt="">
                        <p class="author" v-html="dealAnsWord(bookListInfo.OwnerName)"></p>
                        <p class="author">{{bookListInfo.BookCount}}本 · {{bookListInfo.CollectCount}}关注</p>
                    </div>
                </div>
            </div>
        </div>

        <!--书单详情里的推荐列表-->
        <div :class="{searchResult:true,isBottom:isBottom}" v-if="type=='bookListRecomond'">
            <div class="allImg">
                <img class="bookImage1"
                     :src='calcImage(bookListInfo.imgUrls, 0, "imgUrl")'
                     onError="this.src=require('../../assets/image/QDDefaultNoBookImage_white_48x64.png')" alt="">
                <img class="bookImage2"
                     :src='calcImage(bookListInfo.imgUrls, 1, "imgUrl")'
                     onError="this.src=require('../../assets/image/QDDefaultNoBookImage_white_48x64.png')" alt="">
                <img class="bookImage3"
                     :src='calcImage(bookListInfo.imgUrls, 2, "imgUrl")'
                     onError="this.src=require('../../assets/image/QDDefaultNoBookImage_white_48x64.png')" alt="">
            </div>
            <div class="right">
                <div class="bookTitleBox">
                    <p class="bookTitle" v-html="dealAnsWord(bookListInfo.name)"></p>
                    <div class="bookTips" :style="{backgroundColor:getColor(bookListInfo.bookListTypeId)}">
                        {{bookListInfo.bookListType}}
                    </div>
                </div>
                <p class="description" v-html="dealAnsWord(bookListInfo.des)"></p>
                <div class="descBottom">
                    <div class="userBox">
                        <img class="userImg" :src="bookListInfo.authorHeadImg" alt="">
                        <p class="author" v-html="dealAnsWord(bookListInfo.authorName)"></p>
                        <p class="author">{{bookListInfo.bookCount}}本 · {{bookListInfo.collectCount}}关注</p>
                    </div>
                </div>
            </div>
        </div>

        <!--我的收藏里的书单数据-->
        <div :class="{myCollected:true,isBottom:isBottom}" v-if="type=='myCollected' || type=='myBookList'">
            <div class="allImg">
                <img class="bookImage1 shadowB"
                     :src='calcImage(bookListInfo.imgUrls, 0, "imgUrl")'
                     onError="this.src=require('../../assets/image/QDDefaultNoBookImage_white_48x64.png')" alt="">
                <img class="bookImage2 shadowB"
                     :src='calcImage(bookListInfo.imgUrls, 1, "imgUrl")'
                     onError="this.src=require('../../assets/image/QDDefaultNoBookImage_white_48x64.png')" alt="">
                <img class="bookImage3 shadowB"
                     :src='calcImage(bookListInfo.imgUrls, 2, "imgUrl")'
                     onError="this.src=require('../../assets/image/QDDefaultNoBookImage_white_48x64.png')" alt="">
            </div>
            <div class="right">
                <div class="bookTitleBox">
                    <p class="bookTitle">{{bookListInfo.name}}</p>
                    <div class="bookTips"  v-if="type=='myCollected'" >{{bookListInfo.bookEditTimeDesc}}</div>
                </div>
                <p class="description" v-if="type=='myCollected'">{{bookListInfo.authorName}}</p>
                <div class="descBottom">
                    <div class="userBox">
                        <p class="author" style="padding-left: 0"> {{bookListInfo.bookCount}}本 · {{bookListInfo.collectCount}}关注</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	//书单列表 单项
	import {mapGetters} from 'vuex';

	export default {
		props: ["bookListInfo", 'isBottom', 'type',],
		name: 'bookListInfo',

		computed: {
			...mapGetters({
				dealAnsWord: 'search/dealAnsWord'
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
			},

			calcImage(array, num, type) {
				let baseUrl = "https://qidian.qpic.cn/qdbimg/349573/bookId/180";

				if (array.length > num) {
					if (type) {
						return baseUrl.replace('bookId', array[num][type]);
					} else {
						return baseUrl.replace('bookId', array[num]);
					}
				} else {
					return require('../../assets/image/QDDefaultNoBookImage_white_48x64.png')
				}
			}
		},
	}
</script>

<style scoped>
    .searchResult {
        height: 2.1rem;
        display: -webkit-flex;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 0.3rem;
        background-color: #fff;
    }

    .myCollected {
        height: 1.6rem;
        display: -webkit-flex;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 0.3rem;
        background-color: #fff;
    }

    .searchResult .allImg {
        width: 1.3rem;
        height: 1.3rem;
        position: relative;
    }

    .myCollected .allImg {
        width: 1.2rem;
        height: 1.2rem;
        position: relative;
    }

    .isBottom {
        border-bottom: 1px solid #e7e7e7;
    }

    .searchResult .bookImage1 {
        width: 0.84rem;
        height: 1.12rem;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 22;
    }

    .searchResult .bookImage2 {
        width: 0.94rem;
        height: 1.3rem;
        position: absolute;
        left: 0.18rem;
        z-index: 33;
    }

    .searchResult .bookImage3 {
        width: 0.84rem;
        height: 1.12rem;
        position: absolute;
        z-index: 22;
        right: 0;
        bottom: 0;
    }

    .myCollected .bookImage1 {
        width: 0.76rem;
        height: 1.02rem;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 22;
    }

    .myCollected .bookImage2 {
        width: 0.9rem;
        height: 1.2rem;
        position: absolute;
        left: 0.15rem;
        z-index: 33;
    }

    .myCollected .bookImage3 {
        width: 0.76rem;
        height: 1.02rem;
        position: absolute;
        z-index: 22;
        right: 0;
        bottom: 0;
    }

    .right {
        width: 5.7rem;
        height: 1.2rem;
        margin-left: 0.2rem;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .searchResult .right {
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

    .myCollected .bookTitleBox {
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .searchResult .bookTitle {
        font-size: 0.28rem;
        color: #333;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
    }

    .myCollected  .bookTitle {
        font-size: 0.28rem;
        color: #333;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .searchResult .bookTips {
        width: 1.375rem;
        height: 0.46rem;
        line-height: 0.46rem;
        color:#fff;
        font-size: 0.12rem;
        transform: scale(0.9);
        transform-origin: right;
        white-space: nowrap;
        text-align: center;
    }

    .myCollected .bookTips {
        height: 0.34rem;
        line-height: 0.34rem;
        color: #d43c33;
        font-size: 0.12rem;
        padding: 0 0.1rem;
        border: 1px solid #d43c33;
        border-radius: 0.17rem;
        transform: scale(0.9);
        transform-origin: right;
        white-space: nowrap;
        margin-right: 0.3rem;
    }

    .description {
        /*height: 0.8rem;*/
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        color: #9a9a9a;
        font-size: 0.24rem;
        text-align: left;
        margin-right: 0.2rem;
        line-height: 0.3rem;
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
        transform-origin: right;
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


    .shadowB {
        -moz-box-shadow:0 1px 1px 1px #eee;
        -webkit-box-shadow:0 1px 1px 1px #eee;
        box-shadow:0 1px 1px 1px #eee;
    }

</style>