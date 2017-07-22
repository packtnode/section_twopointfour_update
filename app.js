const express = require('express');
const app = express();
const fs = require('file-system');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/'));

app.get("/",function(req,res){
	fs.readFile(__dirname + '/index.html',function(err,data){
		if(!err){
			res.write(data);
		}
		res.end();
	})
})

app.post("/status/new",function(req,res){
	let status = JSON.stringify({"name":req['body']['name'],"status": req['body']['status']});
	fs.writeFile(__dirname + "/posts.json",status,function(err){
		if(err)console.log(err);
	})

})

app.get("/status",function(req,res){
	fs.readFile(__dirname + '/posts.json',function(err,data){
		if(!err){
			res.send(JSON.parse(data));
		}else{
			console.log(err);
		}
	})
})

app.listen(3000,function(err){
	if(err){
		console.log("error:",err);
	}else{
		console.log("listening on port 3000");
	}
})