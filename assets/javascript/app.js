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
    $('#intro-section').hide();
});