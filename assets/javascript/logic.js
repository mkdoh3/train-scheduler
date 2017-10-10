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

    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    start = $("#start-time").val();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        start: start,
        frequency: frequency
    });


    $("#train-form").trigger("reset")
})




function renderTableData(sv) {
    startTime = moment(sv.start, "HH:mm").add(-1, "days");
    var currentTime = moment();
    var timeDifference = currentTime.diff(startTime, "minutes");
    var lastTrain = timeDifference % sv.frequency;
    console.log("before add", currentTime)
    var nextTrain = currentTime.add(sv.frequency - lastTrain, "minutes")
    console.log("after add", currentTime)
    var nextTrainDisplay = nextTrain.format("h:mm: A")
    //the .add method from ln 48 redefines currentTime, so it can't be passed in again on ln 52
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
