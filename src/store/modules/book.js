import api from '../../api/api'
import Vue from 'vue'
import {BookCase} from '../class/bookCase'
import {bookSmallType} from '../../api/data'

const state = {

	userId:'188378520',
	bookId: 1003580078,

	showMoreDesc: false,
	showMoreDescHeight: '1.2rem',

	/**
	 * 详情
	 * @type {{}}
	 */
	bookDetail: {
		CategoryPicture: null,
		BookName: '',
		AuthorName: '',
		AuthorLevel: '',
		BookStar: 0,
		BssReadTotal: 0,
		AuthorInfo: {},
	},

	/**
	 * 广告
	 * @type {{}}
	 */
	bookAd: {},

	/**
	 * 荣誉
	 * @type {{}}
	 */
	bookHonors: {},

	/**
	 * 详情
	 * @type {{}}
	 */
	nonAnony: {},

	/**
	 * 推荐票
	 */
	RecomTicket: {},

	/**
	 * 月票
	 */
	MonthTicket: {},

	/**
	 * 打赏
	 */
	Donate: {},

	/**
	 * 纵览
	 */
	Review: {},

	/**
	 * 折扣
	 */
	discount: {},

	/**
	 * 书评
	 */
	bookReview: {},

	/**
	 * 相关书单
	 */
	relationBookList: {
		list: [],
		allCount: [],
	},

	/**
	 * 书籍粉丝
	 */
	bookFans: {
		pageIndex: 1,
		pageCount: 20,
		list: [],
		mineInBook: {},
		mengzhuInfo: [],
		rank4:[],
		isOver:false,
		donateType:'Gold', //'Gold', 'Silver', 'FirstFans', 'VoteSetter'
	},

};

const mutations = {
	/**
	 *  初始化书籍详情
	 */
	initBookDetail(state, bookId) {
		if (bookId) {
			state.bookId = bookId;
		}
	},

	/**
	 *
	 */
	bookDetailChangeMoreDesc(state) {
		if (state.bookDetail.showMoreDesc) {
			state.bookDetail.showMoreDescHeight = '1.2rem';
		} else {
			state.bookDetail.showMoreDescHeight = 'none';
		}
		state.bookDetail.showMoreDesc = !state.bookDetail.showMoreDesc;
	},


	/**
	 * 设置粉丝列表
	 * @param state
	 * @param bookcase
	 */
	setBookList(state, {list, isNew}) {
		if (isNew) {
			state.bookFans.list = [...list];
		} else {
			state.bookFans.list = [...state.bookFans.list, ...list];
		}
	},

	/**
	 * 设置粉丝信息 mengzhuInfo
	 */
	setFansInfoMengZhuDonateInfo(state, {data}) {
		state.bookFans.mengzhuInfo = data;
	},
	/**
	 * 设置粉丝信息
	 */
	setFansInfoRankTop4(state, {list}) {
		state.bookFans.rank4 = [...list];
	},
	/**
	 * 设置粉丝信息 MineInBook
	 */
	setFansInfoMineInBook(state, {data}) {
		state.bookFans.mineInBook = data;
	},
	/**
	 * 设置头部4块 点击类型
	 */
	setFansInfoDonateType(state, type) {
		if (['Gold', 'Silver', 'FirstFans', 'VoteSetter'].indexOf(type) != -1) {
			state.bookFans.donateType = type;
		}
	},
};

/**
 * Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。
 * 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
 *
 * 如何调用？
 * 1。
 *  store.getters.getTodoById(2)
 * 2。
 * mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
 *
 * @type {{}}
 */
const getters = {

	/**
	 * 书籍详情
	 * @param state
	 * @returns {{}}
	 */
	getterBookDetail(state) {
		return state.bookDetail;
	},

	/**
	 * 是否全部显示书籍详情页的描述
	 * @param state
	 * @returns {{more: boolean, height: string}}
	 */
	getterBookDetailShowMoreDesc(state) {
		return {
			more: state.bookDetail.showMoreDesc,
			height: state.bookDetail.showMoreDescHeight
		};
	},


	/**
	 * 获取相关书籍
	 * @param state
	 * @returns {state.relationBookList|{list, allCount}}
	 */
	getRelationBookList(state) {
		return state.relationBookList;
	},

	/**
	 * 获取粉丝详情
	 */
	getterBookFansInfo(state) {
		return state.bookFans;
	},

	/**
	 * 获取顶部信息栏 4个 榜首
	 */
	getterFourRankTop(state) {
		let fourList = [
			{
			type:'Gold',
			fontColor:'#ffbb05',
			isHave:false,
			name:'虚位以待',
			img:require('../../assets/image/icon_fansVacancy_Gold.png'),
			nameImg:require('../../assets/image/speciallabel_1.png'),
		},{
			type:'Silver',
			fontColor:'#aacbdf',
			isHave:false,
			name:'虚位以待',
			img:require('../../assets/image/icon_fansVacancy_Silver.png'),
			nameImg:require('../../assets/image/speciallabel_2.png'),
		},{
			type:'FirstFans',
			fontColor:'#c4c4c4',
			isHave:false,
			name:'虚位以待提队友机制直径',
			img:require('../../assets/image/icon_fansVacancy_Others.png'),
			nameImg:require('../../assets/image/speciallabel_3.png'),
		},{
			fontColor:'#c4c4c4',
			isHave:false,
			name:'虚位以待',
			img:require('../../assets/image/icon_fansVacancy_Others.png'),
			nameImg:require('../../assets/image/speciallabel_4.png'),
		},{
			type:'VoteSetter',
			fontColor:'#c4c4c4',
			isHave:false,
			name:'虚位以待',
			img:require('../../assets/image/icon_fansVacancy_Others.png'),
			nameImg:require('../../assets/image/speciallabel_5.png'),
		}];
		state.bookFans.rank4.forEach((item, index) => {
			fourList[item.FameType-1].isHave = true;
			fourList[item.FameType-1].name = item.NickName;
			fourList[item.FameType-1].UserId = item.UserId;
			fourList[item.FameType-1].Amount = item.Amount;
			fourList[item.FameType-1].img = item.ImageUrl;
			fourList[item.FameType-1].fontColor = '#4d4d4d';
		});
		return [...fourList];

	},

	/**
	 * 设置头部4块 点击类型 下表
	 */
	setFansInfoDonateInfoByType(state) {
		let type = state.bookFans.donateType;
		let base = state.bookFans.mengzhuInfo;
		console.log('base',base, type+'Name', type,  state.bookFans);
		let info = {
			typeName: base[type+'Amount'] ? '打赏《' + state.bookDetail.BookName + '》' :
				type == 'FirstFans' ? '第一粉丝' : '票王',
			name:base[type+'Name'],
			amount:base[type+'Amount'],
			message:base[type+'Message'] || 0,
			bookName:state.bookDetail.BookName,
			bookId:state.bookId,
		};
		return info;
	}

};

