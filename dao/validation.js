var baseConn = require('./base.js');

exports.validateLogin = function(functionName, username, password, onSuccess, onFailure, onError){
	baseConn.createNewConnection(
		function(client){
			var sql = 'SELECT COUNT(*) AS ct FROM api_permission ap JOIN api_function af ON ap.function_name = af.function_name JOIN api_user au ON ap.api_key = au.api_key WHERE au.api_key = ? AND au.api_secret = ? AND af.function_name = ?';
			client.query(sql, [username, password, functionName], function(error, results, fields){
				if(!error){
					if(results[0]['ct'] == 1){
						onSuccess(client);
					}
					else{
						onFailure();
					}
				}
				else{
					onError(error.message);
				}
			});
		}, 
		function(errMsg) {
			onError(errMsg);
		}
	);
};