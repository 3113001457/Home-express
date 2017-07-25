var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var fs=require("fs");
// var formidable = require("formidable");
var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'123456',
	database:'module',
	port:3306,
	connectionLimit:600
});
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
function getUserByName(uname,callback){
    console.log(uname)
	pool.getConnection(function(err,connection){
        var sql="select * from login"
		connection.query(sql,[uname],function(err,result){
			if(err){
				console.log("ERRor:"+err.message);
				return;
			}
			connection.release();
			// console.log("innerggetUserByName");
			callback(err,result);
		})
	})
}


/* GET users listing. */
router.get('/about', function(req, res, next) {
	var n1=req.body['name']
	getUserByName(n1,function(a,b){
        console.log(b)
		res.send(b);
	})
});

module.exports = router;
