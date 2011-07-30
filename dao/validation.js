var baseConn = require('./base.js');
var Db = require('mongodb').Db,
Connection = require('mongodb').Connection,
Server = require('mongodb').Server,
BSON = require('mongodb').BSONNative;
var config = require('./../config.js');


exports.validateLogin = function(functionName, username, password, onSuccess, onFailure, onError){
	var db = new Db(config.ddatabase, new Server(config.dhost, config.dport, {}), {native_parser:true});
	db.open(function(err, db) {
		db.collection('api_cache', function(err, collection){
			collection.count({ api_key : username, api_secret : password, permissions : functionName  }, function(err, results){
				if(results == 1){
					onSuccess(db);
					/*baseConn.createNewConnection(
						function(client){
							onSuccess(client);
						},
						function(err){
							onError(err);
						}
					);*/
				}
				else{
					onFailure();
				}
			});
		});
	});
	
	/*
	baseConn.createNewConnection(
		function(client){
			var sql = 'SELECT COUNT(*) AS ct FROM api_permission ap JOIN api_function af ON ap.function_name = af.function_name JOIN api_user au ON ap.api_key = au.api_key WHERE au.api_key = ? AND au.api_secret = ? AND af.function_name = ?';
			client.query(sql, [username, password, functionName], function(error, results, fields){
				if(!error){
					if(results[0]['ct'] == 1){
						onSuccess(client);
					}
					else{
						client.end();
						onFailure();
					}
				}
				else{
					client.end();
					onError(error.message);
				}
			});
		}, 
		function(errMsg) {
			onError(errMsg);
		}
	);*/
};