export default {
	install(Vue, options) {
		Vue.prototype.baseUrl = 'http://127.0.0.1:5678/get';
		Vue.prototype.getTitle = {
			title: '',
			isCommTitle: false,
			isShowFoot: true,
			bottom: 1,
		};
		Vue.prototype.judgeTime = function (time1, serverTime) {
			serverTime = serverTime || new Date().getTime();
			let time = Math.round(serverTime / 1000) - Math.round(time1 / 1000);
			if (time < 60) {
				return time.toString() + '秒'
			}
			time = Math.round(time / 60);
			if (time < 60) {
				return time.toString() + '分钟'
			}
			time = Math.round(time / 60);
			if (time < 24) {
				return time.toString() + '小时'
			}
			time = Math.round(time / 24);
			if (time < 30) {
				return time.toString() + '天'
			}
			time = Math.round(time / 30);
			if (time < 12) {
				return time.toString() + '个月'
			}
			time = Math.round(time / 12);
			return time.toString() + '年'
		};
	}
}
