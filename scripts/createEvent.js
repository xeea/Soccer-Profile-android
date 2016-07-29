$("#practice").click(function() {
  sessionStorage.setItem('event', 'practice');
  if (sessionStorage.getItem('type') == 1) {
    window.location.href = "team.html";
  } else {
    window.location.href = "ageGroup.html";
  }
})

$("#gameEvent").click(function() {
  sessionStorage.setItem('event', 'game');
  if (sessionStorage.getItem('type') == 1) {
    window.location.href = "team.html";
  } else {
    window.location.href = "ageGroup.html";
  }
})

$("#tourneyEvent").click(function() {
  sessionStorage.setItem('event', 'tournament');
  if (sessionStorage.getItem('type') == 1) {
    window.location.href = "team.html";
  } else {
    window.location.href = "ageGroup.html";
  }
})
