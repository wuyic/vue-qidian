import api from '../../api/api'


const state = {
	/**
	 * 其他用户信息
	 */
	otherUser:{
		userInfo:{},
		bookList:[],
		columnList:[],
		dynamicList:[],
	},
	/**
	 * 其他作者信息
	 */
	otherAuthor:{

	}
};
/**
 *
 */
const mutations = {
	/**
	 * 设置其他用户信息
	 * @param state
	 * @param bookcase
	 */
	setOtherUser(state, data) {
		state.otherUser = data;
	},
	/**
	 * 设置其他作者信息
	 * @param state
	 * @param bookcase
	 */
	setOtherAuthor(state, data) {
		state.otherAuthor = data;
	},
};

/**
 * @type {{}}
 * 由于子module的getters是和父亲一起暴露在同一个命名空间中， 如果不加 namespace=true, 那么此时传递的state是父state
 * 添加namespace后， 调用是 return this.$store.getters['ad/getAdByRegx']('search_home')
 */
const getters = {
	getterUserInfo(state) {
		return state.otherUser;
	}
};

/**
 * @type {{}}
 */
const actions = {
	/**
	 * 获取其他用户信息
	 * 调用方法：this.$store.dispatch('ad/getAdGol');
	 */
	GetUserPageInfo({state, commit, rootState}, {id}) {
		api.UserGetUserPageInfo({userId:id}).then(
			(data) => {
				console.log('获取其他用户信息成功', data);
				if (data.data.Result == 0) {
					commit('setOtherUser', data.data.Data);
				}
			}
		)
	},
	// ls | sed 's/_[0-9]*x[0-9]*_@.x.png$//' | xargs -I {} mv {}_28x28_@2x.png.png {}.png
	// ls | sed 's/_[0-9]*x[0-9]*_@.x//' | xargs -I {}

	/**
	 * 获取其他作者信息
	 */
	GetAuthorInfo({state, commit, rootState}, {id}) {
		api.UserGetAuthorInfo({authorId:id}).then(
			(data) => {
				console.log('获取其他作者信息成功', data);
				if (data.data.Result == 0) {
					commit('setOtherAuthor', data.data.Data);
				}
			}
		)
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
