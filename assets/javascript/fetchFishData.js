/**
 * We will use node-fetch for testing until we get up and running.  
 */
// var fetch = require("node-fetch"); // NODE Only
var sampleAPICall = 'https://data.ct.gov/resource/mty4-w9bf.json?$query=Select%20*%20WHERE%20latitude%20%3E%2041AND%20longitude%3C74';
var fishData;
var fishGroup = [];
var fishingSpots = L.featureGroup();
                

function getData(URL){
    console.log('Within the getData API call' + typeOfFish);
    fishGroup = [];
    fetch(URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(APIData) {
            fishGroup = [];
            map.removeLayer(fishingSpots);
            console.log(APIData);
            fishData = APIData;
            console.log('.........');
            APIData.forEach(element => {
                console.log(element);
                if(element.may_catch.includes(typeOfFish) || element.mc2.includes(typeOfFish) || element.mc3.includes(typeOfFish))
                L.marker([element.latitude, element.longitude])
                    .bindPopup('<div id="area_id' + element.area_id +'"><a target="_blank" href="' + element.area_link + '"><h3>'+ element.area_name + '</h3></a><h4>'
                        + element.may_catch +'</h4><h4>'+ element.mc2 +'</h4>' +
                        '<button class="btn btn-success" onclick="getDetails(\'' +
                        element.area_id + '\')">Get Details</button></div>' + $("<div>").html()
                ).addTo(fishingSpots);
                let spot;
                fishGroup.push(element);
                let listItem = $("<li>");
                let link  = $('<a>');
                link.html('<i class="fas fa-plus-circle"></i>');
                link.on('click', function (){
                    $('#area' + element.area_id).toggleClass('d-none');
                });
                link.prepend(`<h3>${element.area_name}</h3>`);
                listItem.append(link);
                listItem.append('<br>');
                let ul = $('<ul>');
                ul.attr('id', 'area' + element.area_id);
                ul.addClass('d-none');
                ul.prepend('<h5 class="card-title">Most caught fish:</h5>');
                let innerLi = $('<li>')
                innerLi.html(element.may_catch);
                ul.append(innerLi);
                ul.append(`<br><li>${element.mc2}</li>`);
                if(element.mc3 !== undefined || element.mc3 !== null){
                    ul.append(`<br><li>${element.mc3}</li>`);
                }
                ul.append(`<br><button class="btn btn-primary" onclick="getDirections('${element.latitude.toString()},${element.longitude.toString()}')">Get Directions</button>`)
                listItem.append(ul);
                $('#parkList').append(listItem);
            });
            console.log(fishGroup);
            fishingSpots.addTo(map);
        });
        
}

/**
 * This will create a fish query based on a bounding box.
 */
function findFishBB(topRight, bottomLeft, typeOfFish){
    let latRange = [topRight[0], bottomLeft[0]];
    let lngRange = [topRight[1], bottomLeft[1]];
    let baseURL = 'https://data.ct.gov/resource/mty4-w9bf.json?$query=Select%20*%20WHERE%20'
    let conditions = encodeURI(
        `latitude < ${latRange[0]} AND latitude > ${latRange[1]} AND longitude < ${lngRange[0]} AND longitude > ${lngRange[1]}`);
    console.log('TEST');
    console.log(conditions);
    baseURL+=conditions;
    console.log(baseURL);
    getData(baseURL);     
}

function findFishByName(typeOfFish){
    let baseURL;
    
}

function getDirections(address){
    console.log(address);
    L.mapquest.directions().route({
        start: '41.481350259999999,-72.506571899999997',
        end: address
      });
    // L.mapquest.directions();
}
function getDetails(loc_id){

}

// Tests

// findFishBB([41.907754321521, -73.152064234847], [41.861833, -73.051649]);

// API is Working
// getData();
// setTimeout(()=>{
//     console.log('.........');
//     console.log(fishData);
// }, 5000);



