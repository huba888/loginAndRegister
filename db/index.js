const mysql = require('mysql')
const options = require('./config')
const connection = mysql.createConnection(options)
connection.connect()
const execSQL = (sql)=>{
    return new Promise((resolve,reject)=>{
        connection.query(sql,(err,data)=>{
            if(err){
                reject(err)
            }
            resolve(data)
        })
    })
}
module.exports = execSQL