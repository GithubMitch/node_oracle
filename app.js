//Definitions
var express = require('express'),
	cons = require('consolidate')
 	expressLess = require('express-less'),
 	oracledb = require('oracledb'),
 	mustache = require('mustache'),
	path = require('path'),
	dbConfig = require('./dbconfig.js');

var app = express()

// changing vars
var query;

// Set Mustache as the Template Engine
app.engine('html', cons.mustache);

// Set up Views and Partials
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Set up Static Files
app.use('/', express.static('assets'));

// Set up LESS
app.use('/css', expressLess(__dirname + '/assets/less', { compress: true }));
// app.use(express.static(path.join(__dirname, '/node_modules')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.get('/login', function (req, res){
	console.log('log in user');
	res.end(JSON.stringify({'myProfile': {}}));
});

// var oracleConnect = oracledb.getConnection(dbConfig);
// var oracleConnect = oracledb.getConnection(dbConfig, function(err, connection){});;

var query = "SELECT * FROM mytest";

var DbConnection = function(query,callback) {//pass callback as parameter
  // creating a oracle connection
  oracledb.getConnection({
	    user          : dbConfig.user,
	    password      : dbConfig.password,
	    connectString : dbConfig.connectString  //"localhost:1521/oracletest"
		},
    function(err, connection) {
      if (err) {
        console.log(err.message);
        return callback(err);
      }
      connection.execute(
        query,
        function(err, result) {
          if (err) {
            console.log(err.message);
            return callback(err);
          }
          // console.log(result.rows); // I get result here
          return callback(null,result.rows); // return result on success
        }
      );
    }
  );
}

// Index Page
app.get('/', function (req, res){
		res.render('index',
			{
			title: 'Home',
			partials : {
					head : '/partials/head',
					header : '/partials/header',
					main : '/partials/main',
					footer : '/partials/footer'
				}
			}
		)
});

app.get('/orctable', function (req, res){
	console.log('GET oracle table');
	DbConnection(query,function(err,result){
		console.log("ORA: Query contents:", result)
		res.end(JSON.stringify(result));
	})
});




// oracledb.getConnection(
//   {
//     user          : dbConfig.user,
//     password      : dbConfig.password,
//     connectString : dbConfig.connectString  //"localhost:1521/oracletest"
//   },
//   function(err, connection, res)
//   {
//     if (err) { console.error(err.message); return; }
//
//     // use connection
// 		// 	do something
// 		console.log("Connections made with :", dbConfig.connectString);
//
// 		connection.execute(
// 			"SELECT *"
// 	    + "FROM mytest ",
// 			function(err, result)
// 		    {
// 		      if (err) { console.error(err); return; }
// 		      console.log(result.rows);
// 					connection.close(
// 						function(err)
// 						{
// 							if (err) { console.error(err.message); }
// 						}
// 					);
// 	    	}
// 		);
//
//
//   });

// Set the Server Up
var server = app.listen(80, function() {
	var host = server.address().address
	var port = server.address().port
	console.log('App is listening at http://%s:%s', host, port)
});
