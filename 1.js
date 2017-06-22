const http = require('http');
const fs = require('fs');
const urlT = require('url');
const querystring = require('querysting');
//querystring.parse();返回值是对象
//http://loaclhost:8888/user?act=add&user=oldGod&pass=123
let dataArr = {'oldGod':12345}
http.createServer(function(require,reponse){
	if(require.url === '/favicon.ico')return;
	const obj = urlT.parse(require.url);
	const url = obj.pathname;//user
	//{act:'add',user:'oldGod',pass:'123'}
	//act = add&user=oldGod&pass=123
	const data = querysting.parse(obj.query);
	if(url === '/user'){
		switch (data.act){
			case 'add':
				if(dataArr[data.user]){
					response.write('{"code":1,"msg":"名字重复"}');
				}else{
					dataArr[data.user] = data.pass;
					response.write('{"code":1,"msg":"成功"}');
				}
			break;
			case 'login':
			
			break;
			default
				response.write('404');
			break;
		}else{
			let filename = 'www' + url;
			fs.readFile(filename,function(error,data){
				response.write(data);
				response.end();
			})
		}
	}
})
