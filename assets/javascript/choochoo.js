var name = "";
var dest = "";
var start = "";
var freq = "";

var database = firebase.database();

$("#go").click(function (event) {
    event.preventDefault();
    name = $("#name").val().trim();
    console.log(name);
    dest = $("#destination").val().trim();
    console.log(dest);
    start = $("#first-time").val();
    console.log(start);
    freq = $("#frequency").val();
    console.log(freq);

    database.ref().push({
        name: name,
        dest: dest,
        start: start,
        freq: freq,
    });
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().dest);
    console.log(childSnapshot.val().start);
    console.log(childSnapshot.val().freq);



    $("tbody").append(`<tr>
    <td id="name">${childSnapshot.val().name}</td>
    <td id="destination">${childSnapshot.val().dest}</td>
    <td id="frequency">${childSnapshot.val().freq}</td>
    <td id="next-arrival"></td>
    <td id="minutes-away"></td></tr>`)
}, function(errorObject){
    console.log("Errors handed:" + errorObject.code);
});
