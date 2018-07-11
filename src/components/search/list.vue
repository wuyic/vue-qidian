<template>
    <!--主页下拉刷新的导读页面， 上滑后取消-->
    <div class="searchBody">
        <!--默认推荐栏-->
        <div class="recommond" v-if="pageState=='recommond'">
            <div class="hot">
                <div class="smallTitle">
                    <p class="word">热门搜索</p>
                    <p class="word" style="text-align: right" @click="changeSearchTops()">换一换</p>
                </div>
                <div class="smallBody">
                    <div v-for="(item, index) in topList" :class="{cell:true, colorRed:index<2}"
                         @click="searchByKeyWord({type:'all', item:item.LabelName})">
                        {{item.LabelName}}
                    </div>
                </div>
            </div>
            <div class="hotSearchRank">
                <img class="hotImg" src="../../assets/image/pic_hot_16x16.png" alt=""/>
                <p class="hotWord">热搜作品榜</p>
                <img class="hotImg" src="../../assets/image/QDCellDetail_24x24.png" alt=""/>
            </div>

            <div class="advertising">
                <div v-for="(value, index) in adList('search_home')"
                     :class="{advertCell:true, bottomW:index!=adList('search_home').length-1}">
                    <img :src="value.ADImage" alt="" class="advertImg"/>
                    <p class="advertWord">{{value.ADText}}</p>
                </div>
            </div>
        </div>
        <!--搜索历史-->
        <div class="searchHistory" v-if="pageState=='searchHistory'">
            <div class="historyCell" v-for="item in searchHistory" @click="searchByKeyWord({type:'all', item:item})">
                <img class="img" src="../../assets/image/search_history_24x24.png" alt="">
                <p class="word">{{item}}</p>
            </div>
            <div class="cleanHistoryBox" @click="cleanSearchHistory">
                <p class="cleanHistoryWord">清除搜索历史</p>
            </div>
        </div>
        <!--搜索提示-->
        <div class="searchTip" v-if="pageState=='searchTip'">
            <div class="body">
                <div class="tipCellMyBook" tips="myBookcase" v-for="(item, index) in searchTips.myBookcase"
                     v-if="showMyBookMore || !index"
                     @click="searchByKeyWord({type:'all'})">
                    <div class="mybookDiv">
                        <img :src='"https://qidian.qpic.cn/qdbimg/" + item.AuthorId + "/" + item.BookId + "/180"'
                             onError="this.src='../../assets/bookNoImg.png'" alt="">
                        <p>{{item.BookName}}</p>
                    </div>
                    <p class="clickRead">点击阅读</p>
                </div>
                <div class="tipCellMyBook" v-if="!showMyBookMore && searchTips.myBookcase.length>0"
                     @click="showMyBookMore=true">
                    <p class="mybookDivMore">更多书架作品({{searchTips.myBookcase.length}})</p>
                </div>

                <div class="tipCellBookList" tips="booklist" v-for="(item, index) in searchTips.booklist"
                     @click="searchByKeyWord({type:'all'})">
                    <div class="allImg">
                        <img class="bookImage1" :src='"https://qidian.qpic.cn/qdbimg/349573/" + item.ThreeBookIds[0] + "/180"' alt="">
                        <img class="bookImage2" :src='"https://qidian.qpic.cn/qdbimg/349573/" + item.ThreeBookIds[1] + "/180"' alt="">
                        <img class="bookImage3" :src='"https://qidian.qpic.cn/qdbimg/349573/" + item.ThreeBookIds[2] + "/180"' alt="">
                    </div>
                    <p class="wordName">{{item.Name || item.AuthorName || item.BookName}}</p>
                    <p class="wordTip">书单</p>
                </div>


                <div class="tipCell" v-for="(item, index) in searchTips.otherData"
                     @click="searchByKeyWord({type:'all'})">
                    <img v-if="item.Type=='book'" src="../../assets/image/icon_book_2_24x24.png" alt="">
                    <img v-if="item.Type=='user'" src="../../assets/image/icon_loginaccount_24x24.png" alt="">
                    <img v-if="item.Type==4" :src="item.OwnerIconUrl" alt="">
                    <p>{{item.Name || item.AuthorName || item.BookName}}</p>
                    <p class="wordTip" v-if="item.Type=='user'">作家</p>
                </div>
            </div>
            <div class="foot"    @click="searchByKeyWord({type:'all'})">
                <p >更多结果</p>
            </div>
        </div>


        <!--搜索结果-->
        <div class="searchAns" v-if="pageState=='searchAns'">
            <div class="ansTab">
                <div @click="change('book')"><p :class="{isSelected:bookOrBookList == 'book'}">作品</p></div>
                <div @click="change('booklist')"><p :class="{isSelected:bookOrBookList == 'booklist'}">书单</p></div>
            </div>
            <div class="ansBook" v-if="bookOrBookList == 'book'" @scroll="getMore('book',$event)">
                <div class="noneAns" v-if="calcIsEmpty('book')">
                    <img src="../../assets/image/slice_empty_170x170.png" alt="">
                    <p>暂无搜索结果</p>
                </div>
                <div v-for="item in searchResult.bookCardList" class="ansBookCardList">
                    <bookSearchAuthor v-if="item.CardType==3" :authorInfo="item.Info"></bookSearchAuthor>
                    <bookInList v-if="item.CardType==0" :bookInfo="item.Info"></bookInList>
                    <bookRecomond v-if="item.CardType==2" :bookInfo="item.Info"></bookRecomond>
                </div>
                <div v-for="(item, index) in searchResult.book" class="ansBookInfo">
                    <bookInList :bookInfo="item" :isBottom="true"></bookInList>
                </div>
                <loading></loading>
            </div>

            <div class="ansBookList" v-if="bookOrBookList == 'booklist'" @scroll="getMore('bookList',$event)">
                <div class="noneAns" v-if="calcIsEmpty('bookList')">
                    <img src="../../assets/image/slice_empty_170x170.png" alt="">
                    <p>暂无搜索结果</p>
                </div>
                <div v-for="item in searchResult.bookList">
                    <bookListInfo :bookListInfo="item" :isBottom="true" :type="'searchResult'"></bookListInfo>
                </div>
                <loading></loading>
            </div>


        </div>
    </div>
