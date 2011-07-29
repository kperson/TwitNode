//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;
var ttypes = module.exports = {};
ttypes.CompanyOrder = { 
'ADDED_ON' : 1
,'NAME' : 2
,'INDSUTRY' : 3
,'SECTOR' : 4
}
ttypes.SearchOrder = { 
'NAME' : 1
,'HANDLE' : 2
,'INDUSTRY' : 3
,'SECTOR' : 4
,'RELEVANCE' : 5
,'TIME' : 6
}
ttypes.SearchDirection = { 
'ASC' : 1
,'DESC' : 2
}
var Company = module.exports.Company = function(args){
  this.name = null
  this.ticker = null
  this.sector = null
  this.industry = null
  this.slug = null
  this.sectorSlug = null
  this.industrySlug = null
if( args != null ){  if (null != args.name)
  this.name = args.name
  if (null != args.ticker)
  this.ticker = args.ticker
  if (null != args.sector)
  this.sector = args.sector
  if (null != args.industry)
  this.industry = args.industry
  if (null != args.slug)
  this.slug = args.slug
  if (null != args.sectorSlug)
  this.sectorSlug = args.sectorSlug
  if (null != args.industrySlug)
  this.industrySlug = args.industrySlug
}}
Company.prototype = {}
Company.prototype.read = function(input){ 
  var ret = input.readStructBegin()
  while (1) 
  {
    var ret = input.readFieldBegin()
    var fname = ret.fname
    var ftype = ret.ftype
    var fid   = ret.fid
    if (ftype == Thrift.Type.STOP) 
      break
    switch(fid)
    {
      case 1:      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 2:      if (ftype == Thrift.Type.STRING) {
        this.ticker = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 3:      if (ftype == Thrift.Type.STRING) {
        this.sector = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 4:      if (ftype == Thrift.Type.STRING) {
        this.industry = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 5:      if (ftype == Thrift.Type.STRING) {
        this.slug = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 6:      if (ftype == Thrift.Type.STRING) {
        this.sectorSlug = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 7:      if (ftype == Thrift.Type.STRING) {
        this.industrySlug = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      default:
        input.skip(ftype)
    }
    input.readFieldEnd()
  }
  input.readStructEnd()
  return
}

Company.prototype.write = function(output){ 
  output.writeStructBegin('Company')
  if (null != this.name) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 1)
    output.writeString(this.name)
    output.writeFieldEnd()
  }
  if (null != this.ticker) {
    output.writeFieldBegin('ticker', Thrift.Type.STRING, 2)
    output.writeString(this.ticker)
    output.writeFieldEnd()
  }
  if (null != this.sector) {
    output.writeFieldBegin('sector', Thrift.Type.STRING, 3)
    output.writeString(this.sector)
    output.writeFieldEnd()
  }
  if (null != this.industry) {
    output.writeFieldBegin('industry', Thrift.Type.STRING, 4)
    output.writeString(this.industry)
    output.writeFieldEnd()
  }
  if (null != this.slug) {
    output.writeFieldBegin('slug', Thrift.Type.STRING, 5)
    output.writeString(this.slug)
    output.writeFieldEnd()
  }
  if (null != this.sectorSlug) {
    output.writeFieldBegin('sectorSlug', Thrift.Type.STRING, 6)
    output.writeString(this.sectorSlug)
    output.writeFieldEnd()
  }
  if (null != this.industrySlug) {
    output.writeFieldBegin('industrySlug', Thrift.Type.STRING, 7)
    output.writeString(this.industrySlug)
    output.writeFieldEnd()
  }
  output.writeFieldStop()
  output.writeStructEnd()
  return
}

var Credential = module.exports.Credential = function(args){
  this.username = null
  this.password = null
if( args != null ){  if (null != args.username)
  this.username = args.username
  if (null != args.password)
  this.password = args.password
}}
Credential.prototype = {}
Credential.prototype.read = function(input){ 
  var ret = input.readStructBegin()
  while (1) 
  {
    var ret = input.readFieldBegin()
    var fname = ret.fname
    var ftype = ret.ftype
    var fid   = ret.fid
    if (ftype == Thrift.Type.STOP) 
      break
    switch(fid)
    {
      case 1:      if (ftype == Thrift.Type.STRING) {
        this.username = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 2:      if (ftype == Thrift.Type.STRING) {
        this.password = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      default:
        input.skip(ftype)
    }
    input.readFieldEnd()
  }
  input.readStructEnd()
  return
}

Credential.prototype.write = function(output){ 
  output.writeStructBegin('Credential')
  if (null != this.username) {
    output.writeFieldBegin('username', Thrift.Type.STRING, 1)
    output.writeString(this.username)
    output.writeFieldEnd()
  }
  if (null != this.password) {
    output.writeFieldBegin('password', Thrift.Type.STRING, 2)
    output.writeString(this.password)
    output.writeFieldEnd()
  }
  output.writeFieldStop()
  output.writeStructEnd()
  return
}

var Tweet = module.exports.Tweet = function(args){
  this.ticker = null
  this.tweetId = null
  this.content = null
  this.profileImg = null
  this.sector = null
  this.industry = null
  this.handle = null
  this.companyName = null
  this.time = null
  this.slug = null
  this.sectorSlug = null
  this.industrySlug = null
if( args != null ){  if (null != args.ticker)
  this.ticker = args.ticker
  if (null != args.tweetId)
  this.tweetId = args.tweetId
  if (null != args.content)
  this.content = args.content
  if (null != args.profileImg)
  this.profileImg = args.profileImg
  if (null != args.sector)
  this.sector = args.sector
  if (null != args.industry)
  this.industry = args.industry
  if (null != args.handle)
  this.handle = args.handle
  if (null != args.companyName)
  this.companyName = args.companyName
  if (null != args.time)
  this.time = args.time
  if (null != args.slug)
  this.slug = args.slug
  if (null != args.sectorSlug)
  this.sectorSlug = args.sectorSlug
  if (null != args.industrySlug)
  this.industrySlug = args.industrySlug
}}
Tweet.prototype = {}
Tweet.prototype.read = function(input){ 
  var ret = input.readStructBegin()
  while (1) 
  {
    var ret = input.readFieldBegin()
    var fname = ret.fname
    var ftype = ret.ftype
    var fid   = ret.fid
    if (ftype == Thrift.Type.STOP) 
      break
    switch(fid)
    {
      case 1:      if (ftype == Thrift.Type.STRING) {
        this.ticker = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 2:      if (ftype == Thrift.Type.STRING) {
        this.tweetId = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 3:      if (ftype == Thrift.Type.STRING) {
        this.content = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 4:      if (ftype == Thrift.Type.STRING) {
        this.profileImg = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 5:      if (ftype == Thrift.Type.STRING) {
        this.sector = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 6:      if (ftype == Thrift.Type.STRING) {
        this.industry = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 7:      if (ftype == Thrift.Type.STRING) {
        this.handle = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 8:      if (ftype == Thrift.Type.STRING) {
        this.companyName = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 9:      if (ftype == Thrift.Type.I32) {
        this.time = input.readI32()
      } else {
        input.skip(ftype)
      }
      break
      case 10:      if (ftype == Thrift.Type.STRING) {
        this.slug = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 11:      if (ftype == Thrift.Type.STRING) {
        this.sectorSlug = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 12:      if (ftype == Thrift.Type.STRING) {
        this.industrySlug = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      default:
        input.skip(ftype)
    }
    input.readFieldEnd()
  }
  input.readStructEnd()
  return
}

Tweet.prototype.write = function(output){ 
  output.writeStructBegin('Tweet')
  if (null != this.ticker) {
    output.writeFieldBegin('ticker', Thrift.Type.STRING, 1)
    output.writeString(this.ticker)
    output.writeFieldEnd()
  }
  if (null != this.tweetId) {
    output.writeFieldBegin('tweetId', Thrift.Type.STRING, 2)
    output.writeString(this.tweetId)
    output.writeFieldEnd()
  }
  if (null != this.content) {
    output.writeFieldBegin('content', Thrift.Type.STRING, 3)
    output.writeString(this.content)
    output.writeFieldEnd()
  }
  if (null != this.profileImg) {
    output.writeFieldBegin('profileImg', Thrift.Type.STRING, 4)
    output.writeString(this.profileImg)
    output.writeFieldEnd()
  }
  if (null != this.sector) {
    output.writeFieldBegin('sector', Thrift.Type.STRING, 5)
    output.writeString(this.sector)
    output.writeFieldEnd()
  }
  if (null != this.industry) {
    output.writeFieldBegin('industry', Thrift.Type.STRING, 6)
    output.writeString(this.industry)
    output.writeFieldEnd()
  }
  if (null != this.handle) {
    output.writeFieldBegin('handle', Thrift.Type.STRING, 7)
    output.writeString(this.handle)
    output.writeFieldEnd()
  }
  if (null != this.companyName) {
    output.writeFieldBegin('companyName', Thrift.Type.STRING, 8)
    output.writeString(this.companyName)
    output.writeFieldEnd()
  }
  if (null != this.time) {
    output.writeFieldBegin('time', Thrift.Type.I32, 9)
    output.writeI32(this.time)
    output.writeFieldEnd()
  }
  if (null != this.slug) {
    output.writeFieldBegin('slug', Thrift.Type.STRING, 10)
    output.writeString(this.slug)
    output.writeFieldEnd()
  }
  if (null != this.sectorSlug) {
    output.writeFieldBegin('sectorSlug', Thrift.Type.STRING, 11)
    output.writeString(this.sectorSlug)
    output.writeFieldEnd()
  }
  if (null != this.industrySlug) {
    output.writeFieldBegin('industrySlug', Thrift.Type.STRING, 12)
    output.writeString(this.industrySlug)
    output.writeFieldEnd()
  }
  output.writeFieldStop()
  output.writeStructEnd()
  return
}

var Search = module.exports.Search = function(args){
  this.results = null
  this.count = null
  this.start = null
  this.limit = null
if( args != null ){  if (null != args.results)
  this.results = args.results
  if (null != args.count)
  this.count = args.count
  if (null != args.start)
  this.start = args.start
  if (null != args.limit)
  this.limit = args.limit
}}
Search.prototype = {}
Search.prototype.read = function(input){ 
  var ret = input.readStructBegin()
  while (1) 
  {
    var ret = input.readFieldBegin()
    var fname = ret.fname
    var ftype = ret.ftype
    var fid   = ret.fid
    if (ftype == Thrift.Type.STOP) 
      break
    switch(fid)
    {
      case 1:      if (ftype == Thrift.Type.LIST) {
        {
          var _size0 = 0
          var rtmp3
          this.results = []
          var _etype3 = 0
          rtmp3 = input.readListBegin()
          _etype3 = rtmp3.etype
          _size0 = rtmp3.size
          for (var _i4 = 0; _i4 < _size0; ++_i4)
          {
            var elem5 = null
            elem5 = new ttypes.Tweet()
            elem5.read(input)
            this.results.push(elem5)
          }
          input.readListEnd()
        }
      } else {
        input.skip(ftype)
      }
      break
      case 2:      if (ftype == Thrift.Type.I32) {
        this.count = input.readI32()
      } else {
        input.skip(ftype)
      }
      break
      case 3:      if (ftype == Thrift.Type.I32) {
        this.start = input.readI32()
      } else {
        input.skip(ftype)
      }
      break
      case 4:      if (ftype == Thrift.Type.I32) {
        this.limit = input.readI32()
      } else {
        input.skip(ftype)
      }
      break
      default:
        input.skip(ftype)
    }
    input.readFieldEnd()
  }
  input.readStructEnd()
  return
}

Search.prototype.write = function(output){ 
  output.writeStructBegin('Search')
  if (null != this.results) {
    output.writeFieldBegin('results', Thrift.Type.LIST, 1)
    {
      output.writeListBegin(Thrift.Type.STRUCT, this.results.length)
      {
        for(var iter6 in this.results)
        {
          if (this.results.hasOwnProperty(iter6))
          {
            iter6=this.results[iter6]
            iter6.write(output)
          }
        }
      }
      output.writeListEnd()
    }
    output.writeFieldEnd()
  }
  if (null != this.count) {
    output.writeFieldBegin('count', Thrift.Type.I32, 2)
    output.writeI32(this.count)
    output.writeFieldEnd()
  }
  if (null != this.start) {
    output.writeFieldBegin('start', Thrift.Type.I32, 3)
    output.writeI32(this.start)
    output.writeFieldEnd()
  }
  if (null != this.limit) {
    output.writeFieldBegin('limit', Thrift.Type.I32, 4)
    output.writeI32(this.limit)
    output.writeFieldEnd()
  }
  output.writeFieldStop()
  output.writeStructEnd()
  return
}

var KV = module.exports.KV = function(args){
  this.key = null
  this.value = null
  this.forceUnique = false
if( args != null ){  if (null != args.key)
  this.key = args.key
  if (null != args.value)
  this.value = args.value
  if (null != args.forceUnique)
  this.forceUnique = args.forceUnique
}}
KV.prototype = {}
KV.prototype.read = function(input){ 
  var ret = input.readStructBegin()
  while (1) 
  {
    var ret = input.readFieldBegin()
    var fname = ret.fname
    var ftype = ret.ftype
    var fid   = ret.fid
    if (ftype == Thrift.Type.STOP) 
      break
    switch(fid)
    {
      case 1:      if (ftype == Thrift.Type.STRING) {
        this.key = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 2:      if (ftype == Thrift.Type.STRING) {
        this.value = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 3:      if (ftype == Thrift.Type.BOOL) {
        this.forceUnique = input.readBool()
      } else {
        input.skip(ftype)
      }
      break
      default:
        input.skip(ftype)
    }
    input.readFieldEnd()
  }
  input.readStructEnd()
  return
}

KV.prototype.write = function(output){ 
  output.writeStructBegin('KV')
  if (null != this.key) {
    output.writeFieldBegin('key', Thrift.Type.STRING, 1)
    output.writeString(this.key)
    output.writeFieldEnd()
  }
  if (null != this.value) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2)
    output.writeString(this.value)
    output.writeFieldEnd()
  }
  if (null != this.forceUnique) {
    output.writeFieldBegin('forceUnique', Thrift.Type.BOOL, 3)
    output.writeBool(this.forceUnique)
    output.writeFieldEnd()
  }
  output.writeFieldStop()
  output.writeStructEnd()
  return
}

var KVResult = module.exports.KVResult = function(args){
  this.memberId = null
  this.kvPair = null
if( args != null ){  if (null != args.memberId)
  this.memberId = args.memberId
  if (null != args.kvPair)
  this.kvPair = args.kvPair
}}
KVResult.prototype = {}
KVResult.prototype.read = function(input){ 
  var ret = input.readStructBegin()
  while (1) 
  {
    var ret = input.readFieldBegin()
    var fname = ret.fname
    var ftype = ret.ftype
    var fid   = ret.fid
    if (ftype == Thrift.Type.STOP) 
      break
    switch(fid)
    {
      case 1:      if (ftype == Thrift.Type.STRING) {
        this.memberId = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      case 2:      if (ftype == Thrift.Type.MAP) {
        {
          var _size7 = 0
          var rtmp3
          this.kvPair = {}
          var _ktype8 = 0
          var _vtype9 = 0
          rtmp3 = input.readMapBegin()
          _ktype8= rtmp3.ktype
          _vtype9= rtmp3.vtype
          _size7= rtmp3.size
          for (var _i11 = 0; _i11 < _size7; ++_i11)
          {
            key12 = null
            val13 = null
            key12 = input.readString()
            val13 = input.readString()
            this.kvPair[key12] = val13
          }
          input.readMapEnd()
        }
      } else {
        input.skip(ftype)
      }
      break
      default:
        input.skip(ftype)
    }
    input.readFieldEnd()
  }
  input.readStructEnd()
  return
}

KVResult.prototype.write = function(output){ 
  output.writeStructBegin('KVResult')
  if (null != this.memberId) {
    output.writeFieldBegin('memberId', Thrift.Type.STRING, 1)
    output.writeString(this.memberId)
    output.writeFieldEnd()
  }
  if (null != this.kvPair) {
    output.writeFieldBegin('kvPair', Thrift.Type.MAP, 2)
    {
      output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.STRING, Thrift.objectLength(this.kvPair))
      {
        for(var kiter14 in this.kvPair)        {
          if (this.kvPair.hasOwnProperty(kiter14))
          {
            var viter15 = this.kvPair[kiter14]
            output.writeString(kiter14)
            output.writeString(viter15)
          }
        }
      }
      output.writeMapEnd()
    }
    output.writeFieldEnd()
  }
  output.writeFieldStop()
  output.writeStructEnd()
  return
}

var InvalidCredentialsException = module.exports.InvalidCredentialsException = function(args){
  Thrift.TException.call(this, "InvalidCredentialsException")
  this.name = "InvalidCredentialsException"
  this.message = 'Invalid username/password combination'
if( args != null ){  if (null != args.message)
  this.message = args.message
}}
Thrift.inherits(InvalidCredentialsException, Thrift.TException)
InvalidCredentialsException.prototype.read = function(input){ 
  var ret = input.readStructBegin()
  while (1) 
  {
    var ret = input.readFieldBegin()
    var fname = ret.fname
    var ftype = ret.ftype
    var fid   = ret.fid
    if (ftype == Thrift.Type.STOP) 
      break
    switch(fid)
    {
      case 1:      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      default:
        input.skip(ftype)
    }
    input.readFieldEnd()
  }
  input.readStructEnd()
  return
}

InvalidCredentialsException.prototype.write = function(output){ 
  output.writeStructBegin('InvalidCredentialsException')
  if (null != this.message) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 1)
    output.writeString(this.message)
    output.writeFieldEnd()
  }
  output.writeFieldStop()
  output.writeStructEnd()
  return
}

var DuplicateKeyException = module.exports.DuplicateKeyException = function(args){
  Thrift.TException.call(this, "DuplicateKeyException")
  this.name = "DuplicateKeyException"
  this.message = null
if( args != null ){  if (null != args.message)
  this.message = args.message
}}
Thrift.inherits(DuplicateKeyException, Thrift.TException)
DuplicateKeyException.prototype.read = function(input){ 
  var ret = input.readStructBegin()
  while (1) 
  {
    var ret = input.readFieldBegin()
    var fname = ret.fname
    var ftype = ret.ftype
    var fid   = ret.fid
    if (ftype == Thrift.Type.STOP) 
      break
    switch(fid)
    {
      case 1:      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      default:
        input.skip(ftype)
    }
    input.readFieldEnd()
  }
  input.readStructEnd()
  return
}

DuplicateKeyException.prototype.write = function(output){ 
  output.writeStructBegin('DuplicateKeyException')
  if (null != this.message) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 1)
    output.writeString(this.message)
    output.writeFieldEnd()
  }
  output.writeFieldStop()
  output.writeStructEnd()
  return
}

var ReservedKeyWordException = module.exports.ReservedKeyWordException = function(args){
  Thrift.TException.call(this, "ReservedKeyWordException")
  this.name = "ReservedKeyWordException"
  this.message = 'Key can not be name memberId'
if( args != null ){  if (null != args.message)
  this.message = args.message
}}
Thrift.inherits(ReservedKeyWordException, Thrift.TException)
ReservedKeyWordException.prototype.read = function(input){ 
  var ret = input.readStructBegin()
  while (1) 
  {
    var ret = input.readFieldBegin()
    var fname = ret.fname
    var ftype = ret.ftype
    var fid   = ret.fid
    if (ftype == Thrift.Type.STOP) 
      break
    switch(fid)
    {
      case 1:      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString()
      } else {
        input.skip(ftype)
      }
      break
      default:
        input.skip(ftype)
    }
    input.readFieldEnd()
  }
  input.readStructEnd()
  return
}

ReservedKeyWordException.prototype.write = function(output){ 
  output.writeStructBegin('ReservedKeyWordException')
  if (null != this.message) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 1)
    output.writeString(this.message)
    output.writeFieldEnd()
  }
  output.writeFieldStop()
  output.writeStructEnd()
  return
}

