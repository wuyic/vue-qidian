import api from '../../api/api'

/**
 *  支付
 */
const state = {
	paySetting:{
		"appId": 33,
		"areaId": 40,
		"bannerText": "",
		"bannerUrl": "",
		"channelList": [{
			"activitySubTitle": "",
			"activityTitle": "",
			"amountList": [{
				"activityText": "",
				"amount": "1",
				"isSelected": 0,
				"productId": "m.qidian.QDReaderAppStore.100dian",
				"showNo": 0,
				"ywAmount": 100
			}, {
				"activityText": "",
				"amount": "6",
				"isSelected": 0,
				"productId": "m.qidian.QDReaderAppStore.600dian",
				"showNo": 0,
				"ywAmount": 600
			}, {
				"activityText": "",
				"amount": "12",
				"isSelected": 0,
				"productId": "m.qidian.QDReaderAppStore.1200dian",
				"showNo": 0,
				"ywAmount": 1200
			}, {
				"activityText": "",
				"amount": "25",
				"isSelected": 0,
				"productId": "m.qidian.QDReaderAppStore.2500dian",
				"showNo": 0,
				"ywAmount": 2500
			}, {
				"activityText": "",
				"amount": "98",
				"isSelected": 0,
				"productId": "m.qidian.QDReaderAppStore.9800dian",
				"showNo": 0,
				"ywAmount": 9800
			}, {
				"activityText": "",
				"amount": "648",
				"isSelected": 0,
				"productId": "m.qidian.QDReaderAppStore.64800dian",
				"showNo": 0,
				"ywAmount": 64800
			}],
			"channelId": 7,
			"channelMemo": "",
			"channelName": "App Store",
			"channelType": 2,
			"clientCuryId": "￥",
			"clientCuryName": "元",
			"endTime": 0,
			"gearId": 10059,
			"groupChannelId": 7,
			"groupChannelName": "App Store",
			"handFee": 0,
			"isCustom": 0,
			"isSelected": 0,
			"rate": 100,
			"startTime": 0
		}],
		"chargeType": 0,
		"companyName": "上海玄霆娱乐信息科技有限公司",
		"curyName": "阅点",
		"endTime": 0,
		"gearList": [],
		"loginUrl": "",
		"pactText": "同意用户服务协议",
		"pactUrl": "https:\/\/passport.qidian.com\/pact.html?mobile=1",
		"productParamInfo": null,
		"serverHost": null,
		"startTime": 0,
		"userGuid": 0,
		"verNo": 1,
		"paypalUser": "",
		"returnUrl": null
	}
};
/**
 *
 */
const mutations = {

};

/**
 * @type {{}}
 */
const getters = {
	payConfig(state) {
		return state.paySetting;
	}
};


/**
 * @type {{}}
 */
const actions = {
	/**
	 * 获取充值配置
	 * @param state
	 * @param commit
	 * @param rootState
	 */
	getSettingForPay({state, commit, rootState}) {
		api.getSettingForPay({}).then(
			data=>{
				console.log('获取支付配置成功', data);
				if (data.data.code == 200) {
					state.paySetting = data.data.data;
				}
			}
		)
	},

	/**
	 *  送花
	 */
	accountGiveFlower({state, commit, dispatch,rootState}) {
		let detail = rootState.booklist.bookListDetail;
		let bookListId = detail.id;
		let num = 0;
		detail.tips.gearList.forEach((item, index) => {
			if (item.selected) {
				num = item.price;
			}
		});
		if (num > 0) {
			api.BookListGoTip({booklistId:bookListId, num:num}).then(
				(data) => {
					console.log('送花完毕', data);
					if (!data.data.Result) {
						dispatch('toast/toastText', {text:'献花成功', timeout:1500})
					} else {
						dispatch('toast/toastText', {text:data.data.Message, timeout:1500})
					}
				}
			)
		}
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}