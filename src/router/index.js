import Vue      from 'vue'
import Router   from 'vue-router'
import index    from '@/components/index'
import http     from '@/components/common/http'
import shaixuan from '@/components/index/other/shaixuan'
import bookListmyCollect from '@/components/myCollectBookList/index'
import myBookListCreate  from '@/components/myBookListCreate/index'
import booklistDetail    from '@/components/bookListDetail/index'
import bookDetail        from '@/components/bookDetail/index'
import bookFansRank      from '@/components/bookFansRank/index'
import booklistDiscuss   from '@/components/booklistDiscuss/index'
import search            from '@/components/search/index'
import userInfo          from '@/components/userinfo/index'

import good from '@/components/good/index'
import find from '@/components/find'
import mine from '@/components/mine'

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/html',
			name: 'html',
			component: http,
			meta: {
				introduce:'网页 ',
				title: '',
				isCommTitle: false,
				isShowFoot: false,
				bottom: 1,
			},
		},
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
			path: '/booklist/myCollect',
			name: 'bookListmyCollect',
			component: bookListmyCollect,
			meta: {
				introduce:'首页-书单列表',

				title: '书单'
			}
		},
		{
			path: '/booklist/create',
			name: 'myBookListCreate',
			component: myBookListCreate,
			meta: {
				introduce:'创建书单',
				title: '创建书单',
			}
		},
		{
			path: '/booklist/detail/:id',
			name: 'booklistDetail',
			component: booklistDetail,
			meta: {
				introduce:'书单详情',
				title: '书单详情',
			}
		},
		{
			path: '/booklist/discuss',
			name: 'booklistDiscuss',
			component: booklistDiscuss,
			meta: {
				introduce:'书单评论',
				title: '书单评论',
			}
		},
		{
			path: '/book/detail/:id',
			name: 'bookDetail',
			component: bookDetail,
			meta: {
				introduce:'书籍详情',
				title: '书籍详情',
			}
		},
		{
			path: '/book/fansRank/:id',
			name: 'bookFansRank',
			component: bookFansRank,
			meta: {
				introduce:'书籍粉丝榜单',
				title: '粉丝榜',
			}
		},
		{
			path: '/good/index',
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
		{
			path: '/userInfo/:type/:id',
			name: 'userInfo',
			component: userInfo,
			meta: {
				introduce:'查看其他用户信息',
				title: '用户信息',
			}
		},
	]
})



