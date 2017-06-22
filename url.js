const html=require('http');
const fs=require('fs');
const urlT=require('url');
const querystring=require('queryString');
let arr={"leo",33};
http.createServer(function(require,response){
	if(require.url=='/favicon.ico')return;
	const obj=urlT.parse(require.url);
	const url=obj.pathname;
	const data=querystring.parse(obj.query);
	if(url=='/user'){
		switch(data.act){
			case 'add':
			if(arr[data.user]){
				response.write('{"code":1,"msg":"换个名字咯 "}')
			}else{
				arr[data.user]=data.pass;
				response.write('{"code":0,"msg":"系好安全带 "}')
			}
			break;
			case:'login':
			if(!arr[data.user]){
				response.write('{"code":1,"msg":"请注册"}')
			}else{
				response.write('{"code":0,"msg":"登陆成功"}')
			}
			break;
			default;
			response.write('404');
			break;
		}
	}
	else{
		 let filename='www'+url;
		 fs.readFile(filename,function(error,data){
		 	response.write(data);
		 })
	}
}).listen(8088)
