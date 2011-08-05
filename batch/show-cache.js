var sys = require('sys');
var config = require('./../config.js');
var Client = require('mysql').Client;

var baseConn = require('./../dao/base.js');

var Db = require('mongodb').Db,
Connection = require('mongodb').Connection,
Server = require('mongodb').Server,
BSON = require('mongodb').BSONNative;
				
var db = new Db(config.ddatabase, new Server(config.dhost, config.dport, {}), {native_parser:true});
db.open(function(err, db) {
	db.collection('search_cache', function(err, collection){
		collection.find({}, function(err, cursor) {
			cursor.each(function(err, doc) {
				console.log(doc);
				if(doc.term != undefined){
				}
				console.log('');
			});
		});
	});
});