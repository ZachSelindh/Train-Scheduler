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
  console.log(trainDetails);
  
});

database.ref().on("child_added", function(snapshot) {
  let nameDisplay = snapshot.val().trainName;
  let destDisplay = snapshot.val().trainDest;
  let firstTimeDisplay = snapshot.val().trainFirstTime;
  let freqDisplay = snapshot.val().trainFreq;
  let newRow = $("<tr><td>" + nameDisplay + 
    "</td><td>" + destDisplay +
    "</td><td>" + firstTimeDisplay +
    "</td><td>" + freqDisplay + "</td><td><img src='assets/images/trash-icon.png' class='remove-button'></img></td></tr>");
  var dataKey = 
  $("#train-table").append(newRow);

  $(".remove-button").on("click", function(){
    alert("THIS WORKS");
  });
});


});

