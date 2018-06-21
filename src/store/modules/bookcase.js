import api from '../../api/api'
import {BookCase} from '../class/bookCase'
import {bookSmallType} from '../../api/data'

const state = {
	bookCase: new BookCase(),

	count: 0,
	bookBigType: [],
	bookSmallType: {
		type11: [], //男生
		type12: [],//女生
		type2: [], //听书
		type3: [], //漫画
		type4: [], //出版
	},
	bookCaseState: [],

};


/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：
 * 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，
 * 并且它会接受 state 作为第一个参数：
 *  Mutation 必须是同步函数
 *
 * 如何调用？
 *  在组件中使用：this.$store.commit('xxx') 提交 mutation，
 *  或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
 * @type {{}}
 */
const mutations = {
	//设置bookcase
	setBookCase(state, bookcase) {
		bookcase.forEach((value, index) => {
			state.bookCase.addBook(value);
		});
	},

	setBookBigType(state, bigtype) {
		state.bookBigType = bigtype;
	},

	/**
	 * 部分类型放入
	 * @param state
	 * @param data
	 */
	setBookType(state, data) {
		state.bookSmallType['type' + data.id] = data.list;
	},

	/**
	 * 全部类型放入
	 * @param state
	 * @param data
	 */
	setBookTypeAll(state, data) {
		state.bookSmallType = data;
	},

	setSaixuanChoosed(state, data) {
		state.bookCase.saixuanChoosed = data;
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
const getters = {};

/**
 * Action 类似于 mutation，不同在于：
 Action 提交的是 mutation，而不是直接变更状态。
 Action 可以包含任意异步操作。

 如何使用？
 Action 通过 store.dispatch 方法触发：

 * @type {{}}
 */
const actions = {


	test({state, commit, rootState}) {
		api.test().then((data) => {
				console.log(data);
			}
		)
	},

	/**
	 * 获取我的书架列表
	 * @param state
	 * @param commit
	 * @param rootState
	 */
	getBookCase({state, commit, rootState}) {
		if (state.bookCase.getBookBigType == 0) {
			api.getBookCase().then((data) => {
					console.log(data);
					commit('setBookCase', data.data.ServerCase.BookInfo);
					commit('setServiceTime', data.data.ServerTime, {root: true});
					state.bookCase.getBookBigType = 1;
				}
			)
		}
	},

	/**
	 * 获取书籍大分类
	 * @param state
	 * @param commit
	 * @param rootState
	 */
	getBookBigType({state, commit, rootState}) {
		if (state.bookCase.getBookBigType == 0) {
			api.getBookBigType().then((data) => {
					commit('setBookBigType', data.data.data);
					state.bookCase.getBookBigType = 1;
				}
			);
		}
	},

	/**
	 * 获取 书籍小分类
	 * @param state
	 * @param commit
	 * @param rootState
	 */
	getBookSmallTypeAll({state, commit, rootState}) {
		if (state.bookCase.getBookBigType) {
			api.getBookType(-1).then(
				(data) => {
					commit('setBookTypeAll', data.data.data);
					state.bookCase.getBookBigType = 1;
				}
			)
		}
	}
};

export default {
	state,
	mutations,
	getters,
	actions
}
