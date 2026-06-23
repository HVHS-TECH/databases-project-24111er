
var displayName = sessionStorage.getItem("currentUserName");
var usersInfo = {};
var currentGame;



const WELCOME_MESSAGE = document.getElementById("welcomeMessage");
const DISPLAYING_USER_NAME = document.getElementById("userNameDisplayed");
const DISPLAY_PROFILE_PICTURE = document.getElementById("profilePictureDisplayed");
const DISPLAY_LEADERBOARD_G1 = document.getElementById("displayLeaderBoardG1");
const DISPLAY_LEADERBOARD_G2 = document.getElementById("displayLeaderBoardG2");
const CHANGE_DETAILS_BUTTON = document.getElementById("changeUserDetailsButton");
const CHANGE_DETAILS_POPUP = document.getElementById("changeUserDetailsPopup");
const CHANGE_DETAILS_CLOSE = document.getElementById("changeUserDetailsClose");

 if (CURRENT_PAGE === "menu.html") {
    logIn();
    console.log( GLOBAL_user )
    obtainUserInfo();
}

if (CURRENT_PAGE === "geodash1.html" || CURRENT_PAGE === "geodash2.html") {
    readLeaderBoard();
}

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
    }   
    
}



function checkHighScore() {
    console.log("checking high score")
    if (CURRENT_PAGE === "geodash1.html") {
        if (usersInfo.mostRecentScoreGD1 < usersInfo.highScoreGD1 || usersInfo.highScoreGD1 === undefined || usersInfo.highScoreGD1 === null) {
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

function changeUserDetails() {
    CHANGE_DETAILS_POPUP.showModal();

}
function saveNewDetails() {
    const FORM_NEW_USERNAME = document.getElementById("newUsernameField").value;
    const FORM_NEW_USER_AGE = Number(document.getElementById("newAgeField").value);
    newUserName = FORM_NEW_USERNAME;
    newUserAge = FORM_NEW_USER_AGE;
    console.log(newUserName + ":" + newUserAge)
    if (newUserAge === 0 || newUserAge === null) {
        newUserAge = usersInfo.age;
    } else if (newUserName === '' || newUserName === null) {
        newUserName = usersInfo.name
    } 
    firebase.database().ref('/userInfo/' + userUid + '/').update({ 
        name : newUserName,
        age: newUserAge 
    });
    obtainUserInfo();
}


function closePopup() {
    CHANGE_DETAILS_POPUP.close();

}

function readLeaderBoard() {
    if (CURRENT_PAGE === "geodash1.html") {
        currentGame = "Game1";
    } else if (CURRENT_PAGE === "geodash2.html") {
        currentGame = "Game2"
    }
    firebase.database().ref("/" + currentGame + "/").orderByValue().once('value', sortLeaderBoard, errorHandler)

}

function sortLeaderBoard(snapshot) {
    snapshot.forEach(displayLeaderBoard)

}

function displayLeaderBoard(child) {
    if (CURRENT_PAGE === "geodash1.html") {
        currentGame = DISPLAY_LEADERBOARD_G1;
    } else if (CURRENT_PAGE === "geodash2.html") {
        currentGame = DISPLAY_LEADERBOARD_G2;
    }
    var value = String(child.val());
    var positiveValue = value.split("-").pop();
    console.log(child.key + " got " + positiveValue + " points")
    currentGame.innerHTML += "<p>" + child.key + " : " + positiveValue + "</p>";

}