var express = require("express");
var app = express();
var request =require("request");
app.set("view engine","ejs");
app.get("/",function(req,res){
	res.render("search");
});
app.get("/results",function(req,res){
	//res.send("hello there");
	var search = req.query.search;
	var type = req.query.type;
	request("http://www.omdbapi.com/?s="+search+"&type="+type+"&apikey=e4f587c6",function(error,response,body){
		if(!error&&response.statusCode==200){
			var data =JSON.parse(body);
			//res.send(data);
			res.render("results",{data:data});
		}

	});
});
app.get("/title",function(req,res){
	//res.send("hello there");
	var search = req.query.search;
	var year = req.query.year;
	var plot = req.query.plot;
	var type = req.query.type
	request("http://www.omdbapi.com/?t="+search+"&y="+year+"&type="+type+"&plot="+plot+"&apikey=e4f587c6",function(error,response,body){
		if(!error&&response.statusCode==200){
			var data =JSON.parse(body);
			//res.send(data);
			res.render("title",{data:data});

		}

	});
});

app.listen(3001,function(){
	console.log("movie app has started");
});