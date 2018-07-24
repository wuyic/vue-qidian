import api from '../../api/api'
import Vue from 'vue'

/**
 *  加载中
 */
const state = {

	/**
	 *  是否显示 弹出层
	 */
	isShowToast: false,
	/**
	 *  弹出层 文字
	 */
	textVal: '',
	/**
	 * 是否显示 覆盖层
	 */
	timeout:1500,

	isShowBox:{
		base:false,
	}
};
/**
 *
 */
const mutations = {
	changeState: (state, {type, status}) => {
		Vue.set(state.isShowBox, 'type'+type, status);
	}
};

/**
 * @type {{}}
 */
const getters = {

	isShowToast: (state)  => {
		return state.isShowToast;
	},

	textVal: (state)  => {
		return state.textVal;
	},

	isShowBox: (state) => {
		return state.isShowBox;
	},
};

/**
 * @type {{}}
 */
const actions = {
	toastText({state, commit}, {text, timeout}) {
		state.isShowToast = true;
		state.textVal = text;
		timeout && (state.timeout = timeout);
		setTimeout(() => {
			state.isShowToast = false
		}, state.timeout)
	},

	toastBox({state, commit}, {type, status}) {
		commit('changeState', {type, status});
		console.log('changeState Over', state)
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}