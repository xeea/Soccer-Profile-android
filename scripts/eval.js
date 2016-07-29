var array = JSON.parse(sessionStorage.getItem('evalEvent'));

//checks whether the user is a valid user
function check() {
  if (sessionStorage.getItem('type') == null) {
    //returns the user to the index page if not a valid user
    window.location.href = "index.html";
  }
}

//gets the 'evalEvent' associative array from sessionStorage
var evalEvent = sessionStorage.getItem('evalEvent');

//gets the 'playerID' from sessionStorage
var playerID = sessionStorage.getItem('playerID');

check();

showAttributes(array);

console.log(array.evaluations);

function showAttributes(array) {
  if (array.evaluations[0].dribblingAbility != null) {
    $("#dribblingDiv").show();
  }
  if (array.evaluations[0].energyWorkRate != null) {
    $("#energyDiv").show();
  }
  if (array.evaluations[0].firstTouch != null) {
    $("#firstTouchDiv").show();
  }
  if (array.evaluations[0].gameSense != null) {
    $("#gameSenseDiv").show();
  }
  if (array.evaluations[0].lostPossesionResp != null) {
    $("#lostPossRespDiv").show();
  }
  if (array.evaluations[0].oneOnOneDefending != null) {
    $("#defendingDiv").show();
  }
  if (array.evaluations[0].passingAbility != null) {
    $("#passingDiv").show();
  }
  if (array.evaluations[0].shootingAccuracy != null) {
    $("#shootingDiv").show();
  }
  if (array.evaluations[0].takesInitiative != null) {
    $("#initiativeDiv").show();
  }
  if (array.evaluations[0].technicalAbility != null) {
    $("#techAbilityDiv").show();
  }
}

//changes the 'attendance' title to reflect slider value
$("#backbutton").click(function(){
  window.location.href = "player.html";
});

//changes the 'attitude' title to reflect slider value
$('#attitudeScore').on('input change', function() {
  $('#attitudeTitle').text("Attitude: " + $('#attitudeScore').val());
});

//changes the 'ability' title to reflect slider value
$('#abilityScore').on('input change', function() {
  $('#abilityTitle').text("Ability: " + $('#abilityScore').val());
});

$("#gameSenseScore").on('input change', function() {
  $('#gameSenseTitle').text("Game Sense: " + $("#gameSenseScore").val());
});

$("#energyScore").on('input change', function() {
  $('#energyTitle').text("Energ/Work Rate: " + $("#energyScore").val());
});

$("#techAbilityScore").on('input change', function() {
  $('#techAbilityTitle').text("Technical Ability: " + $("#techAbilityScore").val());
});

$("#lostPossRespScore").on('input change', function() {
  $('#lostPossessionTitle').text("Lost Possession Resp: " + $("#lostPossRespScore").val());
});

$("#initiativeScore").on('input change', function() {
  $('#initiativeTitle').text("Takes Initiative: " + $("#initiativeScore").val());
});

$("#firstTouchScore").on('input change', function() {
  $('#firstTouchTitle').text("First Touch: " + $("#firstTouchScore").val());
});

$("#passingScore").on('input change', function() {
  $('#passingTitle').text("Passing Ability: " + $("#passingScore").val());
});

$("#shootingScore").on('input change', function() {
  $('#shootingTitle').text("Shooting Accuracy: " + $("#shootingScore").val());
});

$("#defendingScore").on('input change', function() {
  $('#defendTitle').text("1-on-1 Defending: " + $("#defendingScore").val());
});

$("#dribblingScore").on('input change', function() {
  $('#dribAbilityTitle').text("Dribbling Ability: " + $("#dribblingScore").val());
});


