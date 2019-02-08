/* JS file for Train Scheduler web app */
  
  
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyA4uCzZTJd4E9hBEYL3qa7iG73JXl3pc0s",
    authDomain: "train-scheduler-9f54a.firebaseapp.com",
    databaseURL: "https://train-scheduler-9f54a.firebaseio.com",
    projectId: "train-scheduler-9f54a",
    storageBucket: "train-scheduler-9f54a.appspot.com",
    messagingSenderId: "699136325860"
};
firebase.initializeApp(config);

$(document).ready(function(){

var database = firebase.database();

$("#submit-button").on("click", function(){
  let trainDetails = {
    trainName: $("#train-name").val().trim(),
    trainDest: $("#train-destination").val().trim(),
    trainFirstTime: $("#train-first-time").val().trim(),
    trainFreq: $("#frequency").val().trim(),
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };
  
  database.ref().push(trainDetails);
  $("#train-name").html("");
  $("#train-destination").html("");
  $("#train-first-time").html("");
  $("#frequency").html("");
});

database.ref().on("child_added", function(snapshot) {
  let nameDisplay = snapshot.val().trainName;
  let destDisplay = snapshot.val().trainDest;
  let frequency = parseInt(snapshot.val().trainFreq);
  let startTime = moment(snapshot.val().trainFirstTime, "HHmm");
    startTime = moment(startTime).format("HH:mm");
      let convertStart = moment(startTime, "HHmm");
  let timeDifference = moment().diff(moment(convertStart), "minutes");
  let remaining = timeDifference % frequency;
  let minutesAway = frequency - remaining;
  let nextTrain = moment().add(minutesAway, "minutes");
    let nextTrainDisplay = moment(nextTrain).format("HH:mm");

  let newRow = $("<tr><td>" + nameDisplay + 
    "</td><td>" + destDisplay +
    "</td><td>" + frequency + 
    "min</td><td>" + nextTrainDisplay +
    "</td><td>" + minutesAway +
    "min</td></tr>");
  $("#train-table").append(newRow);
  });

});

