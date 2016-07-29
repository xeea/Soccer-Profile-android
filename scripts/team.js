function check() {
  if (sessionStorage.getItem('type') == null) {
    window.location.href = "index.html";
  }
}

//var accountEmail = "maitiumorton@gmail.com";
var accountEmail = sessionStorage.getItem('curEmail');
var accountType = sessionStorage.getItem('type');
var ageGroup = sessionStorage.getItem('ageGroup');
var teams = [];

check();

function setTDTeams(ageGroups) {
    for(var i = 0; i < ageGroups.length; i++) {
        teams[i] = [];
        teams[i][0] = ageGroups[i].teamName;
        teams[i][1] = ageGroups[i].teamID;
    }
    populateButtons();
}

function setTeams(tm) {
    for(var j = 0; j < tm.length; j++) {
        teams[j] = [];
        teams[j][0] = tm[j].teamName;
        teams[j][1] = tm[j].teamID;
    }
    populateButtons();
}

function navigateToPlayerPage() {
    sessionStorage.setItem('teamID', this.id);
    window.location.href = "player.html";
}

function populateButtons() {
    var buttonList = document.getElementById("teamButtonList");
    for(var k = 0; k < teams.length; k++) {

        var buttonItem = document.createElement("li");
        var buttonLink = document.createElement("a");
        var buttonContent = document.createElement("div");
        var buttonInner = document.createElement("div");
        var buttonTitle = document.createElement("div");
        var buttonText = document.createTextNode(teams[k][0]);

        buttonList.appendChild(buttonItem);

        //buttonLink.setAttribute("href", "player.html");
        buttonLink.setAttribute("class", "item-link");
        buttonLink.setAttribute("id", teams[k][1]);
        buttonLink.onclick = navigateToPlayerPage;

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

function getTeams() {
    if (accountType == 2) {
        aja()
        .method("get")
        .url('http://www.soccer-pro-file.com/api/getAgeGroupTeams')
        .queryString({
            ageGroupID: ageGroup
        })
        .on('200',  function(response){
            setTDTeams(response);
            $("#setAttributes").show();
        })
        .on('404', function(response){
            console.log("Age Groups not found");
        })
        .go();

    } else if (accountType == 1) {

        aja()
        .method("get")
        .url('http://www.soccer-pro-file.com/api/getCoachTeams')
        .queryString({
            email:accountEmail
        })
        .on('200', function(response){
            setTeams(response);
        })
        .on('404', function(response){
            console.log("Teams not found");
        })
        .go();

    } else if (accountType == 4) {

        aja()
        .method("get")
        .url('http://www.soccer-pro-file.com/api/getCoordinatorTeams')
        .queryString({
            email:accountEmail
        })
        .on('200', function(response){
            setTeams(response);
        })
        .on('404', function(response){
            console.log("Teams not found");
        })
        .go();

    }
}
$("#backbutton").click(function() {
  if (sessionStorage.getItem('type') == 1) {
      window.location.href = "createEvent.html";
  } else {
      window.location.href = "ageGroup.html";
  }

});

getTeams();
