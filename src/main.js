// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'es6-promise/auto'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import config from './config/config'
import axios from 'axios'
import qs from 'qs';

//配置文件存放目录
Vue.use(config);
Vue.use(Vuex);
Vue.config.productionTip = false;


// axios.interceptors.request.use(
//   config => {
//     config.headers = {
//       'Accept':	'application/json',
//       'Cookie':	'  QDHeader=OTNmOTg5NzI5ZTk3NTdmNzE0MTc2Mzg0ZjgxNmMzMTF8NS4wLjF8MTI0MnwyMjA4fEFwcFN0b3JlfDEwLjMwfDV8aU9TL2lQaG9uZS9pUGhvbmU4LDJ8MjE2fEFwcFN0b3JlfDN8MTg4Mzc4NTIwfDE1MjYwMjE2ODM4ODV8MHxmOWY4OWViMi0yY2M2LTQ1OTktYjFlMC1iZGZkMmQzZTE5NDk=; appId=12; areaId=40; cmfuToken=N((rxlb-xMjihpazWgs-2qLPmNA-Y-Uib7zwYg6ptfnDMTiz9c1NUqKPnsSGGwCuYrQemvRJd04sf75WFwQG_S5sk_5xXpp4wf4luO3jXVbC3irbSqku_0arbVEbu5T2UZAqLVYwPIz7eSdRESW4LdV_Pet0HInuS8W7SX_GBYwRwQFwMBuyL5z9wXwPvFIZdNgTiQ9183Cv5RZrHfFU58j9WWY-Tk8ADOQcyVjALQca6Un5Tje2rzI1n9B3IVVdNYO0; ywguid=461199585; ywkey=ywj0ff7NJNgE',
//       'User-Agent':	'QDReaderAppStore/5.0.1 (iPhone; iOS 10.3.3; Scale/3.00)',
//       'Accept-Language':	'zh-Hans-CN;q=1',
//       'Accept-Encoding':	'gzip, deflate',
//     };
//     return config;
//   }
// );

//请求捕获， 在这里统处理
axios.interceptors.response.use(
	response => {
		// if (response.data.Ret == 90000) {
		//   Vue.prototype.$dialog.toast({mes:'会话超时，请重新登陆！', timeout:2000});
		//   router.push({
		//     name: 'login',
		//   })
		// } else if (response.data.Ret == -1) {
		//   Vue.prototype.$dialog.toast({mes:response.data.Msg, timeout:2000});
		// }
		return response;
	},
	error => {
		// console.log(error.response);
		// if (error.response) {
		//   switch (error.response.status) {
		//     case 500:
		//       Vue.prototype.$dialog.toast({mes:'服务器错误！', timeout:2000});
		//       break;
		//   }
		// }

		return error
	});


Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;


// 设置路由title
router.beforeEach((to, from, next) => {
	window.document.title = to.meta.title;
	Vue.prototype.getTitle = to.meta;
	next()
});


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {App},
	template: '<App/>'
});
