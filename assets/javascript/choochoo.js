$(document).ready(function() {
  var config = {
    apiKey: 'AIzaSyAMcV07MCzpWAe4zCJK9Es2h94CTRnKuc4',
    authDomain: 'fir-project-1-d4265.firebaseapp.com',
    databaseURL: 'https://fir-project-1-d4265.firebaseio.com',
    projectId: 'fir-project-1-d4265',
    storageBucket: 'fir-project-1-d4265.appspot.com',
    messagingSenderId: '315625469189'
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $('#go').on('click', function(event) {
    event.preventDefault();
    var freq = $('#frequency')
      .val()
      .trim();
    if (parseInt(freq) === NaN) {
      alert('Please enter a number!');
    } else {
      var train = $('#train')
        .val()
        .trim();
      var dest = $('#destination')
        .val()
        .trim();
      var start = $('#start')
        .val()
        .trim();

      var now = moment().format('hh:mm a');

      var trainData = {
        name: train,
        destination: dest,
        startTime: start,
        frequency: freq,
        nowtime: now
      };

      database.ref().push(trainData);
      trainData = {};
      document.getElementById('form').reset();
      return false;
    }
  });

  database.ref().on(
    'child_added',
    function(childSnapshot) {
      var train = childSnapshot.val().name;
      var dest = childSnapshot.val().destination;
      var freq = childSnapshot.val().frequency;
      var object = childSnapshot.val();
      var firstTime = moment(object.startTime, 'hh:mm a').format();
      var diffTime = moment().diff(moment(firstTime), 'minutes');
      var tRemainder = diffTime % object.frequency;
      var minTillTrain = object.frequency - tRemainder;
      var nextTrain = moment().add(minTillTrain, 'minutes');
      nextTrain = moment(nextTrain).format('hh:mm a');

      $('tbody').append(`<tr>
                <td>${train}</td>
                <td>${dest}</td>
                <td>${freq}</td>
                <td>${nextTrain}</td>
                <td>${minTillTrain}</td></tr>`);
    },
    function(errorObject) {
      console.log('Errors handed:' + errorObject.code);
    }
  );
});
