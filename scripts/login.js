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
        $("#errorMessage").text("");
        $("#errorMessage").text("Empty Fields");
        $("#errorMessage").show();
        $("#errorIcon").show();
    } else if(!(loginReg.test(email))) {
        $("#errorIcon").show();
        $("#errorMessage").text("");
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
            sessionStorage.setItem('curEmail', email);
            if (response.coach == 1) {
              sessionStorage.setItem('type', 1);
              window.location.href = "createEvent.html";
            } else if (response.techDir == 1) {
              sessionStorage.setItem('type', 2);
              window.location.href = "createEvent.html";
            } else if (response.genManag == 1) {
              sessionStorage.setItem('type', 3);
              window.location.href = "createEvent.html";
            } else if (response.ageGroupCoord == 1) {
              sessionStorage.setItem('type', 4);
              window.location.href = "createEvent.html";
            } else {
              $("#errorMessage").text("");
              $("#errorMessage").text("Not a valid account");
              $("#errorMessage").show();
            }
        })
        .on('404', function(response) {
            $("#errorMessage").text("");
            $("#errorMessage").text("Incorrect email or password");
            $("#errorMessage").show();
            $("#errorIcon").show();
            $("#loaderGif").hide();
            $("#loginMessage").hide();
        })
        .on('500', function(response) {
          $("#errorMessage").text("");
          $("#errorMessage").text("Something went wrong. Try again later.");
          $("#errorMessage").show();
          $("#errorIcon").show();
          $("#loaderGif").hide();
          $("#loginMessage").hide();
        })
        .go()
    }
});
