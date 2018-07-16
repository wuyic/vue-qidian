<template>
    <!--主页下拉刷新的导读页面， 上滑后取消-->
    <div class="bookCase">
        <div  v-if="!calcIsEmpty" style="height: 100%;">
            <Loading :isLoadMore="true" :onLoadMore="getMyCollectBookListA"
                     :isRefresh="true" :onRefresh="refreshData"
            >
                <div style="background-color: #eee">
                    <div class="myBookList">
                        <div v-for="(item, index) in getMyBookList.myCreate">
                            <bookListInfo :bookListInfo="item"  :isBottom="false" :type="'myBookList'"></bookListInfo>
                        </div>
                    </div>

                    <div class="myCollectBookList">
                        <div v-for="(item, index) in getMyCollectBookList.list">
                            <bookListInfo :bookListInfo="item"  :isBottom="true" :type="'myCollected'"></bookListInfo>
                        </div>
                    </div>
                </div>
                <div class="buttomBottom">
                    <div class="createBookListButton" :style="{borderColor: getColor,marginRight: '0.6rem', paddingRight: '0.1rem'}">
                        <img v-if="getColor=='#d43c33'" src="../../../assets/image/icon_mybooklist_add_16x16.png" alt="">
                        <img v-if="getColor!='#d43c33'" src="../../../assets/image/icon_shelf_addBooklist_16x16.png" alt="">
                        <p :style="{color:getColor}">创建书单</p>
                    </div>
                    <div class="createBookListButton" style="padding-left: 0.1rem;">
                        <p>关注书单</p>
                        <img src="../../../assets/image/icon_mybooklist_seemore_17x16.png" alt="">
                    </div>
                </div>
            </Loading>
        </div>

        <!--为空-->
        <div class="bookListNone" v-if="calcIsEmpty">
            <img class="noneImg" src="../../../assets/image/pic_collection_170x150.png" alt="" >
            <p class="tipWord">可在"发现／书单"中关注书单</p>
            <div class="buttomBottom">
                <div class="createBookListButton"
                     :style="{borderColor: getColor,marginRight: '0.6rem', paddingRight: '0.1rem'}">
                    <img v-if="getColor=='#d43c33'" src="../../../assets/image/icon_mybooklist_add_16x16.png" alt="">
                    <img v-if="getColor!='#d43c33'" src="../../../assets/image/icon_shelf_addBooklist_16x16.png" alt="">
                    <p :style="{color:getColor}">创建书单</p>
                </div>
                <div class="createBookListButton" style="padding-left: 0.1rem;">
                    <p>关注书单</p>
                    <img src="../../../assets/image/icon_mybooklist_seemore_17x16.png" alt="">
                </div>
            </div>
        </div>

    </div>
</template>
<script>
	/**
     * 我的书单
	 */
	import bookListInfo from '../../common/bookListInfo.vue'
    import Loading from '../../common/plug/loading.vue';
	import {mapGetters, mapActions, mapMutations} from 'vuex'

	export default {
		name: 'bookCase',
		data() {
			return {

			}
		},
        components: {
	        bookListInfo,Loading
        },

		created() {
			console.log(this.$store)
			//获取书单列表数据
			this.$store.dispatch('booklist/getMyBookList');
			this.$store.dispatch('booklist/getMyCollectBookListA');
		},

		computed: {
            ...mapGetters('booklist', [
            	'getMyBookList', 'getMyCollectBookList', 'getColor'
            ]),
            calcIsEmpty() {
            	console.log(this.getMyBookList.myCreate.length, this.getMyCollectBookList.list.length);
	            if (this.getMyBookList.myCreate.length == 0 && this.getMyCollectBookList.list.length == 0) {
	            	return true;
                }
                return false;
            }
		},

		methods: {
            ...mapActions('booklist', [
	            'getMyCollectBookListA', 'refreshData'
            ]),
		}


	}
</script>

<style>
    .bookCase {
        background-color: #eee;
        height: 100%;

    }

    .myCollectBookList {
        background-color: #fff;
    }

    .myBookList{
        background-color: #fff;
        margin-bottom: 0.2rem;
    }

    .buttomBottom {
        background-color: #fff;
        height: 1.2rem;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .createBookListButton {
        width: 1.7rem;
        height: 0.5rem;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #d43c33;
        border-radius: 0.25rem;
    }

    .createBookListButton p{
        font-size: 0.26rem;
        color:#d43c33;

    }
    .createBookListButton img{
        width: 0.32rem;
        height: 0.32rem;
    }

    .bookListNone {
        height: 100%;
        background-color: #fff;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .bookListNone .noneImg {
        width: 3rem;
        height: 3rem;
        margin-top: -3rem;
    }

    .bookListNone .tipWord {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;

        color: #e7e7e7;
    }


</style>
