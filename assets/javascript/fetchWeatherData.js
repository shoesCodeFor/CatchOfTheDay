var fetch = require("node-fetch");

function getWeatherByCoords(lat, lng){
    /*
    From weather underground......
    $.ajax({
        url : "http://api.wunderground.com/api/0fe12907df8cbe98/geolookup/conditions/q/IA/Cedar_Rapids.json",
        dataType : "jsonp",
        success : function(parsed_json) {
        var location = parsed_json['location']['city'];
        var temp_f = parsed_json['current_observation']['temp_f'];
        alert("Current temperature in " + location + " is: " + temp_f);
        }
        });
     */
    let weatherResponse;
    fetch('http://api.wunderground.com/api/0fe12907df8cbe98/geolookup/conditions/q/' + lat + ',' + lng + '.json')
        .then((response)=>{
            console.log(response);
            return response.json();
        }).then((data) =>{
              // Print to the page
              console.log(data);
              weatherResponse = `
                <h3>${data.current_observation.temperature_string}</h3>
                <img src=\"${weatherIcon(data.current_observation.temp_f, 
                    data.current_observation.local_time_rfc822, data.current_observation.weather)}\">
              `;
              // This is what we'll jQuery into the DOM
              console.log(weatherResponse);
        });
    return weatherResponse;     
}

function weatherIcon(temp, time, condition){
    // It's Always Sunny in Denver... right now
    return "../icons/sun-symbol.svg";
    
    if(temp > 70 && TOD === "daytime" && condition === "Clear"){
        return "sun-symbol.svg"
    }

}
let rightMeow = getWeatherByCoords(39.6849237,-105.1609838);




console.log(rightMeow);