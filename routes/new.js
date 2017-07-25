var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var formidable = require("formidable");

var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'hyj321321hyj',
	database:'new',
	port:3306,
	connectionLimit:600
});

/* GET users listing. */
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	/*res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");*/
	next();
});

function getUserByName(uname,callback){
	pool.getConnection(function(err,connection){
		var sql = 'select * from login where name = ?';
		connection.query(sql,[uname],function(err,result){
			if(err){
				console.log("ERRor:"+err.message);
				return;
			}
			connection.release();
			console.log("innerggetUserByName");
			callback(err,result);
		})
	})
}

router.post('/newss', function(req, res) {
  	//var one=req.body["name"];
  	/*var two=req.body["age"];
  	res.send({name:one,age:two});*/
  	/*getUserByName(one,function(a,b){
  		res.send(b);
  	})*/
	  console.log('into up ....11');
    var form = new formidable.IncomingForm();  //创建IncomingForm对象
    form.uploadDir = "public/images/";
    //设置上传文件存放的文件夹，可以使用fs.rename()来改变上传文件的存放位置和文件名
    //如果form.uploadDir不赋值，它默认的位置是C:\User\用户名\AppData\Local\Temp
    //form.encoding = "utf-8";  //设定文件的编码
    form.parse(req, function(error, fields, files){
        for (var i in files) {
            var file = files[i];
            var fName = (new Date()).getTime()
            switch (file.type) {
                case "image/jpeg":
                    fName = fName + ".jpg";
                    break;
                case "image/png":
                    fName = fName + ".png";
                    break;
            }
        	var newPath= "public/images/" + fName;
        	fs.renameSync(file.path,newPath);//重命名
        	res.send(newPath);
        };
    });
});

module.exports = router;