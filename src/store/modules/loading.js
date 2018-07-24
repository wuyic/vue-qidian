import api from '../../api/api'

/**
 *  加载中
 */
const state = {
	isShowBottom:false,

	marginTopDis: -50,

};
/**
 *
 */
const mutations = {
	/**
	 * 设置状态
	 * @param state
	 */
	setShowBottom(state, status) {
		state.isShowBottom = status;
	},

	/**
	 * 设置距离
	 * @param state
	 * @param val
	 */
	setMarginTopDis(state, {value}) {
		value = value || -50;
		state.marginTopDis = value;
	}
};

/**
 * @type {{}}
 */
const getters = {
	getShowBottomStatus: (state)  => {
		return state.isShowBottom;
	},

	getMarginTopDis: (state) => {
		return state.marginTopDis;
	},
};

/**
 * @type {{}}
 */
const actions = {
	setShowBottom({state, commit}, status) {
		commit('getShowBottomStatus', status);
	},

	setMarginTopDis({state, commit}, {value}) {
		commit('setMarginTopDis', {value:value});
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}