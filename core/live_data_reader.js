const aspen = require('./credentials.js');


class ProdDataReader 
{

  static async getPassesData(key)
  {
    return await aspen.getData("https://nj-hcrhs.myfollett.com/query/rest/api/passes?type=Passes&date=2022-02-08", key);
  }

} //end class ProdDataReader

module.exports = ProdDataReader;
