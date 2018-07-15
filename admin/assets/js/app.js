// App logic COTD Admin Panel

function NutritionalVal(id, name, calories, calsFromFat, fat, satFat, cholesterol, sodium,
               potassium, carbs, protein, vitA, vitC, calcium, iron){
    this.id = id;
    this.name =  name;
    this.calories =  calories;
    this.calsFromFat = calsFromFat;
    this.fat = fat;
    this.satFat = satFat;
    this.cholesterol = cholesterol;
    this.sodium = sodium;
    this.potassium = potassium;
    this.carbs = carbs;
    this.protein = protein;
    this.vitA = vitA;
    this.vitC = vitC;
    this.calcium = calcium;
    this.iron = iron;
    this.shown = true;
}
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCzwfH6lnSFuIKtXSONA-4tzPQMZo1qwr8",
    authDomain: "catchoftheday-498d0.firebaseapp.com",
    databaseURL: "https://catchoftheday-498d0.firebaseio.com",
    projectId: "catchoftheday-498d0",
    storageBucket: "catchoftheday-498d0.appspot.com",
    messagingSenderId: "400273781822"
};

firebase.initializeApp(config);
// Init the DB
var database = firebase.database();
var dbState;
var oldKeys = [];

// Get data from DB
database.ref().on("value", function(snapshot) {
    // Set the state to a var
    dbState = snapshot.val();
    console.log(dbState);

    // Lets get some keys
    let keys = Object.keys(dbState);


    console.log(keys);
    if(!newData(keys, oldKeys)){
        console.log('We got new data');
        fillTable(keys, dbState);
    }
    oldKeys = Object.keys(dbState);
    // Change the HTML using jQuery to reflect the updated clickCounter value
    // $("#click-value").text(snapshot.val().clickCount);
    // Alternate solution to the above line
    // $("#click-value").html(clickCounter);

    // If any errors are experienced, log them to console.
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});
function updateData(){
    // Get data from DB
    database.ref().on("value", function(snapshot) {
        // Set the state to a var
        dbState = snapshot.val();
        console.log(dbState);

        // Lets get some keys
        let keys = Object.keys(dbState);


        console.log(keys);
        if(!newData(keys, oldKeys)){
            console.log('We got new data');
            fillTable(keys, dbState);
        }
        oldKeys = Object.keys(dbState);
        // Change the HTML using jQuery to reflect the updated clickCounter value
        // $("#click-value").text(snapshot.val().clickCount);
        // Alternate solution to the above line
        // $("#click-value").html(clickCounter);

        // If any errors are experienced, log them to console.
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}
// setInterval(function () {
//     updateData();
// }, 15000);

function fillTable(keyArr, state){
    console.log('Filling the table...')
    let table = $('#nutrition');
    table.empty();
    for(let i = 0; i < keyArr.length; i++){
        console.log(state[keyArr[i]]);
        let row = state[keyArr[i]];
        let nuteRow = new NutritionalVal(keyArr[i], row.name, row.calories, row.calsFromFat,
            row.fat, row.satFat, row.cholesterol, row.sodium, row.potassium, row.carbs,
            row.protein, row.vitA, row.vitC, row.calcium, row.iron,);
        let rowHTML = `
                        <tr id="${keyArr[i]}" class="table-light">
                        <th scope="row">${nuteRow.name}</th>
                        <td>${nuteRow.calories}</td>
                        <td>${nuteRow.calsFromFat}</td>
                        <td>${nuteRow.fat}</td>
                        <td>${nuteRow.satFat}</td>
                        <td>${nuteRow.cholesterol}</td>
                        <td>${nuteRow.sodium}</td>
                        <td>${nuteRow.potassium}</td>
                        <td>${nuteRow.carbs}</td>
                        <td>${nuteRow.protein}</td>
                        <td>${nuteRow.vitA}</td>
                        <td>${nuteRow.vitC}</td>
                        <td>${nuteRow.calcium}</td>
                        <td>${nuteRow.iron}</td>
                        <td><i class="far fa-trash-alt" onclick="deleteVal('${keyArr[i]}')"></i></td>
                        </tr>
                    `;
        table.append(rowHTML);
    }
}


function newData(arr1, arr2){
    let theBiggerOne = arr1.length;
    if(arr2.length > theBiggerOne){
        theBiggerOne = arr2.length;
    }
    for(let i = 0; i < theBiggerOne; i++){
        if(arr1[i] !== arr2[i]){
            return false;
        }
    }
    return true;
}

function deleteVal(id){
    console.log(id);
    $('#' + id).remove();
    database.ref(id).remove();
}

function formSubmit(){
    /**
     * @type {jQuery}
     */
    let name = $('#fishName').val();
    let calories = $('#fishCals').val();
    let calsFromFat = $('#fishCalsFromFat').val();
    let fat = $('#fishFat').val();
    let satFat = $('#fishSatFat').val();
    let cholesterol = $("#fishCholesterol").val();
    let sodium = $("#fishSodium").val();
    let potassium = $('#fishPotassium').val();
    let carbs = $("#fishCarbs").val();
    let protein = $("#fishProtein").val();
    let vitA = $("#fishVitA").val();
    let vitC = $("#fishVitC").val();
    let calcium = $("#fishCalcium").val();
    let iron = $("#fishIron").val();

    console.log("Name: " + name + 'Cal:' + calories + calsFromFat);
    postToDB(name, calories, calsFromFat, fat, satFat, cholesterol, sodium,
        potassium, carbs, protein, vitA, vitC, calcium, iron);
    document.getElementById("fishNutes").reset();
}

function postToDB(_name, _calories, _calsFromFat, _fat, _satFat, _cholesterol, _sodium,
                  _potassium, _carbs, _protein, _vitA, _vitC, _calcium, _iron){
    // Code for handling the push
    database.ref().push({
        name: _name,
        calories: _calories,
        calsFromFat: _calsFromFat,
        fat: _fat,
        satFat: _satFat,
        cholesterol: _cholesterol,
        sodium: _sodium,
        potassium: _potassium,
        carbs: _carbs,
        protein: _protein,
        vitA: _vitA,
        vitC: _vitC,
        calcium: _calcium,
        iron: _iron,
        shown: true,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
}
