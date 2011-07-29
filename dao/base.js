var sys = require('sys');
var Client = require('mysql').Client;
var config = require('./../config.js');

exports.createNewConnection = function(onConnect, onFailure){
	 var client = new Client();
	 client.user = config.ruser;
	 client.password = config.rpassword;
	 client.host = config.rhost;
	 client.port = config.rport;
	 client.database = config.rdatabase;
	 client.connect(function(error, results){
		 if(error){
			 onFailure(error.message);
		 }
		 else{
			 onConnect(client);
		 }
	 });
};