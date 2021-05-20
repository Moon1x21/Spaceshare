// get the client
const mysql = require('mysql2');
 
// create the connection to database
module.exports=  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});