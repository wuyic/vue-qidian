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
  // _csrfToken
  // ywBP6mPHUlzl
  // ywj0ff7NJNgE
  let options = {
    method: req.query.method,
    url:req.query.url,
    headers: {
    'Accept': 'application/json',

    'Cookie': 'QDHeader=OTNmOTg5NzI5ZTk3NTdmNzE0MTc2Mzg0ZjgxNmMzMTF8NS4wLjF8MTI0MnwyMjA4fEFwcFN0b3JlfDEwLjMwfDV8aU9TL2lQaG9uZS9pUGhvbmU4LDJ8MjE2fEFwcFN0b3JlfDN8MTg4Mzc4NTIwfDE1MjY1MzkyMDQyMjB8MHxmOWY4OWViMi0yY2M2LTQ1OTktYjFlMC1iZGZkMmQzZTE5NDk=; appId=12; areaId=40; cmfuToken=N((FHppfswJHslWgJGk_rSecvr6btnxGlOGhsWA0XTPDgwSJO2GydbQ3x9JJGTXC5l_XN7xbjBoZUiSwjCbUfqNJUnu2wR1-2typqtnukEkPaah1ygfEHgyss5f9VU54YVK1IsfOaGbaIYrp1ephU2DKsWo7ss6NblLPxVIky8JlppKb6J78w2nt40P_Hbzqaf9o6cJN0AlWXsExp0CK3MH1FGdGSrOHl9KFAr9uA_KvCp2uHaBCk1M6yKx1SMGCeZU0; ywguid=461199585; ywkey=ywBP6mPHUlzl; _csrfToken=HcCLmmwdrodGmC1ffNGJEk4w6iESJ8W09la333dD; wal=1',
    'User-Agent': 'QDReaderAppStore/4.0.1 (iPhone; iOS 10.3.3; Scale/3.00)',
    'Accept-Language': 'zh-Hans-CN;q=1',
    'Accept-Encoding': 'gzip, deflate',
    'QDHeader': 'OTNmOTg5NzI5ZTk3NTdmNzE0MTc2Mzg0ZjgxNmMzMTF8NS4wLjF8MTI0MnwyMjA4fEFwcFN0b3JlfDEwLjMwfDV8aU9TL2lQaG9uZS9pUGhvbmU4LDJ8MjE2fEFwcFN0b3JlfDN8MTg4Mzc4NTIwfDE1MjY1MzYyNTg0NzZ8MHxmOWY4OWViMi0yY2M2LTQ1OTktYjFlMC1iZGZkMmQzZTE5NDk=',
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

  // }
});

app.listen(5678);
console.log("node服务已经开启，监听端口：5678");
