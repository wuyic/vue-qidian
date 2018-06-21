import Vue from 'vue'
import {bookSmallType} from '../../api/data'


export function BookCase() {

	/**
	 * 是否访问过api
	 * @type {number}
	 */
	this.getBookCase = 0;
	this.getBookBigType = 0;
	this.getBookSmallTypeAll = 0;

	/**
	 * 书籍总量
	 * @type {number}
	 */
	this.num = 0;

	/**
	 * 筛选标签
	 */
	this.saixuanChoosed = -1;

	/**
	 * 书籍状态
	 */
	this.bookState = [  //状态
		{name: '连载', num: 0, Id: -2},
		{name: '完本', num: 0, Id: -3},
		{name: '超过50章未读', num: 0, Id: -4},
		{name: '超过100章未读', num: 0, Id: -5},
		{name: '未读过', num: 0, Id: -6},
		{name: '读完', num: 0, Id: -7},
	];


	/**
	 * 书籍类型
	 * @type {[null,null,null,null,null]}
	 */
	this.bookTypeDivide = [ //类型区分
		{name: '男生', num: 0, Id: '11', subType: bookSmallType('11').data.CategoryInfoPageList,},
		{name: '女生', num: 0, Id: '12', subType: bookSmallType('12').data.CategoryInfoPageList},
		{name: '听书', num: 0, Id: '80001', subType: bookSmallType('80001').data.CategoryInfoPageList},
		{name: '漫画', num: 0, Id: '50001', subType: bookSmallType('50001').data.CategoryInfoPageList},
		{name: '出版', num: 0, Id: '4', subType: bookSmallType('4').data.CategoryInfoPageList},
	];

	/**
	 * 书籍列表
	 * @type {{}}
	 */
	this.bookcase = {};

	/**
	 * 添加书籍
	 * @param bookInfo
	 */
	this.addBook = (bookInfo) => {
		let key = 'book' + bookInfo.BookId;
		let categoryId = bookInfo.CategoryId;
		let subCategoryId = bookInfo.SubCategoryId;
		let bigType = 0;
		let isOver = -2;

		this.bookTypeDivide.forEach((val, key) => {
			val.subType.forEach((value, index) => {
				if (categoryId == value.CategoryId) {

					bigType = val.Id;

					this.bookTypeDivide[key].num++;
					this.bookTypeDivide[key].subType[index].num = this.bookTypeDivide[key].subType[index].num + 1 || 1;

					if (bookInfo.BookStatus == '完本') {
						this.bookState[1].num++;
						isOver = -3;
					}

					if (bookInfo.BookStatus == '连载') {
						this.bookState[0].num++;
						isOver = -2;
					}
				}
			})
		});
		Vue.set(this.bookcase, key, {
			bookInfo: bookInfo,
			isRead: 0,
			bookCaptia: [],
			readCap: 0,
			allCap: 0,
			bigType: bigType,
			isOver: isOver
		});
	};

	/**
	 * 删除数据
	 * @param bookId
	 */
	this.deleteBook = (bookId) => {

	};

	/**
	 * 刷新书籍
	 */
	this.reflush = () => {

	};

	/**
	 * 获取书籍列表 带筛选功能
	 * @returns {Array}
	 */
	this.getMyBookCase = () => {
		let array = [];
		Object.keys(this.bookcase).forEach((key) => {
			if (this.saixuanChoosed == -1) {  //全部
				array.push(this.bookcase[key]);
			} else if ([-2, -3].indexOf(Math.round(this.saixuanChoosed)) !== -1 && this.saixuanChoosed == this.bookcase[key].isOver) { //状态
				array.push(this.bookcase[key]);
			} else if ([4, 11, 12, 50001, 80001].indexOf(Math.round(this.saixuanChoosed)) !== -1 && this.saixuanChoosed == this.bookcase[key].bigType) { //大类别
				array.push(this.bookcase[key]);
			} else {  //小类别
				if (this.bookcase[key].bookInfo.CategoryId == this.saixuanChoosed) {
					array.push(this.bookcase[key]);
				}
			}
		});
		return array;
	}
}
