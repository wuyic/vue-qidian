import Vue from 'vue'
import api from "../../api/api";

export function Book(options) {

	this.bookId = options && options.bookId || -1;
	/**
	 * 详情
	 * @type {{}}
	 */
	this.bookDetail = {
		CategoryPicture: null,
		BookName: '',
		AuthorName: '',
		AuthorLevel: '',
		BookStar: 0,
		BssReadTotal: 0,
		AuthorInfo: {},
	};

	/**
	 * 广告
	 * @type {{}}
	 */
	this.bookAd = {};

	/**
	 * 荣誉
	 * @type {{}}
	 */
	this.bookHonors = {};

	/**
	 * 详情
	 * @type {{}}
	 */
	this.nonAnony = {};

	/**
	 * 推荐票
	 */
	this.RecomTicket = {};

	/**
	 * 月票
	 */
	this.MonthTicket = {};

	/**
	 * 打赏
	 */
	this.Donate = {};

	/**
	 * 纵览
	 */
	this.Review = {};

	/**
	 * 折扣
	 */
	this.discount = {};

	/**
	 * 书评
	 */
	this.bookReview = {};

	/**
	 * 相关书单
	 */
	this.relationBookList = {
		list: [],
		allCount: [],
	};

	/**
	 * 初始化
	 */
	this.init = () => {
		api.BookGet({bookId: this.bookId}).then(
			data => {
				console.log('获取书籍信息成功', data);
				if (!data.data.Result) {
					this.bookDetail = data.data.Data;
				}
			}
		);
		// api.BookGetBookAd({bookId:this.bookId}).then(
		// 	data => {
		// 		console.log('获取书籍广告成功', data);
		// 	}
		// );
		// api.BookGetBookDiscount({bookId:this.bookId, isFreeUser:0}).then(
		// 	data => {
		// 		console.log('获取书籍折扣成功', data);
		// 	}
		// );
		api.BookListGetRelation({bookId: this.bookId}).then(
			data => {
				console.log('获取相关书单成功', data);
				if (!data.data.Result) {
					let list = this.relationBookList.list = [...data.data.Data];
					data.data.Data.forEach((item, index) => {
						Vue.set(list[index], 'isShowMoreDesc', false);
						Vue.set(list[index], 'changeShowMoreDesc', function() {
							this.isShowMoreDesc = !this.isShowMoreDesc;
						});
					});
					this.relationBookList.allCount = data.data.count;
				}
			}
		);
	};

	/**
	 * 大数字 以万为单位
	 * @param num
	 * @param needDecimal 是否需要保留以为小数
	 * @param than        达到多少比例开始以万为单位
	 * @returns {string}
	 */
	this.dealNum = (num, needDecimal, than) => {
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
	this.dealNumWithAdd = (num, than) => {
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
	this.whiteSpace = (desc) => {
		let regx = /\n/g;
		if (desc && desc.length > 0) {
			return desc.replace(regx, '<br/>')
		} else {
			return ''
		}
	};


	if (this.bookId == -1) {
		return;
	}

	this.init();
}

function Abc() {
	this.b = 123;
	this.c = {
		b: 456,
		callB: () => {
			console.log(this, this.b, self.b)
		}
	}
}