//gets all the values from the form inputs and sends them to the database
$("#submitBtn").click(function() {
  var eventID = array.event.eventID;
  var player = null;

  var count = 0;
  for (var temp in array.evaluations) {
    if (array.evaluations[count].playerID == sessionStorage.getItem('playerID')) {
      player = temp;
    } else {
      count++;
    }
  }

  //if it finds the player
  if (player) {
    //send the EventID previously recieved.
    array.evaluations[count].eventID = eventID;

    //change all the player's default category values
    array.evaluations[count].playerID = sessionStorage.getItem('playerID');
    array.evaluations[count].attendance = $("#attendance").val();
    array.evaluations[count].attendanceComment = $("#attendanceCmt").val();
    array.evaluations[count].ability = $("#abilityScore").val();
    array.evaluations[count].attitude = $("#attitudeScore").val();
    array.evaluations[count].attitudeComment = $("#attitudeCmt").val();

    //check whether the attributes are visible and change them if not null/visible.
    if ($("#gameSenseDiv").is(":visible")) {
      array.evaluations[count].gameSense = $("#gameSenseScore").val();
    }
    if ($("#energyDiv").is(":visible")) {
      array.evaluations[count].energyWorkRate = $("#energyScore").val();
    }
    if ($("#techAbilityDiv").is(":visible")) {
      array.evaluations[count].technicalAbility = $("#techAbilityScore").val();
    }
    if ($("#lostPossRespDiv").is(":visible")) {
      array.evaluations[count].lostPossesionResp = $("#lostPossRespScore").val();
    }
    if ($("#initiativeDiv").is(":visible")) {
      array.evaluations[count].takesInitiative = $("#initiativeScore").val();
    }
    if ($("#firstTouchDiv").is(":visible")) {
      array.evaluations[count].firstTouch = $("#firstTouchScore").val();
    }
    if ($("#passingDiv").is(":visible")) {
      array.evaluations[count].passingAbility = $("#passingScore").val();
    }
    if ($("#shootingDiv").is(":visible")) {
      array.evaluations[count].shootingAccuracy = $("#shootingScore").val();
    }
    if ($("#defendingDiv").is("visible")) {
      array.evaluations[count].oneOnOneDefending = $("#defendingScore").val();
    }
    if ($("#dribblingDiv").is(":visible")) {
      array.evaluations[count].dribblingAbility = $("#dribblingScore").val();
    }
  }

  aja()
    .method("post")
    .url("http://www.soccer-pro-file.com/api/updateEvaluation")
    .body(array.evaluations[count])
    .on('200',  function(response){
      window.location.href = "player.html";
    })
    .on('404', function(response){
      myApp.alert("Evaluation Unsuccessful", "Error");
    })
    .go();
});


//resets all the values of the options to their defaults
$("#clearBtn").click(function() {
  $("#attendanceCmt").val("");
  $("#attitudeCmt").val("");
  $("#attendance").val("Present");
  $("#attitudeScore").val(3);
  $("#abilityScore").val(3);
  $("#abilityTitle").text("Ability: 3");
  $("#attitudeTitle").text("Attitude: 3");
  $("#gameSenseScore").val(3);
  $('#gameSenseTitle').text("Game Sense: 3");
  $("#energyScore").val(3);
  $('#energyTitle').text("Energy/Work Rate: 3");
  $("#techAbilityScore").val(3);
  $('#techAbilityTitle').text("Technical Ability: 3");
  $("#lostPossRespScore").val(3);
  $('#lostPossessionTitle').text("Lost Possession Resp: 3");
  $("#initiativeScore").val(3);
  $('#initiativeTitle').text("Takes Initiative: 3");
  $("#firstTouchScore").val(3);
  $('#firstTouchTitle').text("First Touch: 3");
  $("#passingScore").val(3);
  $('#passingTitle').text("Passing Ability: 3");
  $("#shootingScore").val(3);
  $('#shootingTitle').text("Shooting Accuracy: 3");
  $("#defendingScore").val(3);
  $('#defendTitle').text("1-on-1 Defending: 3");
  $("#dribblingScore").val(3);
  $('#dribAbilityTitle').text("Dribbling Ability: 3");
});
