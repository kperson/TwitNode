import config
from pymongo import Connection
import MySQLdb

dconn = Connection(config.dhost, config.dport)
mongo = dconn[config.ddatabase]

mysql = MySQLdb.connect(host = config.rhost, user = config.ruser, passwd = config.rpassword, db = config.rdatabase, port = config.rport)

sql = 'SELECT t.tweet_id, t.hash_val, t.content, UNIX_TIMESTAMP(t.created_at) AS created_at, t.handle, t.ticker, t.profile_img, t.score, c.name as company_name, c.industry, c.sector, c.slug, i.slug AS industry_slug, s.slug AS sector_slug FROM tweet t JOIN company c ON t.ticker = c.ticker JOIN industry i ON i.name = c.industry JOIN sector s ON s.name = c.sector WHERE t.score >= 3.0 AND t.denorm = 0 LIMIT 800'
cursor = mysql.cursor()
cursor.execute('SET NAMES utf8')
cursor.execute(sql)
set = cursor.fetchall()
columns = tuple([d[0].decode('utf8') for d in cursor.description])

print 'Data Recieved'

keyword_sql = 'SELECT word FROM keyword WHERE tweet_id = %s'
items = []
if len(set) != 0:
    bound_update = []
    for row in set:
        try:
            word_list = []
            my_dict = dict(zip(columns, row))
            my_dict['created_at'] = int(my_dict['created_at'])
            my_dict['score'] = float(my_dict['score'])
            cursor.execute(keyword_sql, (my_dict['tweet_id']))
            for theword in cursor.fetchall():
                word_list.append(theword[0])
            my_dict['keywords'] = word_list;
            items.append(my_dict)
            bound_update.append((1, my_dict['tweet_id'], my_dict['ticker']))
        except:
            bound_update.append((-1, my_dict['tweet_id'], my_dict['ticker']))
            print 'Error with content: ' + my_dict['content']
    
    mongo.search_list.drop_indexes()
    mongo.search_list.insert(items)
    #mongo.search_list.ensure_index('hash_val', unique = True)
    
    update_sql = 'UPDATE tweet SET denorm = %s WHERE tweet_id = %s AND ticker = %s'
    cursor.executemany(update_sql, bound_update)
    
    mysql.commit()    
    mysql.close()
    dconn.disconnect()