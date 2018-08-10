import api from '../../api/api'
import Vue from 'vue'
import {BookCase} from '../class/bookCase'
import {Book} from '../class/book'
import {bookSmallType} from '../../api/data'

const state = {
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
		mengzhuInfo: {},

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
	}
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

	getterBookDetail(state) {
		return state.bookDetail;
	},

	getterBookDetailShowMoreDesc(state) {
		return {
			more: state.bookDetail.showMoreDesc,
			height: state.bookDetail.showMoreDescHeight
		};
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
		}
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
}
