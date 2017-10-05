var name;
var destination;
var start;
var frequency;

var config = {
    apiKey: "AIzaSyDRCfd2akD_ComLwBmRtibfj720iRGd6WE",
    authDomain: "train-scheduler-174bb.firebaseapp.com",
    databaseURL: "https://train-scheduler-174bb.firebaseio.com",
    projectId: "train-scheduler-174bb",
    storageBucket: "train-scheduler-174bb.appspot.com",
    messagingSenderId: "48761171292"
};

firebase.initializeApp(config);

var database = firebase.database();


$("#submit-button").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    start = $("#start-time").val();
    frequency = $("#frequency").val().trim();

    // Code for "Setting values in the database"
    database.ref().push({
        name: name,
        destination: destination,
        start: start,
        frequency: frequency
    });



    //clear form
    $("#train-form").trigger("reset")
})




function renderTableData(sv) {
    startTime = moment(sv.start, "HH:mm").add(-1, "days");
    var currentTime = moment();
    var timeDifference = currentTime.diff(startTime, "minutes");
    var lastTrain = timeDifference % sv.frequency;
    var nextTrain = currentTime.add(sv.frequency - lastTrain, "minutes")
    var nextTrainDisplay = nextTrain.format("h:mm: A")

    //    var minutesAway = nextTrain.diff(currentTime, "minutes")
    //no idea why minutesAway variable doesn't work in the above.. even though it works in the timeDifference declaration

    var minutesAway = nextTrain.diff(moment(), "minutes")


    let newRow = $("<tr>");
    newRow.append($("<td>").text(sv.name));
    newRow.append($("<td>").text(sv.destination));
    newRow.append($("<td>").text(sv.frequency));
    newRow.append($("<td>").text(nextTrainDisplay));
    newRow.append($("<td>").text(minutesAway));
    $("#table-body").append(newRow);
}

database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    renderTableData(sv);

});

//
//$(document).on("ready", function () {
//
//    var frequency = 15;
//    var startTime = moment().hour(21).minute(30).seconds(00);
//    var currentTime = moment();
//    var difference = currentTime.diff(startTime, "minutes");
//    var minutesSinceLastTrain = difference % frequency;
//    var minutesTillNextTrain = frequency - minutesSinceLastTrain;
//
//
//    console.log("start time", startTime)
//    console.log("current time", currentTime)
//    console.log("time difference", difference)
//    console.log("last train", minutesSinceLastTrain)
//    console.log("nex train", minutesTillNextTrain)
//})
