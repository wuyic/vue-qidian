var express = require('express');
var request = require('request');
var app = express();


function paramsToUrlParam(obj) {
	let param = '';
	Object.keys(obj).forEach((key)=>{
		param += key;
		param += '=';
		param += obj[key];
		param += '&';
	});

	return param.slice(0,-1);
}


app.get('/get', function(req, res){

  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", '*');


  console.log(req.params);//输出index
  console.log(req.query);//输出表单get提交的login_name
  console.log(req.query.url);


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
    url:req.query.url,
    headers: {
    'Accept': 'application/json',
	 'content-type' : 'application/x-www-form-urlencoded',
    'Cookie': 'QDHeader=OTNmOTg5NzI5ZTk3NTdmNzE0MTc2Mzg0ZjgxNmMzMTF8NC43Ljd8MTI0MnwyMjA4fEFwcFN0b3JlfDExLjMwfDV8aU9TL2lQaG9uZS9pUGhvbmU4LDJ8MjA0fEFwcFN0b3JlfDN8MzE3MzMzMjkxfDE1Mjg3MTI3OTIwNzh8MHxmOWY4OWViMi0yY2M2LTQ1OTktYjFlMC1iZGZkMmQzZTE5NDk=; appId=12; areaId=40; cmfuToken=N((q6gaUD8EM3wahQI3eulYBAbh7Yc0a-A1n1jG5yzezXP-OUMSf-5rfTxuBt_lBVMLeQsHxVjPXWkxpUIl6cR5x_1amVLXutjPX7z6l9QbbWrsHcOmkP55Gnm8D17_1QOUGSzQ3Zf-cN7qwlDqu5EXHhYLciVJYgW_E1hFF9uxqdHlUwAowt2wnxZWgodHB27EO4-2YfD9SepOmqyxbVA5dWF_XDEAclmj1z2ZFKU6y5Xl8bP3Muz4MLCd_cuQ0n4g2z3MfNCNzvN_brNvfKl8QGQsT9eQfBM_JQdKWtWLD7I1; ywguid=120007091846; ywkey=ywmu7NRkhB91; wal=1',
    'User-Agent': 'QDReaderAppStore/4.77 (iPhone; iOS 11.3.1; Scale/3.00)',
    'Accept-Language': 'zh-Hans-CN;q=1',
    'Accept-Encoding': 'gzip, deflate',
	 'Referer':	'http://ios.qidian.com',
    'QDHeader': 'OTNmOTg5NzI5ZTk3NTdmNzE0MTc2Mzg0ZjgxNmMzMTF8NS4wLjF8MTI0MnwyMjA4fEFwcFN0b3JlfDEwLjMwfDV8aU9TL2lQaG9uZS9pUGhvbmU4LDJ8MjE2fEFwcFN0b3JlfDN8MTg4Mzc4NTIwfDE1MjY1MzYyNTg0NzZ8MHxmOWY4OWViMi0yY2M2LTQ1OTktYjFlMC1iZGZkMmQzZTE5NDk=',
    },
	body:req.query.param
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