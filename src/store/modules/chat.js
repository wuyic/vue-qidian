import api from '../../api/api'
import Vue from 'vue'

/**
 *  聊天
 */
const state = {
	inputWord:'',
	autoTextAreaHeight: 'auto',

	emoji: {
		list:()=>{
			let list = [];
			for (let i = 1; i <= 60; i++) {
				list.push({name:'fn='+i+'.png', word:'fn='+i})
			}
			return list;
		},
		page:1,
		pageCount:36,
		allPage:2,
	}
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
		word = word.replace(/<img data-id="(.*?)".*?>/g, '$1');
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

	/**
	 * Vue v-html不会复合渲染 所以不能用class放在img内， 这样不会渲染出来
	 * @param state
	 * @returns {string}
	 */
	getInputWord: (state)  => {
		return state.inputWord.replace(/\[fn=(.*?)\]/g, (word, $1)=>{
			let img = require('@/assets/image/expression/fn=' + $1 + '.png');
			return "<img data-id='[fn="+$1+"]' style='width:0.3rem; height:0.3rem;' src='"+img+"' >"
		});
	},

	/**
	 * 氟元素中  计算高度
	 * @param state
	 * @param commit
	 * @returns {string}
	 */
	calcFatherHeight(state) {
		let val = '0.4rem';
		if (state.autoTextAreaHeight != 'auto') {
			val = state.autoTextAreaHeight;
		}
		return 'calc(100vh - 44px - 0.5rem - ' + val + ' )'
	},

	/**
	 * 子元素 高度
	 */
	calcSmallInputHeight(state) {
		let val = '0.4rem';
		if (state.autoTextAreaHeight != 'auto') {
			val = state.autoTextAreaHeight;
		}
		return 'calc(0.5rem + ' + val + ' )'
	},

	/**
	 * 所有头像相关
	 */
	GetEmoji(state) {
		return state.emoji;
	}
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
		let val = obj.target.innerHTML;
		commit('changeInputWord', val);
	},
	/**
	 *  添加表情
	 */
	addEmoji({state, commit}, emoji) {
		commit('changeInputWord', state.inputWord+emoji);
	},


	/**
	 * 设置输入框高度
	 */
	setAutoTextAreaHeight({state, commit}, obj) {
		obj = obj.currentTarget;
		commit('changeAutoTextAreaHeight', 'auto');
		commit('changeAutoTextAreaHeight', obj.scrollHeight + "px");
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}