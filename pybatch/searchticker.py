import config
import MySQLdb
import hashlib

import urllib
import urllib2
import re
from xml.dom import minidom

def getText(nodelist):
    rc = []
    for node in nodelist:
        if node.nodeType == node.TEXT_NODE:
            rc.append(node.data)
    return ''.join(rc)

def search_ticker(ticker):
    mysql = MySQLdb.connect(host = config.rhost, user = config.ruser, passwd = config.rpassword, db = config.rdatabase, port = config.rport)
    cursor = mysql.cursor()
    cursor.execute('SET NAMES utf8')
    
    select = 'SELECT IF(n.name IS NOT NULL, n.name, c.name) AS search_name FROM nickname n LEFT OUTER JOIN company c ON n.ticker = c.ticker WHERE c.ticker = %s'
    cursor.execute(select, (ticker))
    set = cursor.fetchall()
    if len(set) == 1:
        search_name = name = set[0][0]
        
        params = { 'result_type' : 'mixed', 'q' : search_name }
        search_url = 'http://search.twitter.com/search.atom'
        
        req = urllib2.Request(search_url,  urllib.urlencode(params))
        response = urllib2.urlopen(req)
        xml = minidom.parse(urllib2.urlopen(req))

        insert = 'INSERT IGNORE INTO tweet (tweet_id, content, handle, ticker, profile_img, created_at, hash_val) VALUES (%s, %s, %s, %s, %s, NOW(), %s)'
        
        insert_data = []         
        entries = xml.getElementsByTagName('entry')
        for node in entries:
            idarr = node.getElementsByTagName('id')[0].firstChild.data.split(':')
            id = idarr[len(idarr) - 1]
            content = node.getElementsByTagName('title')[0].firstChild.data
            link =  node.getElementsByTagName('link')[1]
            profile_img = link.attributes['href'].value
            handle = node.getElementsByTagName('author')[0].getElementsByTagName('name')[0].firstChild.data.split('(')[0].strip()
            urls = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', content)
            strip_url = content
            for url in urls:
                strip_url = strip_url.replace(url, '').strip()
            hash_val = hashlib.sha1(strip_url.encode('utf-8', 'ignore')).hexdigest()
            insert_data.append((id, content.encode('utf-8', 'ignore'), handle, ticker, profile_img, hash_val))
        for item in insert_data:
            cursor.execute(insert, item)
        mysql.commit() 
    mysql.close()
 
if __name__ == '__main__':
    search_ticker('AAPL')