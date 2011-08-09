var baseConn = require('./base.js');
var ttypes = require('./../gen-nodejs/twitservice_types.js');
var config = require('./../config.js');

exports.search2 = function(mgClient, term, memberId, companyName, ticker, since, slug, industry, handle, industrySlug, sector, sectorSlug, showSlugs, order, orderDirection, start, limit, score, onSuccess, onError){
	console.log(mgClient);
	var cache_qry = {};
	cache_qry.member_id = memberId == null ? {$exists : false} : memberId;
	cache_qry.term = term == null ? {$exists : false} : term.toLowerCase();
	cache_qry.company_name = companyName == null ? { $exists : false } : companyName;
	cache_qry.ticker = ticker == null ? { $exists : false } : ticker;
	cache_qry.slug = slug == null ? { $exists : false } : slug;
	cache_qry.industry = industry == null ? { $exists : false } : industry;
	cache_qry.ticker = handle == null ? { $exists : false } : handle;
	cache_qry.industry_slug = industrySlug == null ? { $exists : false } : industrySlug;
	cache_qry.sector = sector == null ? { $exists : false } : sector;
	cache_qry.sector_slug = sectorSlug == null ? { $exists : false } : sectorSlug;
	cache_qry.order = order == null ? { $exists : false } : order;
	cache_qry.order_direction = orderDirection == null ? { $exists : false } : orderDirection;
	cache_qry.start = start == null ? { $exists : false } : start;
	cache_qry.limit = limit == null ? { $exists : false } : limit;
	cache_qry.score = score == null ? { $exists : false } : score;
	var ts = Math.round((new Date()).getTime() / 1000);
	cache_qry.created_at = {$gt : since - config.cache_time * 60, $lt : since + config.cache_time * 60};
	cache_qry.added_at = {$gt : ts - config.cache_time * 60};
	
	mgClient.collection('search_cache', function(err, collection){
		collection.findOne(cache_qry, function(error, result){
			if(error){
				mgClient.close();
			}
			if(result == undefined){
				mongoSearch();
			}
			else{
			}
		});
	});
	
	var mongoSearch = function(){
		var qry = {};
		qry.member_id = memberId;
		qry.term = term.toLowerCase();
		qry.company_name = companyName;
		qry.ticker = ticker;
		qry.slug = slug;
		qry.industry = industry;
		qry.ticker = handle;
		qry.industry_slug = industrySlug;
		qry.sector = sector;
		qry.sector_slug = sectorSlug;
		qry.order = order;
		qry.order_direction = orderDirection;
		qry.start = start;
		qry.limit = limit;
		qry.score = { $gte : score };
		qry.created_at = {$gt : since - config.cache_time * 60, $lt : since + config.cache_time * 60};	
		
		var search_list = [];
		if(term != null && term != ''){
			search_list = term.toLowerCase().split(' ');
			
			for(var i = 0; i < search_list.length; i++){
				if(search_list[i] == '' || search_list[i] == ' '){
					search_list.splice(i, 1);
				}
			}
		}
		if(search_list.length > 0){
			var or_list = [];
			for (var i = 0; i < search_list.length; i++){
				or_list.append({ keywords : search_list[i] });
			}
			qry.$or = or_list;
		}
		
		for(var key in qry){
			if(qry[key] == null){
				delete qry[key];
			}
		}
		
		mgClient.collection('search_list', function(error, collection){
			collection.find(qry, function(error, cursor){
				cursor.each(function(err, doc){
					console.log(doc);
				});
			});
		});
		
	};
	
};
exports.search = function(mgClient, term, memberId, companyName, ticker, since, slug, industry, handle, industrySlug, sector, sectorSlug, showSlugs, order, orderDirection, start, limit, score, onSuccess, onError){

	if(memberId == null){
		cache_qry = {};
		cache_qry.term = term == null ? {$exists : false} : term.toLowerCase();
		cache_qry.companyName = companyName == null ? { $exists : false } : companyName;
		cache_qry.ticker = ticker == null ? { $exists : false } : ticker;
		cache_qry.slug = slug == null ? { $exists : false } : slug;
		cache_qry.industry = industry == null ? { $exists : false } : industry;
		cache_qry.ticker = handle == null ? { $exists : false } : handle;
		cache_qry.industrySlug = industrySlug == null ? { $exists : false } : industrySlug;
		cache_qry.sector = sector == null ? { $exists : false } : sector;
		cache_qry.sectorSlug = sectorSlug == null ? { $exists : false } : sectorSlug;
		cache_qry.showSlugs = showSlugs == null ? { $exists : false } : showSlugs;
		cache_qry.order = order == null ? { $exists : false } : order;
		cache_qry.orderDirection = orderDirection == null ? { $exists : false } : orderDirection;
		cache_qry.start = start == null ? { $exists : false } : start;
		cache_qry.limit = limit == null ? { $exists : false } : limit;
		cache_qry.score = score == null ? { $exists : false } : score;
		var ts = Math.round((new Date()).getTime() / 1000);
		cache_qry.since = {$gt : since - config.cache_time * 60, $lt : since + config.cache_time * 60};
		cache_qry.created_at = {$gt : ts - config.cache_time * 60};
		
		mgClient.collection('search_cache', function(err, collection){
			collection.findOne(cache_qry, function(error, result){
				if(error){
					mgClient.close();
				}
				if(result == undefined){
					sqlSearch();
				}
				else{
					mgClient.close();
	        		var rs = [];
	        		var s = new ttypes.Search();
	        		s.count = result.count;
	        		s.limit = result.limit;
	        		s.start = result.start;
	        		for(var i = 0; i < result.data.length; i++){
	        			var my_dict = result.data[i];
	        			var t = new ttypes.Tweet();
	                    t.ticker = my_dict['ticker'];
	                    t.tweetId = my_dict['tweet_id'];
	                    t.content =  my_dict['content'];

	                    t.profileImg = my_dict['profile_img'];
	                    t.sector = my_dict['sector'];
	                    t.industry = my_dict['industry'];
	                    t.handle = my_dict['handle'];
	                    t.companyName = my_dict['company_name'];
	                    t.time = my_dict['time'];
	                    if (showSlugs == true){
	                        t.slug = my_dict['slug'];
	                        t.sectorSlug = my_dict['sector_slug'];
	                        t.industrySlug = my_dict['industry_slug'];
	                    }
	                    rs.push(t);
	        		}
	        		s.results = rs;
	        		onSuccess(s);
				}
					
			});
		});
	}
	
	var sqlSearch = function() {
		baseConn.createNewConnection(
			function(client){
				params = [];
				
				if (showSlugs == false){
					select_clause = 'SELECT t.score, t.content, t.tweet_id, t.handle, c.ticker, t.profile_img, c.sector, c.industry, c.name AS company_name, UNIX_TIMESTAMP(t.created_at) AS time';			
				}
				else{
		            select_clause = 'SELECT t.score, t.content, t.tweet_id, t.handle, c.ticker, t.profile_img, c.sector, c.industry, c.name AS company_name, UNIX_TIMESTAMP(t.created_at) AS time, c.slug, se.slug AS sector_slug, i.slug AS industry_slug';
				}
				
				var search_list = [];
				if(term != null && term != ''){
					search_list = term.toLowerCase().split(' ');
					
					for(var i = 0; i < search_list.length; i++){
						if(search_list[i] == '' || search_list[i] == ' '){
							search_list.splice(i, 1);
						}
					}
				}
							
				var where_clause = [];
				var tweet_where = [];
				
				if(score != null){
					tweet_where.push({key : 'score', value : score, op : '>='});
					params.push(score);
				}
				
				if(since != null){
		            tweet_where.push({key : 'UNIX_TIMESTAMP(created_at)', value : since, op : '>'});	
		            params.push(since);
				}
				
				var join_clause = null;
				if (tweet_where.length != 0){
					tweet_st = [];
					for(var i = 0; i < tweet_where.length; i++){
						tweet_st.push(tweet_where[i].key + tweet_where[i].op + '?');
					}
					join_clause = '(SELECT * FROM tweet WHERE ' + tweet_st.join(' AND ')  + ') t ';
				}
				else{
					join_cluase = 'tweet t ';
				}
				
				if(search_list.length != 0){
					bound_list = [];
					for(var i = 0; i < search_list.length; i++){
						bound_list.push('word=?');
					}
					join_clause += ' JOIN (SELECT COUNT(*) AS rel, tweet_id FROM keyword WHERE ' + bound_list.join(' OR ')  + ' GROUP BY tweet_id) s ON s.tweet_id = t.tweet_id';
				}
				join_clause += ' JOIN company c ON t.ticker = c.ticker JOIN industry i ON i.name = c.industry JOIN sector se ON se.name = c.sector';
				
		        if (memberId != null){
		            join_clause += ' JOIN portfolio p ON t.ticker = p.ticker';
		        }
		            
		        if (companyName != null){
		            where_clause.push({ key : 'c.name', value : companyName, op : '=' });
		        }
		            
		        if (slug != null){
		            where_clause.push({ key : 'c.slug', value : slug, op : '=' });
		        }
		            
		        if (industry != null){
		            where_clause.push({ key : 'c.industry', value : industry, op : '=' });
		        }
		            
		        if (sector != null){
		            where_clause.push({ key : 'c.sector', value : sector, op : '=' });
		        }
		            
		        if (ticker != null){
		            where_clause.push({ key : 'c.ticker', value : ticker, op : '=' });
		        }
		            
		        if (sectorSlug != null){
		            where_clause.push({ key : 'se.slug', value : sectorSlug, op : '=' });
		        }
		            
		        if (industrySlug != null){
		            where_clause.push({ key : 'i.slug', value : industrySlug, op : '=' });
		        }
				
		        where_st = [];
		        for(var i = 0; i < where_clause.length; i++){
					where_st.push(where_clause[i].key + where_clause[i].op + '?');	        	
		        }
		        
		        the_where = where_st.join(' AND ');
		        
		        var select = null; 
		        var select_ct = null;
		        if(where_st.length != 0){
		        	select = select_clause + ' FROM ' + join_clause + ' WHERE ' + the_where;
		        	select_ct = 'SELECT COUNT(*) AS ct FROM ' + join_clause + ' WHERE ' + the_where;
		        }
		        else{
		        	select = select_clause + ' FROM ' + join_clause;
		        	select_ct = 'SELECT COUNT(*) AS ct FROM ' + join_clause;	        	
		        }
		        
		        var dir = null;
		        if(orderDirection == ttypes.SearchOrder.ASC){
		        	dir = 'ASC';
		        }
		        else{
		        	dir = 'DESC';
		        }
		        
		        if (order == ttypes.SearchOrder.NAME){
		        	select += ' ORDER BY c.name ' + dir + ' LIMIT ' + start + ',' + limit;
		            //select = '%s ORDER BY %s %s LIMIT %s, %s' % (select, 'c.name', dir, start, limit);
		        }
		        else if(order == ttypes.SearchOrder.HANDLE){
		        	select += ' ORDER BY t.handle ' + dir + ' LIMIT ' + start + ',' + limit;
		            //select = '%s ORDER BY %s %s LIMIT %s, %s' % (select, 't.handle', dir, start, limit);
		        }
		        else if(order == ttypes.SearchOrder.INDUSTRY){
		        	select += ' ORDER BY c.industry ' + dir + ' LIMIT ' + start + ',' + limit;
		            //select = '%s ORDER BY %s %s LIMIT %s, %s' % (select, 'c.industry', dir, start, limit);
		        }
		        else if (order == ttypes.SearchOrder.SECTOR){
		        	select += ' ORDER BY c.sector ' + dir + ' LIMIT ' + start + ',' + limit;
		           // select = '%s ORDER BY %s %s LIMIT %s, %s' % (select, 'c.sector', dir, start, limit);
				}
				else if(order == ttypes.SearchOrder.RELEVANCE  && search_list.length != 0){
		        	select += ' ORDER BY s.rel ' + dir + ' LIMIT ' + start + ',' + limit;
		            //select = '%s ORDER BY %s %s LIMIT %s, %s' % (select, 's.rel', dir, start, limit);
				}
		        else{
		        	select += ' ORDER BY t.created_at ' + dir + ' LIMIT ' + start + ',' + limit;
		            //select = '%s ORDER BY %s %s LIMIT %s, %s' % (select, 't.created_at', dir, start, limit);
		        }
		       
		        for(var i = 0; i < search_list.length; i++){
		        	params.push(search_list[i]);
		        }
		        
		        for(var i = 0; i < where_clause.length; i++){
		        	params.push(where_clause[i].value);
		        }
	
		        var set = { data : null, ct : null };
		        
		        var onComplete = function(){
		        	if(set.data != null && set.ct != null){
	                    client.end();
		        		var rs = [];
		        		for(var i = 0; i < set.data.length; i++){
		        			var my_dict = set.data[i];
		        			var t = new ttypes.Tweet();
		                    t.ticker = my_dict['ticker'];
		                    t.tweetId = my_dict['tweet_id'];
		                    t.content =  my_dict['content'];
	
		                    t.profileImg = my_dict['profile_img'];
		                    t.sector = my_dict['sector'];
		                    t.industry = my_dict['industry'];
		                    t.handle = my_dict['handle'];
		                    t.companyName = my_dict['company_name'];
		                    t.time = my_dict['time'];
		                    if (showSlugs == true){
		                        t.slug = my_dict['slug'];
		                        t.sectorSlug = my_dict['sector_slug'];
		                        t.industrySlug = my_dict['industry_slug'];
		                    }
		                    console.log(my_dict);
		                    rs.push(t);
		        		}
		        		
		        		
		        		
		        		var s = new ttypes.Search();
		        		s.results = rs;
		        		s.count = set.ct;
		        		s.limit = limit;
		        		s.start = start;
		        		
		        		
		        		cache = {};
		        		cache.term = term == null ? null : term.toLowerCase();
		        		cache.companyName = companyName == null ? null : companyName;
		        		cache.ticker = ticker == null ? null : ticker;
		        		cache.slug = slug == null ? null : slug;
		        		cache.industry = industry == null ? null : industry;
		        		cache.ticker = handle == null ? null : handle;
		        		cache.industrySlug = industrySlug == null ? null : industrySlug;
		        		cache.sector = sector == null ? null : sector;
		        		cache.sectorSlug = sectorSlug == null ? null : sectorSlug;
		        		cache.showSlugs = showSlugs == null ? null : showSlugs;
		        		cache.order = order == null ? null : order;
		        		cache.orderDirection = orderDirection == null ? null : orderDirection;
		        		cache.start = start == null ? null : start;
		        		cache.limit = limit == null ? null : limit;
		        		cache.score = score == null ? null : score;
		        		cache.created_at = Math.round((new Date()).getTime() / 1000);
		        		cache.since = since;
		        		cache.data = set.data;
		        		cache.count = set.ct;
		        		
		        		for(var key in cache){
		        			if(cache[key] == null){
		        				delete cache[key];
		        			}
		        		}
		        		mgClient.collection('search_cache', function(err, collection){
		        			collection.insert(cache, function(err, docs){
		        				mgClient.close();
		        				onSuccess(s);
		        			});
		        		});
	        		}
		        };
		        
		        params2 = [];
		        for(var i = 0; i < params.length; i++){
		        	params2.push(params[i]);
		        }
		        
		        client.query(select, params, function(error, results, fields){
		        	if(error){
	                    client.end();
		        		onError(error.message);
		        	}
		        	else{
		        		set.data = results;
		        		onComplete();
		        	}
		        });
		        
		        client.query(select_ct, params2, function(error, results, fields){
		        	if(error){
	                    client.end();
		        		onError(error.message);
		        	}
		        	else{
		        		set.ct = results[0]['ct'];
		        		onComplete();
		        	}
		        });	        
			}, 
			
			function(message){
				onError(message);
			}
		);
	};
};