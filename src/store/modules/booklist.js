import api from '../../api/api'
import {BookCase} from '../class/bookCase'
import {bookSmallType} from '../../api/data'

const state = {
    count:0,
    bookList:[

    ],
	/**
	 书单内详细书籍
	 */
    bookListInfo:[

    ],

	/**
	 * 我的书单
	 */
	myBookList:[

	],

	/**
	 * 创建书单基础信息
	 */
	createBookList:{

	},

};


/**
 *
 */
const mutations = {
	/**
	 * 设置书单
	 * @param state
	 * @param bookcase
	 */
	setBookList(state, booklist) {

    },

	/**
	 * 设置我的书单
	 */
	setMyBookList(state, booklist) {

	}

};

/**
 * @type {{}}
 */
const getters = {

};

/**
 * @type {{}}
 */
const actions = {
	/**
	 *
	 */
	getMyBookList({state, commit, RootState}) {
		api.getBookList().then(data=>{
			console.log(data);

		})
	},

	getBookList() {
		api.getMyBookList().then(data=>{
			console.log(data);
		})

	}
};

export default {
  state,
  mutations,
  getters,
  actions
}
