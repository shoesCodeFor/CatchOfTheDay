// App logic for ChooChooJS - jQuery and Vanilla JS
// const moment = require('moment');

const now = moment().subtract(1, "years");

function createTimedStops(startTime, interval){
    let firstTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
    let EOD = moment('23:59', "HH:mm").subtract(1, "years");
    let stops = [];
    let currentTime = firstTimeConverted;
    while(currentTime < EOD){
        stops.push(currentTime.format("HH:mm"));
        currentTime = currentTime.add(interval, 'minutes')
        console.log(EOD);
        console.log(currentTime);
    }
    console.log(stops);
    return stops;
}

function getNextStop(currentTime, stopsArr){
    currentTime = currentTime.format("HHmm");
    console.log('Current Time: ' + currentTime);
    let i = 0;
    let oneStop = moment(stopsArr[0], "HH:mm").format("HHmm");
    console.log(oneStop);
    while(currentTime > oneStop){
        i++;
        oneStop = moment(stopsArr[i], "HH:mm").format("HHmm");
    }
    let nextStop = stopsArr[i];
    console.log('Next Stop: ' + nextStop);
    currentTime = moment(currentTime, 'HHmm');
    return nextStop;
}

function waitTime(currentTime, nextStop){
    let meow = now;
    console.log('waitTime function');
    console.log(meow);
    // Difference between the times

    let waitTime = moment(nextStop, 'HH:mm').subtract(1, 'years').diff(moment(now, 'HH:mm'), "minutes");
    console.log("DIFFERENCE IN TIME: " + waitTime + " minutes");
    return waitTime;
}

function Train(_id, tName, dest, sTime, intMin){
    this.id = _id;

    this.name =  tName;

    this.destination = dest;

    this.startTime =  sTime;

    this.tInterval =  intMin;

    this.stops = createTimedStops(this.startTime, this.tInterval);

    this.nextStop = getNextStop(now, this.stops);

    this.waitMins = waitTime(now, this.nextStop, this.id);

    this.shown = true;

    // console.log(this.name);
    // console.log(this.startTime);
    // console.log(this.tInterval);
    // console.log(this.stops);
    // console.log(this.name + ' next stop');
    // console.log(this.nextStop);
    // console.log(this.waitMins);

}


// let trainStops = createTimedStops("11:00", 20);
//
// let nextTrain = getNextStop(now, trainStops);
// waitTime(now, nextTrain);

// var hogwarts = new Train('Hogwarts', '11:00', 35);
// console.log(hogwarts.name);