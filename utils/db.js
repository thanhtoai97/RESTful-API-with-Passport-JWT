const mysql = require('mysql');

var mySQLConnection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'MyNewPass',
  database: 'qlbanhangonline',
  multipleStatements: true
});

mySQLConnection.connect(err => {
  if (!err) {
    console.log('BD Connection succeded');
  } else {
    console.log('DB not connection Error: ' + JSON.stringify(err));
  }
});
