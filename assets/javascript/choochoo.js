// Initialize Firebase
$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyAMcV07MCzpWAe4zCJK9Es2h94CTRnKuc4",
        authDomain: "fir-project-1-d4265.firebaseapp.com",
        databaseURL: "https://fir-project-1-d4265.firebaseio.com",
        projectId: "fir-project-1-d4265",
        storageBucket: "fir-project-1-d4265.appspot.com",
        messagingSenderId: "315625469189"
    };

    firebase.initializeApp(config);

    var database = firebase.database();
    var train = "";
    var dest = "";
    var start = "";
    var freq = 0;
    var time;

    $("#go").on("click", function (event) {
        event.preventDefault();
        train = $("#train").val().trim();
        dest = $("#destination").val().trim();
        start = $("#start").val().trim();
        freq = $("#frequency").val();

        var trainData = {
            name: train,
            destination: dest,
            startTime: start,
            frequency: freq,
        };
        console.log(trainData);
        database.ref().push(trainData);

        document.getElementById("form").reset();
        return false;
    });

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().startTime);
        console.log(childSnapshot.val().frequency);
        var object = childSnapshot.val();
        var firstTime = moment(object.startTime, "hh:mm a").format();
        console.log(firstTime);
        var diffTime = moment().diff(moment(firstTime), "minutes");
        console.log(diffTime);
        var tRemainder = diffTime % object.frequency;
        console.log(tRemainder);
        var minTillTrain = object.frequency - tRemainder;
        console.log(minTillTrain);
        var nextTrain = moment().add(minTillTrain, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm a");
        $("tbody").append(`<tr>
                <td id="train">${childSnapshot.val().name}</td>
                <td id="destination">${childSnapshot.val().destination}</td>
                <td id="frequency">${childSnapshot.val().frequency}</td>
                <td id="next-arrival">${nextTrain}</td>
                <td id="minutes-away">${minTillTrain}</td></tr>`);
    },
        function (errorObject) {
            console.log("Errors handed:" + errorObject.code);
        });

    function calcTime(object, n) {

    }
}
)
