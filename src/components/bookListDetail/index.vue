<template>
    <div class="mybooklist">
        <div class="index-title">
            <indexTitle
                    :headLeft="{text:'返回', type:'word'}"
                    :headCenter="{text:'书单详情', type:'word'}"
                    :headRight="{text:'创建', type:'list', list:bookListDetail.info.isSelfCreate?listMy:list, opt:opt}">
            </indexTitle>
        </div>
        <div class="indexReco">
            <div style="height: calc(100vh - 1.20rem - 44px);">
                <loading :isLoadMore="true" :isRefresh="true" :onLoadMore="getBookListDetail"
                         :onRefresh="refreshDataBookListDetail">
                    <bookListInfo></bookListInfo>
                </loading>
            </div>
            <div>
                <authorInfo :isShowSmall="false"></authorInfo>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
	import indexTitle from '../common/title.vue';
	import bookListInfo from './bookListInfo.vue';
	import authorInfo from './authorInfo.vue';
	import loading from '../common/plug/loading.vue';

	export default {
		name: 'index',
		data() {
			return {
				listMy: [
					{name: '花束明细', func:'', funcParams:'', iconUrl: require('../../assets/image/icon_flowerlist_24x24.png')},
					{name: '编辑书单', func:'', funcParams:'', iconUrl: require('../../assets/image/icon_edit_1_24x24.png')},
					{name: '删除书单', func:'', funcParams:'', iconUrl: require('../../assets/image/icon_delete_1_24x24.png')},
					{name: '关于书单', func:'', funcParams:'',  iconUrl: require('../../assets/image/columnist_about_24x24.png'),},
				],

				list: [
					{name: '举报', func:'', funcParams:'',iconUrl: require('../../assets/image/icon_report_24x24.png')},
					{name: '关于书单', func:'', funcParams:'', iconUrl: require('../../assets/image/columnist_about_24x24.png')},
				],
			}
		},
		watch: {
			'$route'  (to, from) {
				if (to.name == 'bookListDetail') {

				}
			}
		},

		created() {
			this.$store.dispatch('booklist/getBookListDetail', {booklistId:this.$route.params.id}); //获取书单详情
            this.listMy[3].func = this.jumpTo;
            this.listMy[3].funcParams = {type: 'html', params: {url: this.bookListDetail.info.helpUrl, title: '关于书单'}};
			this.list[1] = this.listMy[3];
        },

		components: {
			indexTitle, bookListInfo, authorInfo, loading
		},
		computed: {
			...mapGetters('booklist', {
				opt: 'getCreateOpt',
				bookListDetail:'getterBookListDetail'
			}),
		},
		methods: {
			...mapActions('booklist', [
				'createBookList', 'refreshDataBookListDetail', 'getBookListDetail', 'initBookListDetail'
			]),
			jumpTo({type, params}) {
				this.$router.push({name: type, params: params})
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .mybooklist {
        height: 100%;
        overflow: hidden;
    }

    .index-title {
        top: 0;
        left: 0;
        width: 100vw;
        position: fixed;
        z-index: 1000;
    }

    .indexReco {
        margin-top: 44px;
        height: 100%;
        background-color: #f5f5f5;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
    }


</style>
