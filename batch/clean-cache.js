var sys = require('sys');
var config = require('./../config.js');
var Client = require('mysql').Client;

var baseConn = require('./../dao/base.js');

var Db = require('mongodb').Db,
Server = require('mongodb').Server;
				
var db = new Db(config.ddatabase, new Server(config.dhost, config.dport, {}), {native_parser:true});
db.open(function(err, db) {
	db.collection('search_cache', function(err, collection){
		collection.remove({created_at : {$lt : Math.round((new Date()).getTime() / 1000) - config.cache_time * 60}});
		db.close();
	});
});