/**
 * Action 类似于 mutation，不同在于：
 Action 提交的是 mutation，而不是直接变更状态。
 Action 可以包含任意异步操作。

 如何使用？
 Action 通过 store.dispatch 方法触发：
 * @type {{}}
 */
const actions = {
		/**
		 * 获取书籍详细信息
		 */
		getBookDetail({state, commit, rootState}, {bookId}) {
			if (bookId) {
				commit('initBookDetail', bookId);

				api.BookGet({bookId: bookId}).then(
					data => {
						console.log('获取书籍信息成功', data);
						if (!data.data.Result) {
							state.bookDetail = data.data.Data;
						}
					}
				);
				api.BookGetBookAd({bookId: bookId}).then(
					data => {
						console.log('获取书籍广告成功', data);
					}
				);
				api.BookGetBookDiscount({bookId: bookId, isFreeUser: 0}).then(
					data => {
						console.log('获取书籍折扣成功', data);
					}
				);
				api.BookListGetRelation({bookId: bookId}).then(
					data => {
						console.log('获取相关书单成功', data);
						if (!data.data.Result) {
							let list = state.relationBookList.list = [...data.data.Data];
							data.data.Data.forEach((item, index) => {
								Vue.set(list[index], 'isShowMoreDesc', false);
								Vue.set(list[index], 'changeShowMoreDesc', function () {
									this.isShowMoreDesc = !this.isShowMoreDesc;
								});
							});
							state.relationBookList.allCount = data.data.count;
						}
					}
				);

				console.log('state', state)
			}
		},

		/**
		 * 获取书籍粉丝列表
		 */
		getBookFansList({state, commit, rootState, dispatch}, bookId) {

			commit('initBookDetail', bookId || 0);

			!state.bookFans.isOver && state.bookFans.pageIndex > 1 && commit('loading/setShowBottom', true, {root: true});
			!state.bookFans.isOver && api.BookStoreGetBookFansList({bookId: state.bookId, pageIndex: state.bookFans.pageIndex}).then(
				data => {
					console.log('获取书籍粉丝列表成功', data);
					if (data.data.Result == 0) {
						commit('setBookList', {list:data.data.Data||[], isNew:state.bookFans.pageIndex==1})
						data.data.Data && data.data.Data.length < 20 && (state.bookFans.isOver = true);
						state.bookFans.pageIndex++;
						if (state.bookFans.pageIndex > 1) {
							commit('loading/setShowBottom', false, {root: true});
						}
					}
				}
			);
			console.log('dispatch', dispatch)
		},

		/**
		 * 获取粉丝信息
		 */
		getBookFansInfo({state, commit, rootState}) {
			api.BookStoreGetBookFansFames({bookId: state.bookId, pageIndex: state.bookFans.pageIndex}).then(
				data => {
					console.log('获取 书籍粉丝 榜首', data);
					if (data.data.Result == 0) {
						commit('setFansInfoRankTop4', {list:data.data.Data});
					}
				}
			);
			api.BookStoreGetUserBookFansValue({bookId: state.bookId, userId: state.userId}).then(
				data => {
					console.log('获取 我在该书籍中的粉丝值', data);
					if (data.data.Result == 0) {
						commit('setFansInfoMineInBook', {data:data.data.Data});
					}
				}
			);
			api.InterActionGetMengZhuDonateInfo({bookId: state.bookId}).then(
				data => {
					console.log('获取书籍盟主需要贡献的多少', data);
					if (data.data.Result == 0) {
						commit('setFansInfoMengZhuDonateInfo', {data:data.data.Data});
					}
				}
			)
		}
	}
;

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
}
