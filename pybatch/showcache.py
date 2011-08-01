import config
from pymongo import Connection
import MySQLdb

dconn = Connection(config.dhost, config.dport)
mongo = dconn[config.ddatabase]

#for item in mongo.search_list.find():
#    print item

print mongo.search_list.count()