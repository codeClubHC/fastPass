const axios = require('axios');
const qs = require('qs');
var fs = require('fs'); 

const data = {
    client_id: '',
    client_secret: ''
   };

var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

var secretKey;

axios.post('https://nj-hcrhs.myfollett.com/oauth/rest/v2.0/auth', qs.stringify(data), config)
    .then((res) => {
        console.log('Status: ${res.status}');
        console.log('Body: ', res.data);
        //secretKey = 'Bearer ' + res.data.access_token;
        secretKey = res.data.access_token;
        console.log("secretKey 1 is *" + secretKey + "*");

        var options = {        
           headers:{
                Authorization: ' Bearer ' + secretKey          
          }
        };

        axios.get('https://nj-hcrhs.myfollett.com/query/rest/api/passes?type=Passes&date=2022-02-08', options)
                .then((res) => {
                   console.log("Yay ??");
                   //console.log(`Status: ${res.status}`);
                   //console.log('Body: ', res.data);
                   replaceNames(res.data);
                   fs.writeFile('testData.txt', 
                                JSON.stringify(res.data), 
                                function (err) {
                                  if (err) return console.log(err);
                    });
                 }).catch((err) => {
                 console.log("Caught an error");
                 console.error(err);
                });

    }).catch((err) => {
        console.error(err);
    });


function replaceNames(data)
{
  console.log("Replacing names and id numbers");
  var nameList = fs.readFileSync('names.txt', 'utf8');
  var names = nameList.split('\n');
  var idNum = 244001;

  for (var i = 0; i< data.length; i++) {
    data[i].student.nameView = names[i];
    data[i].student.localId = idNum.toString();
    idNum++;
  } //End for loop over JSON data

} //End replaceNames
    
