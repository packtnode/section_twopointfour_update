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


app.listen(3000,function(err){
	if(err){
		console.log("error:",err);
	}else{
		console.log("listening on port 3000");
	}
})