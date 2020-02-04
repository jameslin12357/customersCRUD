var mysql  = require('mysql');
var db = {};

db.query = function(sql){
    var data = {};
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '1',
        database : 'productsCRUD',
        multipleStatements: true
    });
    connection.connect();
    connection.query( sql, function(err,results,fields ) {
        if (err) {
            console.log('数据操作失败');
            throw err;
        } else {
            data["code"] = 0;
            data["msg"] = "";
            data["count"] = results[1][0]["count"];
            data["data"] = results[0];
        }
    } );
    connection.end();



}

     
module.exports = db;

