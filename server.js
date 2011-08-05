var config = require('./config.js');

var thrift = require('./thrift/index.js'),
ttransport = require('./thrift/transport.js');

//var thrift = require('thrift');

var API = require('./gen-nodejs/API.js');
var ttypes = require('./gen-nodejs/twitservice_types.js');

var tweetDAO = require('./dao/tweet.js'); 
var validationDAO = require('./dao/validation.js');

//var server = thrift.createServer(API, {
var handler = {
	
	searchTweets: function (term, memberId, companyName, ticker, since, slug, industry, handle, industrySlug, sector, sectorSlug, showSlugs, order, orderDirection, start, limit, score, login, success){
		var args = Array.prototype.slice.call(arguments, 0);
		console.log(args);
		validationDAO.validateLogin('searchTweets', login.username, login.password, function(mgClient){
			tweetDAO.search(mgClient, term, memberId, companyName, ticker, since, slug, industry, handle, industrySlug, sector, sectorSlug, showSlugs, order, orderDirection, start, limit, score, 
				function(resultRs){
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

var server = thrift.createServer(API, handler, {transport: ttransport.TBufferedTransport});
server.listen(9090);