/* JS file for Train Scheduler web app */
  
function clockShow() {
  $("#clock").html(moment().format("HH:mm:ss"));
}

clockShow();
setInterval(clockShow, 1000);

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
  const snap = snapshot.val();
  let nameDisplay = snap.trainName;
  let destDisplay = snap.trainDest;
  let frequency = parseInt(snap.trainFreq);
  let firstTime = parseInt(snap.trainFirstTime.replace(":", ""));
    
  startTimeMoment = moment(firstTime, "HH:mm");
    let convertStart = moment(startTimeMoment, "HHmm");

  let timeDifference = convertStart.diff(moment(), "minutes");

  let remaining = Math.abs(timeDifference % frequency);

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

