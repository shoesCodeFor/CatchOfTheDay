// Add TypeAhead plugin for Bootstrap 4

var $input = $(".typeahead");
$input.typeahead({
    source: [
        {id: "someId1", name: "Bluegill"},
        {id: "someId2", name: "Smallmouth Bass"},
        {id: "someId3", name: "Pumpkinseed Sunfish"},
        {id: "someId4", name: "Rainbow Trout"},
        {id: "someId5", name: "Brown Trout"},
        {id: "someId6", name: "Striped Bass"},
        {id: "someId7", name: "Fluke"},
        {id: "someId8", name: "Northern Pike"},
        {id: "someId9", name: "Bluefish"},
        {id: "someId10", name: "Brook Trout"}
    ],
    autoSelect: true
});
$input.change(function() {
    var current = $input.typeahead("getActive");
    if (current) {
        // Some item from your model is active!
        if (current.name == $input.val()) {
            // This means the exact match is found. Use toLowerCase() if you want case insensitive match.
        } else {
            // This means it is only a partial match, you can either add a new item
            // or take the active if you don't want new items
        }
    } else {
        // Nothing is active so it is a new value (or maybe empty value)
    }
});

$('#addSearch').on('click', function (){
    $('#intro-section').fadeOut();
    $('#searchResultPage').fadeIn();
    $('#popup-nav').fadeIn();
    setTimeout(function(){
            
            L.mapquest.key = 'VXLcMs4sGBfYpLAckWsEQtYsqbvfWcGA';
            
            map = L.mapquest.map('map', {
                center: [41.481350259999999,-72.506571899999997],
                layers: L.mapquest.tileLayer('map'),
                zoom: 12
            });
            (function(){
                let bounds = map.getBounds();
                console.log(bounds);
                let topRight = [bounds._northEast.lat, bounds._northEast.lng];
                let bottomLeft = [bounds._southWest.lat, bounds._southWest.lng]
                console.log(topRight);
                console.log(bottomLeft);
                findFishBB(topRight, bottomLeft);
            })();
            map.on('zoom', function(e){
                console.log('Zoom changed');
                console.log(e);
                let bounds = map.getBounds();
                console.log(bounds);
                let topRight = [bounds._northEast.lat, bounds._northEast.lng];
                let bottomLeft = [bounds._southWest.lat, bounds._southWest.lng]
                console.log(topRight);
                console.log(bottomLeft);
                findFishBB(topRight, bottomLeft);

            });
            map.addControl(L.mapquest.control());
    }, 1000);
});