/**
 * We will use node-fetch for testing until we get up and running.  
 */
var fetch = require("node-fetch"); // NODE Only
var sampleAPICall = 'https://data.ct.gov/resource/mty4-w9bf.json?$query=Select%20*%20WHERE%20latitude%20%3E%2041AND%20longitude%3C74';
var fishData;


function getData(){
    fetch(sampleAPICall)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
        });
    }
getData();