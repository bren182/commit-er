const { json } = require('express');
const moment = require('moment');
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

function HasNotCommitted() {
    var readResult = fs.readFileSync('data/users_data.json',"utf-8", function readCallBack(err,data) {
        if(err) {
            console.error(err);
        }
    }).toString();

    var jsonObject = JSON.parse(readResult);
    var filteredDates = jsonObject.filter(date => date.date >= moment().format('YYYY-MM-DD'));

    if(filteredDates.length == 0) {
        return [false, moment().format("YYYY-MM-DD hh:mm:ss") + "\r\n" + "No commits yet! Get on it!"];
    }
    else {
        return [true, "Comitted! " + filteredDates[0].date + " " + filteredDates[0].message];
    }
}
console.log(HasNotCommitted());


module.exports = {
    appendData,
    showStats,
    HasNotCommitted
}