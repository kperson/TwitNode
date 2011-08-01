var Db = require('mongodb').Db,
Server = require('mongodb').Server;
				
var db = new Db(config.ddatabase, new Server(config.dhost, config.dport, {}), {native_parser:true});
db.open(function(err, db) {
	if(err){
		console.log(err.message);
	}
	else{
		db.collection('search_cache', function(err, collection){
			if(err){
				console.log(err.message);
			}
			else{
				collection.ensureIndex(['quick_search', ['term', 1], ['start', 1], ['limit', 1]], function(err, indexName){
					
				});
			}
			db.close();
			
		});
	}
});	