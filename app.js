//Definitions
var express = require('express');
var cons = require('consolidate');
var expressLess = require('express-less');
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var app = express()


// Set Mustache as the Template Engine
app.engine('html', cons.mustache);

// Set up Views and Partials
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Set up Static Files
app.use('/', express.static('assets'));

// Set up LESS
app.use('/css', expressLess(__dirname + '/assets/less', { compress: true }));

// Index Page
app.get('/', function (req, res){

	res.render('index',
	  {
		title: 'Home',
		partials : {
			head : '/partials/head',
			header : '/partials/header',
			footer : '/partials/footer'
		}
	  });
});

oracledb.getConnection(
  {
    user          : dbConfig.user,
    password      : dbConfig.password,
    connectString : dbConfig.connectString  //"localhost:1521/oracletest"
  },
  function(err, connection)
  {
    if (err) { console.error(err.message); return; }

    // use connection
			// do something
			console.log("Connections made with :", dbConfig.connectString);

		connection.execute(
			"SELECT *"
	    + "FROM mytest ",
			function(err, result)
		    {
		      if (err) { console.error(err); return; }
		      console.log(result.rows);
	    	}
		);

    // connection.close(
    //   function(err)
    //   {
    //     if (err) { console.error(err.message); }
    //   });
  });

// Set the Server Up
var server = app.listen(80, function() {
	var host = server.address().address
	var port = server.address().port
	console.log('App is listening at http://%s:%s', host, port)
});
