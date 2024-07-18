const express = require('express')
const mysql = require('mysql2')

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Adish@2002',
    database:'final'
})


const queryDB = (query) =>{
    return new Promise((resolve,reject)=>{
        connection.query(query, async (err, result) => {
            if (err){
                console.log(err);
                reject(err);
            }
            else {
                resolve(result)
            }
        })
    })
    
}


module.exports = {connection,queryDB};