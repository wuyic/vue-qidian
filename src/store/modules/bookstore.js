import api from '../../api/api'
import Vue from 'vue'
import {BookCase} from '../class/bookCase'
import {bookSmallType} from '../../api/data'

const state = {

	/**
	 * 性别 0男 1女
	 */
	gender:0,


};

const mutations = {
	/**
	 * 设置性别
	 */
	setBookStoreGender(state, gender) {
		if (bookId) {
			state.bookId = bookId;
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
	 * 获取4块 点击类型 下表
	 */
	getBookStoreTopForBox(state) {

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
