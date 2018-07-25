import api from '../../api/api'

/**
 *  PositionMark 广告位置： booklist_square_3 iosusercenter iOS_search_keyword3
 * @type {{adList: Array, adFo: {ADImage: string, ADText: string, PositionMark: string, Action: string, ClassName: string}}}
 */
const state = {
	adList: [],

	adFormate:{
		ADImage: "https://qidian.qpic.cn/qidian_common/349573/2fb5b51b53a46672946ca4b3440759b8/0",
		ADText: "书单广场top100指定女频",
		PositionMark: "booklist_square_3",
		Action: "GoTo",
		ClassName: "com.qidian.QDReader.ui.BrowserActivity",
	},

	todos: [
		{ id: 1, text: '...', done: true },
		{ id: 2, text: '...', done: false }
	]

};
/**
 *
 */
const mutations = {
	/**
	 * 设置全部广告
	 * @param state
	 * @param bookcase
	 */
	setAllAD(state, list) {
		console.log(state);
		state.adList = [...list];
	},
};

/**
 * @type {{}}
 * 由于子module的getters是和父亲一起暴露在同一个命名空间中， 如果不加 namespace=true, 那么此时传递的state是父state
 * 添加namespace后， 调用是 return this.$store.getters['ad/getAdByRegx']('search_home')
 */
const getters = {
	getAdByRegx: (state, getters, rootState) => (regx) => {
		return state.adList.filter(ad=>ad.PositionMark.indexOf(regx)>-1)
	},
};

/**
 * @type {{}}
 */
const actions = {
	/**
	 * 获取全局广告
	 * 调用方法：this.$store.dispatch('ad/getAdGol');
	 */
	getAdGol({state, commit, rootState}) {
		api.getAdGol().then(
			(data) => {
				let adList = data.data.Data.AD;
				commit('setAllAD',adList)
				console.log('获取全局广告成功', adList);
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


//
// ADText: "大天使", PositionMark: "qiandao_new_iOS_1"
// ADText: "大天使", PositionMark: "iosnewshowbook"
// ADText: "大天使", PositionMark: "iosnewlastpage"
// ADText: "作品榜", PositionMark: "hongbao_square_ios1"
// ADText: "大天使", PositionMark: "hongbao_square_ios2"
// ADText: "2018王者荣耀文学大赛", PositionMark: "search_home_1"
// ADText: "这个地方，深不可测", PositionMark: "search_home_4"
// ADText: "游戏 | 奇迹MU正版授权，点击即玩", PositionMark: "search_home_5"
// ADText: "三界独尊", PositionMark: "ios_audiosquare_banner"
// ADText: "专题10完美的真空", PositionMark: "zhuanlan_top_1"
// ADText: "专栏6.15认证专栏主名单", PositionMark: "iOS_zhuanlan_top_2"
// ADText: "专栏广告位3推荐6.1", PositionMark: "iOS_zhuanlan_top_3"
// ADText: "版主管理-角色大事记", PositionMark: "iOS_banzhuguanli_1"
// ADText: "版主管理-章末页活动", PositionMark: "iOS_banzhuguanli_2"
// ADText: "版主管理-阅读页内通知", PositionMark: "iOS_banzhuguanli_3"
// ADText: "葬魂门", PositionMark: "ios_appstore_comic_adv"
// ADText: "宅妖记", PositionMark: "ios_app_comic_free_adv"
// ADText: "狐妖小红娘", PositionMark: "ios_app_comic_info"
// ADText: "6.25话题", PositionMark: "ios_app_topic_banner"
// ADText: "精品专区-男生", PositionMark: "category-man-left"
// ADText: "推荐-男生", PositionMark: "category-man-right"
// ADText: "精品专区-女生", PositionMark: "category-female-left"
// ADText: "推荐-女生", PositionMark: "category-female-right"
// ADText: "对6月20日更新有啥吐槽的尽管来吧！", PositionMark: "iosapp_dialogic_cms_left"
// ADText: "对话小说", PositionMark: "iosapp_dialogic_cms_right"
// ADText: "书单广场上周趋势", PositionMark: "booklist_square_4"
// ADText: "红包", PositionMark: "iOS_search_keyword1"
// ADText: "邀请", PositionMark: "iOS_search_keyword2"
// ADText:"福利", PositionMark: "iOS_search_keyword3"