</template>
<script>

	import bookInList from '../common/bookInList.vue'
	import bookListInfo from '../common/bookListInfo.vue'
	import loading from '../common/loading.vue'
	import bookRecomond from './bookRecomond.vue'
	import bookSearchAuthor from './bookSearchAuthor.vue'
	import {mapGetters, mapActions, mapMutations} from 'vuex'

	export default {
		name: 'list',
		data() {
			return {
				jiying: '都市',
				bookOrBookList: 'book',
				showMyBookMore: false,
			}
		},
		components: {
			bookInList,   //搜索出的书籍
			bookListInfo, //搜索的书单
			bookRecomond, //搜索出得推荐
			bookSearchAuthor, //搜索出得作者
			loading,      //加载中
		},

		created() {
		},

		watch: {},

		computed: {
			...mapGetters({
				pageState: 'search/pageState',           //页面切换状态
				keyWord: 'search/getKeyWord',           //搜索关键词
				topList: 'search/searchTopsGetByIndex', //顶部热词
				adList: 'ad/getAdByRegx',               //广告 key = search_home
				searchHistory: 'search/getSearchHistory', //搜索历史
				searchTips: 'search/getSearchTips',     //搜索提示
				searchResult: 'search/getSearchResult',      //搜索结果
				dealAnsWord: 'search/dealAnsWord',
			}),
			getSearchTipsAll() {
				this.getSearchTips({});
			}

		},

		methods: {
			...mapActions('search', [
				'changeSearchTops',  //搜索热词 换一换
				'setSearchHistory',  //设置搜索历史
				'cleanSearchHistory',  //清空搜索历史
				'searchByKeyWord',
			]),

			change(type) {
				if (['booklist', 'book'].indexOf(type) != -1) {
					this.bookOrBookList = type;
				}
			},

			/**
			 *  加载更多
			 */
			getMore(type, obj) {
				obj = obj.currentTarget;
				let offset = obj.scrollTop;
				let viewHeight = obj.clientHeight;
				let allHeight = obj.scrollHeight;
				if (offset + viewHeight >= allHeight) {
					this.$store.dispatch('search/searchByKeyWord', {type: type});
				}
			},

			/**
			 * 计算 搜素结果是否为空
			 */
			calcIsEmpty(type) {
				return this.searchResult[type].length == 0;
			}
		}
	}
