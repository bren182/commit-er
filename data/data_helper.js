const { json } = require('express');

const fs = require('node:fs');

var obj = {
    
}

function appendData(data) {
    // data must be in json format.
    fs.readFile("data/users_data.json", "utf-8", function readCallBack(err,data) {
        if(err) {
            console.error(err);
        } else {
 
            obj = JSON.parse(data);
            obj.push(data)
            var json  = JSON.stringify(obj);
  
            appendData(json);
        }
    });
}


 function showStats() {
    var readResult = fs.readFileSync("data/users_data.json", "utf-8", function readCallBack(err, data) {
        if (err) {
            console.error(err);
        } 
    }).toString();
    

    var jsonObject = JSON.parse(readResult);

    return jsonObject;
}


module.exports = {
    appendData,
    showStats
}