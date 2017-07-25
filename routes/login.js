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
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
function getUserByName(uname,callback){
    pool.getConnection(function(err,connection){
        var sql = 'select * from list';
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
/* GET users listing. */
router.get('/lo', function(req, res) {
    getUserByName(null,function (a,b) {
        res.send(b)
    });

});

module.exports = router;
