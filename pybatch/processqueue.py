import searchticker
import config
import MySQLdb

update = 'UPDATE schedule SET searched = 1 WHERE ticker = %s'
select = 'SELECT ticker FROM schedule WHERE searched = 0 LIMIT 1'

mysql = MySQLdb.connect(host = config.rhost, user = config.ruser, passwd = config.rpassword, db = config.rdatabase, port = config.rport)
cursor = mysql.cursor()
cursor.execute('SET NAMES utf8')

cursor.execute(select)
set = cursor.fetchall()
if len(set) == 1:
    searchticker.search_ticker(set[0][0])
    cursor.execute(update, set[0][0])
mysql.commit()    
mysql.close()