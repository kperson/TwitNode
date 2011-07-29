var config = require('./config.js');

var thrift = require('thrift');

var API = require('./gen-nodejs/API.js');
var ttypes = require('./gen-nodejs/twitservice_types.js');

var tweetDAO = require('./dao/tweet.js'); 
var validationDAO = require('./dao/validation.js');

//var server = thrift.createServer(API, {
var handler = {
	
	searchTweets: function (term, memberId, companyName, ticker, since, slug, industry, handle, industrySlug, sector, sectorSlug, showSlugs, order, orderDirection, start, limit, score, login, success){
validationDAO.validateLogin('searchTweets', login.username, login.password, function(client){
			tweetDAO.search(term, memberId, companyName, ticker, since, slug, industry, handle, industrySlug, sector, sectorSlug, showSlugs, order, orderDirection, start, limit, score, 
				function(resultRs){
                                     client.end();
		console.log(server.connections);
					success(resultRs);

				},function(err){ handler.defaultRandomError(err);});
		}, 
		function(){ handler.defaultLoginFailure();}, function(err){handler.defaultRandomError(err);} );
	},
	
	defaultLoginFailure: function(){
	},
	
	defaultRandomError: function(err){
		console.log(err);
	}	
	
};

//handler.searchTweets2({username : 'kelton', password : 'person'});

var server = thrift.createServer(API, handler);
server.listen(9090);