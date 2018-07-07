/**
 * We will use node-fetch for testing until we get up and running.  
 */
var fetch = require("node-fetch"); // NODE Only
var sampleAPICall = 'https://data.ct.gov/resource/mty4-w9bf.json?$query=Select%20*%20WHERE%20latitude%20%3E%2041AND%20longitude%3C74';
var fishData;


function getData(URL){
    fetch(URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(APIData) {
            console.log(APIData);
            fishData = APIData;
            console.log('.........');
        });
}

/**
 * This will create a fish query based on a bounding box.
 */
function findFishBB(topLeft, bottomRight){
    let latRange = [topLeft[0], bottomRight[0]];
    let lngRange = [topLeft[1], bottomRight[1]];
    let baseURL = 'https://data.ct.gov/resource/mty4-w9bf.json?$query=Select%20*%20WHERE%20'
    let conditions = encodeURI(
        `latitude < ${latRange[0]} AND latitude > ${latRange[1]} AND longitude > ${lngRange[0]} AND longitude < ${lngRange[1]}`);
    console.log('TEST');
    console.log(conditions);
    baseURL+=conditions;
    console.log(baseURL);
    getData(baseURL);     
}



// Tests

findFishBB([41.907754321521, -73.152064234847], [41.861833, -73.051649]);

// API is Working
// getData();
// setTimeout(()=>{
//     console.log('.........');
//     console.log(fishData);
// }, 5000);



