function check() {
  if (sessionStorage.getItem('type') == null) {
    window.location.href = "index.html";
  }
}

//var accountEmail = "maitiumorton@gmail.com";
var accountEmail = sessionStorage.getItem('curEmail');
var accountType = sessionStorage.getItem('type');
var team = sessionStorage.getItem('teamID');
var players = [];
var d = new Date();
var year = d.getFullYear();
var month = d.getMonth() + 1;
var date = d.getDate();

check();

function setTDPlayers(ageGroups) {
    var counter = 0;
    for(var i = 0; i < ageGroups.length; i++) {
        for(var t = 0; ageGroups[i][t] != null; t++) {
            for(var p = 0; ageGroups[i][t][p] != null ; p++) {
                players[counter] = [];
                players[counter][0] = ageGroups[i][t][p].firstName + " " + ageGroups[i][t][p].lastName;
                players[counter][1] = ageGroups[i][t][p].playerID;
                counter++;
            }
        }
    }
    populateButtons();
}

function setPlayers(tm) {
    var counter = 0;
    console.log(tm);
    console.log(tm.evaluations);
    for(var pl = 0; tm.evaluations[pl] != null; pl++) {
            players[pl] = [];
            players[pl][0] = tm.evaluations[pl].firstName + " " + tm.evaluations[pl].lastName;
            players[pl][1] = tm.evaluations[pl].playerID;
    }

    populateButtons();
}

function navigateToEvalPage() {
    sessionStorage.setItem('playerID', this.id);
    window.location.href = "eval.html";
}

function populateButtons() {
    var buttonList = document.getElementById("playerButtonList");
    for(var k = 0; k < players.length; k++) {

        var buttonItem = document.createElement("li");
        var buttonLink = document.createElement("a");
        var buttonContent = document.createElement("div");
        var buttonInner = document.createElement("div");
        var buttonTitle = document.createElement("div");
        var buttonText = document.createTextNode(players[k][0]);

        buttonList.appendChild(buttonItem);

        //buttonLink.setAttribute("href", "eval.html");
        buttonLink.setAttribute("class", "item-link");
        buttonLink.setAttribute("id", players[k][1]);
        buttonLink.onclick = navigateToEvalPage;

        buttonItem.appendChild(buttonLink);

        buttonContent.setAttribute("class", "item-content");

        buttonLink.appendChild(buttonContent);

        buttonInner.setAttribute("class", "item-inner");

        buttonContent.appendChild(buttonInner);

        buttonTitle.setAttribute("class", "item-title");

        buttonInner.appendChild(buttonTitle);

        buttonTitle.appendChild(buttonText);
    }
}

function getPlayers() {
  if (sessionStorage.getItem('type') == 1) {
    accountType = 'Coach';
  } else if (sessionStorage.getItem('type') == 2) {
    accountType = 'Technical Director';
  } else if (sessionStorage.getItem('type') == 3) {
    accountType = 'Age Group Coordinator';
  } else {
    console.log("Player.js ERROR");
    return;
  }

    aja()
        .method("post")
        .url('http://www.soccer-pro-file.com/api/createEvaluationEvent')
        .queryString({
            teamID: team,
            evaluatorEmail: accountEmail,
            evaluatorType: accountType,
            eventDate: year + "-" + month + "-" + date,
            eventType: sessionStorage.getItem('event')
        })
        .on('200',  function(response){
            JSON.stringify(response);
            sessionStorage.setItem('evalEvent', JSON.stringify(response));
            setPlayers(response);
        })
        .on('404', function(response){
            console.log("Age Groups not found");
        })
        .go();
}

getPlayers();

$("#backbutton").click(function() {
    window.location.href = "team.html";
});
