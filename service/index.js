var express = require('express');
var request = require('request');
var app = express();


app.get('/get', function(req, res){

  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", '*');


  console.log(req.params);//输出index
  console.log(req.query);//输出表单get提交的login_name
  console.log(req.query.url);


  if (!req.query.method) {
    req.query.method = 'get';
  }

  let options = {
    method: req.query.method,
    url:req.query.url,
    headers:{
      'Accept':	'application/json',
      'Cookie':	'  QDHeader=OTNmOTg5NzI5ZTk3NTdmNzE0MTc2Mzg0ZjgxNmMzMTF8NS4wLjF8MTI0MnwyMjA4fEFwcFN0b3JlfDEwLjMwfDV8aU9TL2lQaG9uZS9pUGhvbmU4LDJ8MjE2fEFwcFN0b3JlfDN8MTg4Mzc4NTIwfDE1MjYwMjE2ODM4ODV8MHxmOWY4OWViMi0yY2M2LTQ1OTktYjFlMC1iZGZkMmQzZTE5NDk=; appId=12; areaId=40; cmfuToken=N((rxlb-xMjihpazWgs-2qLPmNA-Y-Uib7zwYg6ptfnDMTiz9c1NUqKPnsSGGwCuYrQemvRJd04sf75WFwQG_S5sk_5xXpp4wf4luO3jXVbC3irbSqku_0arbVEbu5T2UZAqLVYwPIz7eSdRESW4LdV_Pet0HInuS8W7SX_GBYwRwQFwMBuyL5z9wXwPvFIZdNgTiQ9183Cv5RZrHfFU58j9WWY-Tk8ADOQcyVjALQca6Un5Tje2rzI1n9B3IVVdNYO0; ywguid=461199585; ywkey=ywj0ff7NJNgE',
      'User-Agent':	'QDReaderAppStore/5.0.1 (iPhone; iOS 10.3.3; Scale/3.00)',
      'Accept-Language':	'zh-Hans-CN;q=1',
      'Accept-Encoding':	'gzip, deflate',
    }
  };

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
