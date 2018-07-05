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
                     :class="{adCell:true, bottomW:index!=adList('search_home').length-1}">
                    <img :src="value.ADImage" alt="" class="adImg"/>
                    <p class="adWord">{{value.ADText}}</p>
                </div>
            </div>
        </div>

        <div class="searchHistory" v-if="pageState=='searchHistory'">
            <div class="historyCell" v-for="item in searchHistory" @click="searchByKeyWord({type:'all', item:item})">
                <img class="img" src="../../assets/image/search_history_24x24.png" alt="">
                <p class="word">{{item}}</p>
            </div>
            <div class="cleanHistoryBox" @click="cleanSearchHistory">
                <p class="cleanHistoryWord">清除搜索历史</p>
            </div>
        </div>

        <div class="searchTip" v-if="pageState=='searchTip'">
            <div class="body">
                <div class="tipCell" v-for="(item, index) in searchTips" @click="searchByKeyWord({type:'all', item:item.Name || item.AuthorName || item.BookName})">
                    <img v-if="item.Type=='book'" src="../../assets/image/icon_book_2_24x24.png" alt="">
                    <img v-if="item.Type=='user'" src="../../assets/image/icon_loginaccount_24x24.png" alt="">
                    <img v-if="item.Type==4" :src="item.OwnerIconUrl" alt="">
                    <p>{{item.Name || item.AuthorName || item.BookName}}</p>
                </div>
            </div>
            <div class="foot">
                <p>更多结果</p>
            </div>
        </div>
        <div class="searchAns" v-if="pageState=='searchAns'">
            <div class="ansTab">
                <div><p>作品</p></div>
                <div><p>书单</p></div>
            </div>
            <div class="ansList">
                <bookInList :bookInfo="data"></bookInList>
                <!--<div class="ansBookList">-->
                    <!--<img src="" alt="">-->
                    <!--<div>-->
                        <!--p-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</template>
<script>
	import bookInList from '../common/bookInList.vue'
	import {mapGetters, mapActions, mapMutations} from 'vuex'

	export default {
		name: 'list',
		data() {
			return {
				jiying: '都市',
				data: {
					Adid: 0,
					AlgInfo: "",
					Author: "江南",
					AuthorId: 0,
					AuthorTagId: "3",
					BookId: 1011945842,
					BookInternalId: 6748888,
					BookName: "龙族（1-4合集）",
					BookStatus: "完本",
					BssReadTotal: 3718848,
					BssRecomTotal: 9140,
					CategoryId: 14306,
					CategoryName: "青春文学",
					CmId: 0,
					Description: "累计销售量达千万册的青春幻想小说，被誉为“东方的《哈利·波特》”，作者江南本人获得2013年中国作家富豪榜榜首的荣誉。主角路明非原本只是一个普通的高中生，在申请留学的时候收到了来自屠龙学院——卡塞尔学院的来信，从此开启了他不平凡的人生，在伙伴陈墨瞳、楚子航、恺撒等人的帮助下，属于龙族的神秘世界逐渐在他们面前展开，路明非神秘莫测的身世也慢慢浮出水面。",
					EnableBookUnitBuy: 0,
					EnableBookUnitLease: 0,
                    ImageStatus: 1,
                    IsVip: 1,
					Label: "3",
					LastChapterUpdateTime: 1526283050000,
					LastUpdateChapterID: 406594640,
					LastUpdateChapterName: "第419章 尾声",
					LastVipChapterUpdateTime: 1526283050000,
					LastVipUpdateChapterId: 406595049,
					LastVipUpdateChapterName: "第419章 尾声",
					ReadingType: 5,
					SourceDesc: null,
					SourceType: 0,
					WordsCount: 2090264,
					overrating: null,
					prob: 0,
					recommendRate: null,
					staticscore1: 500000,
					subCategoryName: "玄幻/新武侠/魔幻/科幻"
				}
			}
		},
		components: {
			bookInList
		},

		created() {
			console.log()
		},

		watch: {
		},

		computed: {
			...mapGetters({
                pageState:'search/pageState',           //页面切换状态
				keyWord: 'search/getKeyWord',           //搜索关键词
				topList: 'search/searchTopsGetByIndex', //顶部热词
				adList: 'ad/getAdByRegx',              //广告 key = search_home
				searchHistory: 'search/getSearchHistory', //搜索历史
				searchTips: 'search/getSearchTips', //搜索历史
			}),
		},

		methods: {
			...mapActions('search', [
				'changeSearchTops',  //搜索热词 换一换
				'setSearchHistory',  //设置搜索历史
				'cleanSearchHistory',  //清空搜索历史
                'searchByKeyWord',
			]),
		}
	}
</script>

<style>
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

    .advertising .adCell {
        display: -webkit-flex;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 1.35rem;
    }

    .advertising .bottomW {
        border-bottom: 0.02rem solid #e7e7e7;
    }

    .advertising .adImg {
        width: 0.7rem;
        height: 0.7rem;
    }

    .advertising .adWord {
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

    .searchAns {
        background-color: #fff;
    }

    .searchAns .ansTab {
        width: 7.5rem;
        height: 0.8rem;
        border-bottom: 0.02rem solid #e7e7e7;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
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

    .searchAns .ansList {
        width: 7.2rem;
        margin-left: 0.3rem;
    }


</style>
