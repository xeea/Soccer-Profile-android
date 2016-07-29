
var accountEmail = sessionStorage.getItem('curEmail');
var ageGroups = [];
//var $$ = Dom7;
//console.log($$('a').data('user'));

function getAgeGroups() {
    aja()
        .method("get")
        .url('http://www.soccer-pro-file.com/api/getTDTeams')
        .queryString({
            email: accountEmail
        })
        .on('200',  function(response){
            setAgeGroups(response);
            $("#setAttributes").show();

        })
        .on('404', function(response){
            console.log("Age Groups not found");
        })
        .go();
}

function setAgeGroups(ag) {
    for(var i = 0; i < ag.length; i++){
        ageGroups[i] = [];
        ageGroups[i][0] = ag[i].ageGroup;
        ageGroups[i][1] = ag[i].ageGroupID;
    }
    populateButtons();
}

function populateButtons() {
    var buttonList = document.getElementById("buttonList");
    for(var t = 0; t < ageGroups.length; t++) {

        var buttonItem = document.createElement("li");
        var buttonLink = document.createElement("a");
        var buttonContent = document.createElement("div");
        var buttonInner = document.createElement("div");
        var buttonTitle = document.createElement("div");
        var buttonText = document.createTextNode(ageGroups[t][0]);

        buttonList.appendChild(buttonItem);

        buttonLink.setAttribute("href", "team.html");
        buttonLink.setAttribute("class", "item-link");
        buttonLink.setAttribute("id", ageGroups[t][1]);
        buttonLink.onclick = function() {
          sessionStorage.setItem('ageGroup', this.id);
          window.location.href = "team.html";
        }

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

$("#backbutton").click(function() {
    window.location.href = "createEvent.html";
});

getAgeGroups();
