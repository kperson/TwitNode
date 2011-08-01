var sys = require('sys');
var config = require('./../config.js');
var Client = require('mysql').Client;

var baseConn = require('./../dao/base.js');

var Db = require('mongodb').Db,
Connection = require('mongodb').Connection,
Server = require('mongodb').Server,
BSON = require('mongodb').BSONNative;


function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

baseConn.createNewConnection(function(client){
	var sql = 'SELECT ap.function_name, ap.api_key, ai.api_secret FROM api_permission ap JOIN api_user ai ON ai.api_key = ap.api_key ORDER BY api_key';
	client.query(sql, [], function(error, results, fields){
		client.end();
		if(!error){
			if(results.length > 0){
				var t_code_val = randomString();
				var cacheItem = {api_key : results[0]['api_key'], api_secret : results[0]['api_secret'], permissions : []};
				var set = [];
				for(var i = 0; i < results.length; i++){
					var currRow = results[i];
					if(cacheItem.api_key != currRow['api_key']){
						set.push(cachItem);
						cacheItem =  {api_key : results[i]['api_key'], api_secret : results[i]['api_secret'], permissions : []};
					}
					cacheItem.permissions.push(currRow['function_name']);
				}
				cacheItem.t_code = t_code_val;
				set.push(cacheItem);
				
				var db = new Db(config.ddatabase, new Server(config.dhost, config.dport, {}), {native_parser:true});
				db.open(function(err, db) {
					if(!err){
						db.collection('api_cache', function(err, collection){
							collection.ensureIndex(['login', ['api_key', 1], ['api_secret', 1]], function(err, indexName){
								collection.insert(set, function(err, docs){
									var deleteCt = 0;
									for(var i = 0; i < set.length; i++){
										var index = i;
										collection.remove({api_key : set[index].api_key, t_code : {$ne : set[index].t_code}});
										deleteCt++;
										if(deleteCt == set.length){
											db.close();
										}
									}
								});
							});
						});
					}
					else{
						console.log(err.message);
					}
				});
			}
		}
	},
	function(errMsg){
		console.log(errMsg);
	});
});