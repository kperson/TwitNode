var baseConn = require('./base.js');
var ttypes = require('./../gen-nodejs/twitservice_types.js');



exports.search = function(term, memberId, companyName, ticker, since, slug, industry, handle, industrySlug, sector, sectorSlug, showSlugs, order, orderDirection, start, limit, score, onSuccess, onError){
	baseConn.createNewConnection(
		function(client){
			params = [];
			
			if (showSlugs == false){
				select_clause = 'SELECT t.content, t.tweet_id, t.handle, c.ticker, t.profile_img, c.sector, c.industry, c.name AS company_name, UNIX_TIMESTAMP(t.created_at) AS time';			
			}
			else{
	            select_clause = 'SELECT t.content, t.tweet_id, t.handle, c.ticker, t.profile_img, c.sector, c.industry, c.name AS company_name, UNIX_TIMESTAMP(t.created_at) AS time, c.slug, se.slug AS sector_slug, i.slug AS industry_slug';
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
			
			if(score == null){
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
	                    rs.push(t);
	        		}
	        		var s = new ttypes.Search();
	        		s.results = rs;
	        		s.count = set.ct;
	        		s.limit = limit;
	        		s.start = start;
	        		onSuccess(s);
        		}
	        };
	        
	        params2 = [];
	        for(var i = 0; i < params.length; i++){
	        	params2.push(params[i]);
	        }
	        //console.log(select);
	        
	        client.query(select, params, function(error, results, fields){
	        	if(error){
	        		onError(error.message);
	        	}
	        	else{
	        		set.data = results;
	        		onComplete();
	        	}
	        });
	        
	        client.query(select_ct, params2, function(error, results, fields){
	        	if(error){
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