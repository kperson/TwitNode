struct Company {
	1:string name,
	2:string ticker,
	3:string sector,
	4:string industry,
	5:string slug,
	6:string sectorSlug,
	7:string industrySlug
}

struct Credential{
	1:string username,
	2:string password
}

struct Tweet {
	1:string ticker,
	2:string tweetId,
	3:string content,
	4:string profileImg,
	5:string sector,
	6:string industry,
	7:string handle,
	8:string companyName,
	9:i32 time,
	10:string slug,
	11:string sectorSlug,
	12:string industrySlug
}

struct Search {
	1:list<Tweet> results,
	2:i32 count,
	3:i32 start,
	4:i32 limit
}

struct KV {
	1:string key,
	2:string value,
	3:bool forceUnique = 0
}

struct KVResult{
	1:string memberId,
	2:map<string, string> kvPair
}

exception InvalidCredentialsException{
	1:string message = "Invalid username/password combination"
}

exception DuplicateKeyException{
	1:string message
}

exception ReservedKeyWordException{
	1:string message = "Key can not be name 'memberId'"
}

enum CompanyOrder {
	ADDED_ON = 1,
	NAME = 2,
	INDSUTRY = 3,
	SECTOR = 4,
}

enum SearchOrder {
	NAME = 1,
	HANDLE = 2,
	INDUSTRY = 3,
	SECTOR = 4,
	RELEVANCE = 5,
	TIME = 6
}

enum SearchDirection {
	ASC = 1,
	DESC = 2
}


service API {

	list<Company> getPortfolio(1:string memberId, 2:CompanyOrder order, 3:Credential login),
	void addToPortfolio(1:string memberId, 2:string ticker, 3:Credential login),
	void removeFromPortfolio(1:string memberId, 2:string ticker, 3:Credential login),
	string createMember(1:Credential login),
	Search searchTweets(1:string term, 2:string memberId, 3:string companyName, 4:string ticker, 5:i32 since, 6:string slug, 7:string industry, 8:string handle, 9:string industrySlug, 10:string sector, 11:string sectorSlug, 12:bool showSlugs = 0, 13:SearchOrder searchOrder, 14:SearchDirection searchDirection, 15:i32 start = 0, 16:i32 limit = 50, 17:double score, 18:Credential login),
	void writeKeys(1:list<KV> kvPairs, 2:string memberId, 3:Credential login),
	void deleteKeys(1:list<string> keys, 2:string memberId, 3:Credential login),
	list<map<string, string>> readKeys(1:list<string> keys, 2:map<string, string> criteria, 3:string memberId, 4:Credential login)
}