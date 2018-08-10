var express = require('express');
var request = require('request');
var app = express();


app.get('/get', function (req, res) {

	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Origin", '*');


	// console.log('req', req.query);
	// console.log(req.params);//输出index
	// console.log(req.query);//输出表单get提交的login_name
	// console.log(req.query.url);

	// req.query.method ='post';
	// req.query.url ='https://ptlogin.qidian.com/sdk/qqwtcallback';

	if (!req.query.method) {
		req.query.method = 'get';
	}



	// _csrfToken
	// ywBP6mPHUlzl
	// ywj0ff7NJNgE
	let options = {
		method: req.query.method,
		url: req.query.url + '?' + (req.query.method=='get' ? req.query.param : ''),
		headers: {
			'Accept': 'application/json',
			'content-type': 'application/x-www-form-urlencoded',
			'Cookie': 'QDHeader=OTNmOTg5NzI5ZTk3NTdmNzE0MTc2Mzg0ZjgxNmMzMTF8NC43Ljd8MTI0MnwyMjA4fEFwcFN0b3JlfDExLjQwfDV8aU9TL2lQaG9uZS9pUGhvbmU4LDJ8MjA0fEFwcFN0b3JlfDN8MTg4Mzc4NTIwfDE1MzM4OTgzODcyNjJ8MHw5NmIxZWRjYi0xNjE3LTQ3NjItODlhMC0yZWVjMTc2NWVmNDQ=; appId=12; areaId=40; cmfuToken=N((2kQpEjAf_6yJl7sLwViDHW_d0ZHywKqJPaSqDibkk80C2531yt1BO8-5a_V104e8zwmHXTIZmbo80NClrMZVWdCcyr7uJASdSdLe2ylhg7-rjnD24vxli-BTLUHdTYByKBI6n-I75KdCAot8lMSnv4Kpt9TlALrDG9mig1_PFKsl5KtHs1tzHSmXSdpoZa2-BuWeF9XlRwkxtQ8f1FXaCxNIzD5dHCseE0Zcw1TXApbC64QMSQSaSOnHeWsAf22Y0; ywguid=461199585; ywkey=ywBzo7arVGYB; wal=1; _csrfToken=sCHHFCYOHmGn1rBeKOEocllMN7bCkGZeBauwcasH; hiijack=0; newstatisticUUID=1532924619_18376831',
			'User-Agent': 'QDReaderAppStore/4.77 (iPhone; iOS 11.3.1; Scale/3.00)',
			'Accept-Language': 'zh-Hans-CN;q=1',
			'Accept-Encoding': 'gzip, deflate',
			'Referer': 'http://ios.qidian.com',
			'QDHeader': 'OTNmOTg5NzI5ZTk3NTdmNzE0MTc2Mzg0ZjgxNmMzMTF8My45LjF8MTI0MnwyMjA4fEFwcFN0b3JlfDExLjQwfDV8aU9TL2lQaG9uZS9pUGhvbmU4LDJ8MTcxfEFwcFN0b3JlfDM=',
			'ywguid':'461199585',
		},
		body: req.query.method=='post' ? req.query.param : ''
	};
	console.log(options);

	if (req.query.url) {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				res.send(body);
			} else {
				res.send(response);
			}
		})
	}

});

app.listen(5678);
console.log("node服务已经开启，监听端口：5678");

//登陆 req.query.url ='https://ptlogin.qidian.com/sdk/qqwtcallback';
// 	paramsToUrlParam({
// 	appid:'12',
// 	areaid:	'40',
// 	auto:	'1',
// 	autotime:	'30',
// 	devicetype:	'iPhone8,2',
// 	keytype:	'0',
// 	osversion:	'11.3.1',
// 	returnurl:	'http://www.qidian.com',
// 	sdkversion:	'110',
// 	signature:	'k0kgW6JJ3ch6BXgsfDAfQZ6ylWFcE8lX2gPhaUPi/4m5BGOtLI0J5Ev4RX9a T08q',
// 	skey	:'MFJkO75DDr',
// 	source:	'QDReaderAppStore',
//     uin:	'461199585',
//     version:	'4.7.7',
// })