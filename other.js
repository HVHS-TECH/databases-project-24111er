
var displayName = sessionStorage.getItem("currentUserName");
var usersInfo = {};


const WELCOME_MESSAGE = document.getElementById("welcomeMessage");
const DISPLAYING_USER_NAME = document.getElementById("userNameDisplayed");
const DISPLAY_PROFILE_PICTURE = document.getElementById("profilePictureDisplayed");

obtainUserInfo();


async function obtainUserInfo() {
    console.log(userUid)
    var snapshot = await firebase.database().ref("/userInfo/" + userUid + "/").once('value','',errorHandler);
    saveUserInfo(snapshot);
}

function saveUserInfo(snapshot) {
    usersInfo = snapshot.val();
    console.log(usersInfo)

    if (CURRENT_PAGE === "menu.html") {
        console.log("you are on the menu page")
        displayWelcome();
    } else if (CURRENT_PAGE === "geodash1.html") {

    }

    
    
}

function checkHighScore() {
    console.log("checking high score")
    if (CURRENT_PAGE === "geodash1.html") {
        if (usersInfo.mostRecentScoreGD1 > usersInfo.highScoreGD1 || usersInfo.highScoreGD1 === undefined || usersInfo.highScoreGD1 === null) {
            console.log("new highscore")
            firebase.database().ref("/userInfo/" + userUid + "/").update({highScoreGD1 : usersInfo.mostRecentScoreGD1});
            firebase.database().ref("/Game1/").update({
                [usersInfo.name] : usersInfo.mostRecentScoreGD1
            });
        }
    } else if (CURRENT_PAGE === "geodash2.html") {
        if (usersInfo.mostRecentScoreGD2 > usersInfo.highScoreGD2 || usersInfo.highScoreGD2 === undefined || usersInfo.highScoreGD2 === null) {
            console.log("new highscore")
            firebase.database().ref("/userInfo/" + userUid + "/").update({highScoreGD2 : usersInfo.mostRecentScoreGD2});
            firebase.database().ref("/Game2/").update({
                [usersInfo.name] : usersInfo.mostRecentScoreGD2
            }); 
        }

    }
}

function displayWelcome() {
    WELCOME_MESSAGE.innerHTML = "<h1>Welcome " + usersInfo.googleName + "</h1>";
    DISPLAYING_USER_NAME.innerHTML = "<h2>" + usersInfo.name + "</h2>";
    DISPLAY_PROFILE_PICTURE.innerHTML = "<img src = " + usersInfo.photoURL + " alt = profile picture>";
}
