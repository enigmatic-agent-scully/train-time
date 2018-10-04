
// Still haven't solved the mystery problem!

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

    $("#go").on("click", function (event) {
        event.preventDefault();
        console.log($(this));
        console.log(event);
        var train = $("#train").val().trim();
        console.log(train);
        var dest = $("#destination").val().trim();
        console.log(dest);
        var start = $("#start").val().trim();
        console.log(start);
        var time = moment(start);
        console.log(time);
        var freq = $("#frequency").val().trim();
        console.log(freq);
        var now = moment().format("hh:mm a");
        console.log(now);

        var trainData = {
            name: train,
            destination: dest,
            startTime: start,
            frequency: freq,
            nowtime: now,
        };
        console.log(trainData);

        database.ref().push(trainData);
        trainData = {};
        document.getElementById("form").reset();
        return false;
    });

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        var train = childSnapshot.val().name;
        console.log(train);
        var dest = childSnapshot.val().destination;
        console.log(dest);
        var start = childSnapshot.val().startTime;
        console.log(start);
        var freq = childSnapshot.val().frequency;
        console.log(freq);
        var now = childSnapshot.val().nowtime;
        console.log(now);

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
                <td>${train}</td>
                <td>${dest}</td>
                <td>${freq}</td>
                <td>${nextTrain}</td>
                <td>${minTillTrain}</td></tr>`);
    },
        function (errorObject) {
            console.log("Errors handed:" + errorObject.code);
        });


}
)
