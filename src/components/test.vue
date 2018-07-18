<template>
    <div>
        <div class="index-title">
            <indexTitle></indexTitle>
        </div>
        <div class="index-reco">
            <Loading :isLoadMore="true" :onLoadMore="getMyCollectBookListA">
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
            </Loading>
        </div>

        <Toast :type="'toastBox'" :position="'bottom'">
            <div class="buttomBottom" style="background-color: #fff">
                <div class="createBookListButton" :style="{borderColor: getColor,marginRight: '0.6rem', paddingRight: '0.1rem'}">
                    <img v-if="getColor=='#d43c33'" src="../assets/image/icon_mybooklist_add_16x16.png" alt="">
                    <img v-if="getColor!='#d43c33'" src="../assets/image/icon_shelf_addBooklist_16x16.png" alt="">
                    <p :style="{color:getColor}">创建书单</p>
                </div>
                <div class="createBookListButton" style="padding-left: 0.1rem;">
                    <p>关注书单</p>
                    <img src="../assets/image/icon_mybooklist_seemore_17x16.png" alt="">
                </div>
            </div>
        </Toast>
    </div>
</template>

<script>
	import bookListInfo from './common/bookListInfo.vue'
	import {mapGetters, mapActions, mapMutations} from 'vuex'
	import {mapState} from 'vuex'
	import indexTitle from './index/index/title.vue';
	import Loading from './common/plug/loading.vue';
	import Toast from './common/plug/Toast.vue';

	export default {
		name: 'index',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
                data:[1,2,3,4,5,6,7,8,9,10,11,11,1,1,12,12]
			}
		},

        mounted() {
			this.$refs.toast.toastText({text:'123', timeout:1500});
        },

		created() {
			console.log(this.$store)
			//获取书单列表数据
//			this.$store.dispatch('booklist/getMyBookList');
//			this.$store.dispatch('booklist/getMyCollectBookListA');
		},


		components: {
			indexTitle: indexTitle,Loading,bookListInfo,Toast
//			recommendRead: recommendRead,
//			bookCase: bookCase
		},


		computed: {
			...mapGetters('booklist', [
				'getMyBookList', 'getMyCollectBookList', 'getColor'
			]),
		},

		methods: {
			...mapActions('booklist', [
				'getMyCollectBookListA'
			]),


		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


    .index-title {
        top: 0;
        left: 0;
        width: 100vw;
        position: fixed;
        z-index: 1000;
    }

    .index-reco {
        margin-top: 40px;
        height: calc(100vh - 40px);
    }

    .index-bookcase {
        width: 100vw;

    }
</style>
