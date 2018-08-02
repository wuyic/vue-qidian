import Vue from 'vue'
import api from "../../api/api";

export function Book(options) {

	this.bookId = options && options.bookId || -1;
	/**
	 * 详情
	 * @type {{}}
	 */
	this.bookDetail = {
		CategoryPicture:null,
		BookName:'',
		AuthorName:'',
		AuthorLevel:'',
		BookStar:0,
		BssReadTotal:0,
		AuthorInfo:{},
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
	this.nonAnony = {

	};

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
	 * 初始化
	 */
	this.init = () => {
		api.BookGet({bookId:this.bookId}).then(
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
		// api.BookListGetRelation({bookId:this.bookId}).then(
		// 	data => {
		// 		console.log('获取相关书单成功', data);
		// 	}
		// );
	};

	this.dealNum = (num, needDecimal, than) => {
		than = than || 10000;
		if (needDecimal) {
			if (num >= than) {
				return (num/10000).toFixed(1) + '万';
			} else {
				return Math.floor(num) + '';
			}
		} else  {
			if (num >= than) {
				return Math.floor(num/10000) + '万';
			} else {
				return Math.floor(num) + '';
			}
		}
	};

	if (this.bookId == -1) {
		return ;
	}

	this.init();
}