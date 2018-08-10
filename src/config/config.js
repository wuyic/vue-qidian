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

		/**
		 * 大数字 以万为单位
		 * @param num
		 * @param needDecimal 是否需要保留以为小数
		 * @param than        达到多少比例开始以万为单位
		 * @returns {string}
		 */
		Vue.prototype.dealNum = (num, needDecimal, than) => {
			than = than || 10000;
			if (needDecimal) {
				if (num >= than) {
					return (num / 10000).toFixed(1) + '万';
				} else {
					return Math.ceil(num) + '';
				}
			} else {
				if (num >= than) {
					return Math.ceil(num / 10000) + '万';
				} else {
					return Math.ceil(num) + '';
				}
			}
		};

		/**
		 * 处理， 带加号
		 * @param num
		 * @param than
		 */
		Vue.prototype.dealNumWithAdd = (num, than) => {
			than = than || 10000;
			if (num >= than) {
				return Math.floor(num / 10000) + '万+';
			} else {
				return Math.floor(num) + '';
			}
		};

		/**
		 * 换行符转换为 <br />
		 */
		Vue.prototype.whiteSpace = (desc) => {
			let regx = /\n/g;
			if (desc && desc.length > 0) {
				return desc.replace(regx, '<br/>')
			} else {
				return ''
			}
		};
	}
}