</script>

<style scoped>
    .recommond {
        background-color: #eee;
    }

    .recommond .hot {
        background-color: #fff;
        /*height: 2.3rem;*/
        width: 7.5rem;
    }

    .recommond .smallTitle {
        width: 6.9rem;
        height: 0.8rem;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 0.3rem;
    }

    .recommond .smallTitle .word {
        height: 0.8rem;
        width: 3rem;
        text-align: left;
        line-height: 0.8rem;
        color: #333;
        font-size: 0.28rem;
    }

    .recommond .smallBody {
        width: 6.9rem;
        padding: 0 0.3rem;

        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
    }

    .recommond .smallBody .cell {
        height: 0.55rem;
        line-height: 0.55rem;
        font-size: 0.28rem;
        border: 0.01rem solid #eee;
        border-radius: 0.225rem;
        padding: 0 0.2rem;
        margin: 0 0.1rem 0.2rem 0;
        color: #757575;
    }

    .recommond .smallBody .colorRed {
        color: #d43c33;
    }

    .recommond .hotSearchRank {
        background-color: #fff;
        height: 0.8rem;
        margin-top: 0.2rem;
        width: 6.9rem;
        padding: 0 0.3rem;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .hotSearchRank .hotWord {
        font-size: 0.28rem;
        padding-left: 0.2rem;
        flex: 1;
        text-align: left;
        color: #333
    }

    .hotSearchRank .hotImg {
        width: 0.5rem;
        height: 0.5rem;
    }

    .recommond .advertising {
        background-color: #fff;
        margin-top: 0.2rem;
        width: 7.2rem;
        padding: 0 0 0 0.3rem;
    }

    .advertising .advertCell {
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 1.35rem;
    }

    .advertising .bottomW {
        border-bottom: 0.02rem solid #e7e7e7;
    }

    .advertising .advertImg {
        width: 0.7rem;
        height: 0.7rem;
    }

    .advertising .advertWord {
        text-align: left;
        padding-left: 0.25rem;
        flex: 1;
        font-size: 0.28rem;
        color: #333;
    }

    .searchHistory {
        background-color: #fff;
    }

    .historyCell {
        height: 0.9rem;
        width: 7.2rem;
        margin-left: 0.3rem;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 0.01rem solid #e7e7e7;
    }

    .historyCell .img {
        width: 0.45rem;
        height: 0.45rem;
    }

    .historyCell .word {
        text-align: left;
        color: #434343;
        font-size: 0.28rem;
        padding-left: 0.2rem;
        white-space: nowrap;
        overflow: hidden;
    }

    .cleanHistoryBox {
        width: 7.5rem;
        height: 1rem;
    }

    .cleanHistoryWord {
        line-height: 1rem;
        font-size: 0.28rem;
        text-align: center;
        color: #4b8bb8;
    }

    .searchTip {
        width: 7.5rem;
        height: calc(100vh - 0.8rem);
        background-color: #fff;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .searchTip .body {
        flex: 1;
        height: calc(100% - 0.9rem);
    }

    .searchTip .body .tipCell {
        height: 0.9rem;
        width: 7.2rem;
        margin-left: 0.3rem;
        border-bottom: 0.01rem solid #e7e7e7;

        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .searchTip .body .tipCell img {
        width: 0.45rem;
        height: 0.45rem;
    }

    .searchTip .body .tipCell p {
        white-space: nowrap;
        overflow: hidden;
        padding-left: 0.2rem;
        text-align: left;
    }

    .searchTip .foot {
        height: 0.9rem;
        width: 7.5rem;
        background-color: #f7f7f7;
    }

    .searchTip .foot p {
        color: #333;
        font-size: 0.28rem;
        line-height: 0.9rem;
    }

    .searchTip .allImg {
        width: 0.55rem;
        height: 0.55rem;
        position: relative;
    }

    .searchTip .bookImage1 {
        width: 0.35rem;
        height: 0.45rem;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 22;
    }

    .searchTip .bookImage2 {
        width: 0.35rem;
        height: 0.55rem;
        position: absolute;
        left: 0.1rem;
        z-index: 33;
    }

    .searchTip .bookImage3 {
        width: 0.35rem;
        height: 0.45rem;
        position: absolute;
        z-index: 22;
        right: 0;
        bottom: 0;
    }

    .searchTip .clickRead {
        right: 0;
        height: 0.5rem;
        font-size: 0.25rem;
        color: #d43c33;
        border: 1px solid #d43c33;
        border-radius: 0.25rem;
        line-height: 0.5rem;
        padding: 0 0.2rem;
        text-align: center;
        justify-self: flex-end;
        margin-right: 0.3rem;
    }

    .searchTip .tipCellMyBook {
        height: 0.9rem;
        width: 7.2rem;
        margin-left: 0.3rem;
        border-bottom: 0.01rem solid #e7e7e7;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .searchTip .tipCellMyBook .mybookDiv {
        height: 0.9rem;
        width: 50%;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .searchTip .tipCellMyBook .mybookDiv p {
        padding: 0.2rem;
        margin-right: 0.3rem;
    }

    .searchTip .tipCellMyBook .mybookDiv img {
        width: 0.45rem;
    }

    .searchTip .tipCellMyBook .mybookDivMore {
        color: #d43c33;
        font-size: 0.26rem;
        width: 6.9rem;
    }

    .searchTip  .tipCellBookList {
        height: 0.9rem;
        width: 7.2rem;
        margin-left: 0.3rem;
        border-bottom: 0.01rem solid #e7e7e7;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .searchTip  .tipCellBookList .wordName{
        padding-left: 0.1rem;
    }

    .searchTip  .wordTip{
        padding-left: 0.1rem;
        color:#757575;
    }


    .searchAns {
        height: calc(100vh - 40px);
        display: flex;
        flex-direction: column;
        background-color: #eee;
    }

    .searchAns .ansTab {
        width: 7.5rem;
        height: 0.8rem;
        border-bottom: 0.02rem solid #e7e7e7;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
    }

    .searchAns .ansTab div {
        width: 50%;
        font-size: 0.28rem;
        color: #333;
    }

    .searchAns .ansTab div p {
        width: 1rem;
        height: 0.8rem;
        line-height: 0.8rem;
        margin: 0 auto;
    }

    .searchAns .ansTab .isSelected {
        color: #d43c33;
        border-bottom: 0.04rem solid #d43c33;
    }

    .searchAns .ansBook {
        /*width: 7.5rem;*/
        flex: 1;
        overflow: auto;
    }

    .searchAns .ansBookInfo {
        background-color: #FFF;
    }

    .searchAns .ansBookCardList {
        background-color: #FFF;
        margin-bottom: 0.2rem;
    }

    .searchAns .ansBookList {
        flex: 1;
        overflow: auto;
        background-color: #fff;
    }

    .searchAns .noneAns {
        background-color: #fff;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
    }

    .searchAns .noneAns img {
        width: 3rem;
        height: 3rem;
        margin-top: -3rem;
    }

    .searchAns .noneAns p {
        font-size: 0.28rem;
        color: #757575;
    }


</style>
