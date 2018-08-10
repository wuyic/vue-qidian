import Vue from 'vue'
import api from "../../api/api";

export function Book(options) {


	this.userId = '188378520';

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
	 * 书籍粉丝
	 */
	this.bookFans = {
		pageIndex:1,
		pageCount:20,
		list:[],
		mineInBook:{},
		mengzhuInfo:{},
		
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
		api.BookGetBookAd({bookId:this.bookId}).then(
			data => {
				console.log('获取书籍广告成功', data);
			}
		);
		api.BookGetBookDiscount({bookId:this.bookId, isFreeUser:0}).then(
			data => {
				console.log('获取书籍折扣成功', data);
			}
		);
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
	 * 获取书籍粉丝信息
	 */
	this.getBookFansInfo = () => {

		api.BookStoreGetBookFansList({bookId:this.bookId, pageIndex:this.bookFans.pageIndex}).then(
			data => {
				console.log('获取书籍粉丝列表成功', data);
				if (data.data.Result == 0) {
					this.bookFans.list = [...this.bookFans.list, data.data.Data]
				}
			}
		);

		this.bookFans.pageIndex == 1
		&& api.BookStoreGetBookFansFames({bookId:this.bookId, pageIndex:this.bookFans.pageIndex}).then(
			data => {
				console.log('获取 书籍粉丝 榜首', data);
			}
		);
		this.bookFans.pageIndex == 1
		&& api.BookStoreGetUserBookFansValue({bookId:this.bookId, userId:this.userId}).then(
			data => {
				console.log('获取 我在该书籍中的粉丝值', data);
			}
		);
		this.bookFans.pageIndex == 1
		&& api.InterActionGetMengZhuDonateInfo({bookId:this.bookId}).then(
			data => {
				console.log('获取书籍盟主信息成功', data);
			}
		)

	};

	if (this.bookId == -1) {
		return;
	}

	this.init();
}