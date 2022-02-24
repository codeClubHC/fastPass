const axios = require('axios');
const qs = require('qs');

const getKey = async () => 
{
   const url = 'https://nj-hcrhs.myfollett.com/oauth/rest/v2.0/auth'
   var key;
   const data = {
    client_id: '',
    client_secret: ''
   };

   var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded' }  };  
   const request = await axios.post(url, qs.stringify(data), config);
   key = request.data.access_token;
   return key;  
} //End getKey



const getData = async (url, secretKey) =>
{
  var options = { headers:{ Authorization: ' Bearer ' + secretKey } };
  console.log("before axios get");
  try { 
    const res = await axios.get(url, options);
    const d = await res.data;
    return d;
  } catch (e) {
    console.log("e->" + e);
  }
  return null;
} //end getData

//module.exports.getKey = getKey;

module.exports = {
    getKey,
    getData
}
