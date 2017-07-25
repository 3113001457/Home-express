/**
 * Created by dell on 2017/7/18.
 */
var express = require('express');
var router = express.Router();
var mysql=require("mysql");

var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'hyj321321hyj',
    database:'module',
    port:3306,
    connectionLimit:600
});
//配置跨域
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
function getUserByName(uname,start,end,callback){
    pool.getConnection(function(err,connection){
        var sql = 'select * from contain where name like "%'+uname+'%" limit '+start+','+end+'';
        connection.query(sql,[uname],function(err,result){
            if(err){
                console.log("ERRor:"+err.message);
                return;
            }
            connection.release();
            callback(err,result);
        })
    })
}
/* GET users listing. */
router.get('/search', function(req, res) {
    var keys= req.query["keys"];
    var start= req.query["start"];
    var end= req.query["end"];
    getUserByName(keys,start,end,function (a,b) {
        res.send(b)
    });

});

module.exports = router;

