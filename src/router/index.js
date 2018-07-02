import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import shaixuan from '@/components/index/other/shaixuan'
import booklist from '@/components/index/bookList/index'
import search from '@/components/search/index'

import good from '@/components/good'
import find from '@/components/find'
import mine from '@/components/mine'

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: index,
			meta: {
				introduce:'书架中的筛选 ',
				title: '',
				isCommTitle: false,
				isShowFoot: true,
				bottom: 1,
			},
		},
		{
			path: '/index/shaixuan',
			name: 'shaixuan',
			component: shaixuan,
			meta: {
				introduce:'书架中的筛选 ',
				title: '筛选'
			}
		},
		{
			path: '/index/booklist',
			name: 'booklist',
			component: booklist,
			meta: {
				introduce:'首页-书单列表',

				title: '书单'
			}
		},
		{
			path: '/good',
			name: 'good',
			component: good,
			meta: {
				introduce:'精选 - 主页',
				title: '',
				isCommTitle: false,
				isShowFoot: true,
				bottom: 2,
			},
		},
		{
			path: '/find',
			name: 'find',
			component: find,
			meta: {
				introduce:'探索 - 主页',
				title: '',
				isCommTitle: false,
				isShowFoot: true,
				bottom: 3,
			},
		},

		{
			path: '/mine',
			name: 'mine',
			component: mine,
			meta: {
				introduce:'我的 - 主页',
				title: '',
				isCommTitle: false,
				isShowFoot: true,
				bottom: 4,


			},
		},

		{
			path: '/search',
			name: 'search',
			component: search,
			meta: {
				introduce:'搜索',
				title: '',
				isCommTitle: false,
				isShowFoot: false,
				bottom: 4,
			},
		},
	]
})



