
function login() {

  $("#loginBtn").click(function() {
      var loginReg = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
      var email = $("#inputEmail").val();
      var password = $("#inputPassword").val();
      var $$ = Dom7;
      $$('a').data('user', {
          accountEmail: email
      });

      console.log($$('a').data('user'));


      if (!email || !password) {
          $("#errorMessage").empty();
          $("#errorMessage").text("Empty Fields");
          $("#errorMessage").show();
          $("#errorIcon").show();
      } else if(!(loginReg.test(email))) {
          $("#errorIcon").show();
          $("#errorMessage").empty();
          $("#errorMessage").text("Invalid Email Address");
          $("#errorMessage").show();
      } else {
          $("#errorMessage").hide();
          $("#errorIcon").hide();
          $("#loaderGif").show();
          $("#loginMessage").show();

          aja()
          .method('get')
          .url('http://www.soccer-pro-file.com/api/login')
          .queryString({
              'email':email,
              'password':password
          })
          .on('200', function(response) {
              console.log(response);
              sessionStorage.setItem('curEmail', email);
              window.location.href = "createEvent.html";
          })
          .on('404', function(response) {
              $("#errorMessage").empty();
              $("#errorMessage").text("Incorrect email or password");
              $("#errorMessage").show();
              $("#errorIcon").show();
              $("#loaderGif").hide();
              $("#loginMessage").hide();
          })
          .go()
      }
  });
};

function createEvent() {
  $("#yourEmail").text("Your email: " + sessionStorage.getItem('curEmail'));
  $("#practice").click(function() {
    window.location.href = "ageGroup.html";
  });

  $("#gameEvent").click(function() {
    window.location.href = "ageGroup.html";
  })

  $("#tourneyEvent").click(function() {
    window.location.href = "ageGroup.html";
  })
}

function team() {
  //var accountEmail = "maitiumorton@gmail.com";
  var accountEmail = "maitiumorton@gmail.com";
  var accountType = "coach";
  var ageGroup = 1;
  var teams = [];

  function checkAccountType() {

  }

  function setTDTeams(ageGroups) {
      for(var i = 0; i < ageGroups.length; i++) {
          teams[i] = [];
          teams[i][0] = ageGroups[i].teamName;
          teams[i][1] = ageGroups[i].teamsID;
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

          buttonLink.setAttribute("href", "player.html");
          buttonLink.setAttribute("class", "item-link");
          buttonLink.setAttribute("id", teams[k][1]);

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
      if(accountType == "TD") {
          aja()
          .method("get")
          .url('http://www.soccer-pro-file.com/api/getAgeGroupTeams')
          .queryString({
              ageGroupID: 1
          })
          .on('200',  function(response){
              setTDTeams(response);
              $("#setAttributes").show();

          })
          .on('404', function(response){
              console.log("Age Groups not found");
          })
          .go();

      } else if(accountType == "Coach") {

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

      } else if(accountType == "AgeC") {

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
      window.location.href = "ageGroup.html";
  });

  getTeams();
}

function player() {
  //var accountEmail = "maitiumorton@gmail.com";
  var accountEmail = "maitiumorton@gmail.com";
  var accountType = "coach";
  var players = [];
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date = d.getDate();

  function checkAccountType() {

  }

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

  function populateButtons() {
      var buttonList = document.getElementById("playerButtonList");
      console.log(players.length);
      console.log(players);
      for(var k = 0; k < players.length; k++) {

          var buttonItem = document.createElement("li");
          var buttonLink = document.createElement("a");
          var buttonContent = document.createElement("div");
          var buttonInner = document.createElement("div");
          var buttonTitle = document.createElement("div");
          var buttonText = document.createTextNode(players[k][0]);

          buttonList.appendChild(buttonItem);

          buttonLink.setAttribute("href", "eval.html");
          buttonLink.setAttribute("class", "item-link");
          buttonLink.setAttribute("id", players[k][1]);

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
      aja()
          .method("post")
          .url('http://www.soccer-pro-file.com/api/createEvaluationEvent')
          .queryString({
              teamID: 1,
              evaluatorEmail: accountEmail,
              evaluatorType: accountType,
              eventDate: year + "-" + month + "-" + date,
              eventType: "practice"
          })
          .on('200',  function(response){
              console.log("it Worked");
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
};

function eval() {
  $("#backbutton").click(function(){
    window.location.href = "player.html";
  });

  $('#attitudeScore').on('input change', function() {
    $('#attitudeTitle').text("Attitude: " + $('#attitudeScore').val());
  });

  $('#abilityScore').on('input change', function() {
    $('#abilityTitle').text("Ability: " + $('#abilityScore').val());
  });

  $("#clearBtn").click(function() {
    $("#attitudeCmt").val("");
    $("#abilityCmt").val("");
    $("#attendance").val("Present");
    $("#attitudeScore").val(3);
    $("#abilityScore").val(3);
    $("#abilityTitle").text("Ability: 3");
    $("#attitudeTitle").text("Attitude: 3");
  });

  $("#submitBtn").click(function() {
    var attendance = $("#attendance").val();
    var attitude = $("#attitudeScore").val();
    var attCmt = $("#attitudeCmt").val();
    var ability = $("#abilityScore").val();
    var abilityCmt = $("#abilityCmt").val();
  });
};


function ageGroup() {
    var accountEmail = "maitiumorton@gmail.com";
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
              console.log(response);
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
};
