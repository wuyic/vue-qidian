import api from '../../api/api'
import Vue from 'vue'

/**
 *  聊天
 */
const state = {
	inputWord:'',
	autoTextAreaHeight: 'auto'
};
/**
 *
 */
const mutations = {
	/**
	 * 更改聊天输入文字
	 * @param state
	 * @param word
	 */
	changeInputWord: (state, word) => {
		state.inputWord = word;
	},

	/**
	 * 更改输入框高度
	 * @param state
	 * @param height
	 */
	changeAutoTextAreaHeight: (state, height) => {
		state.autoTextAreaHeight = height;
	}

};

/**
 * @type {{}}
 */
const getters = {
	autoTextAreaHeight:(state) => {
		return state.autoTextAreaHeight;
	},

	getInputWord: (state)  => {
		return state.inputWord;
	},

	/**
	 * 氟元素中  计算高度
	 * @param state
	 * @param commit
	 * @returns {string}
	 */
	calcSmallInputHeight(state) {
		let val = '0.4rem';
		if (state.autoTextAreaHeight != 'auto') {
			val = Number.parseInt(state.autoTextAreaHeight.replace('px', ''));
		}
		return 'calc(100vh - 44px - 0.5rem - ' + val + ' )'
	},
};

/**
 * @type {{}}
 */
const actions = {

	/**
	 * 设置聊天输入文字
	 * @param state
	 * @param commit
	 * @param obj
	 */
	setInputWord({state, commit}, obj) {
		let val = obj.target.value;
		commit('changeInputWord', val);
	},



	/**
	 * 设置输入框高度
	 */
	setAutoTextAreaHeight({state, commit}, obj) {
		obj = obj.currentTarget;
		commit('changeAutoTextAreaHeight', 'auto');
		commit('changeAutoTextAreaHeight', obj.scrollHeight + "px");
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}