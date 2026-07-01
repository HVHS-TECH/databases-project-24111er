
var displayName = sessionStorage.getItem("currentUserName");
var usersInfo = {};
var currentGame;
var i;


// Saving HTML elements as constants
// Menu.html elements
const WELCOME_MESSAGE = document.getElementById("welcomeMessage");
const DISPLAYING_USER_NAME = document.getElementById("userNameDisplayed");
const DISPLAY_PROFILE_PICTURE = document.getElementById("profilePictureDisplayed");
const DISPLAY_TOP_THREE_PARENT = document.getElementById("menuMain");
// Popup elements
const CHANGE_DETAILS_BUTTON = document.getElementById("changeUserDetailsButton");
const CHANGE_DETAILS_POPUP = document.getElementById("changeUserDetailsPopup");
const CHANGE_DETAILS_CLOSE = document.getElementById("changeUserDetailsClose");
const SAVE_DETAILS_POPUP = document.getElementById("saveDetailsPopup");
// Display Top Three high scores
const DISPLAY_TOP_THREE_G1 = document.getElementById("displayTopThreeG1"); 
const DISPLAY_TOP_THREE_G2 = document.getElementById("displayTopThreeG2");
const FIRST_PLACE_G1 = document.getElementById("firstPlaceG1");
const FIRST_PLACE_G2 = document.getElementById("firstPlaceG2");
const SECOND_PLACE_G1 = document.getElementById("secondPlaceG1");
const SECOND_PLACE_G2 = document.getElementById("secondPlaceG2");
const THIRD_PLACE_G1 = document.getElementById("thirdPlaceG1");
const THIRD_PLACE_G2 = document.getElementById("thirdPlaceG2");
// Leaderboards - geodash1.html and geodash2.html
const DISPLAY_LEADERBOARD_G1 = document.getElementById("displayLeaderBoardG1");
const DISPLAY_LEADERBOARD_G2 = document.getElementById("displayLeaderBoardG2");




if (CURRENT_PAGE === "menu.html" || CURRENT_PAGE === "geodash1.html" || CURRENT_PAGE === "geodash2.html") {
    obtainUserInfo();
    // reAuthToGainInfo();
}

if (CURRENT_PAGE === "menu.html") {
    readTopThreeScores();
    window.addEventListener('load', () => {
        const LOADING_SCREEN = document.getElementById("loadingOverlay");
        setTimeout(() => {
            LOADING_SCREEN.classList.add("fadeOutOfOverlay");
        }, 3000);

 

    } );

}

if (CURRENT_PAGE === "geodash1.html" || CURRENT_PAGE === "geodash2.html") {
    readLeaderBoard();
}

// async function reAuthToGainInfo() {
//     await logIn();
//     console.log(GLOBAL_user + "Testing")
//     // obtainUserInfo();

// }

async function readTopThreeScores() {
    for (i=1; i<3; i++) {
        await firebase.database().ref("/Game"+ i + "/").orderByValue().limitToFirst(3).once('value', sortTopThree, readError);
        console.log("Running for loop " + i)
    }

}

function sortTopThree(snapshot) {
    snapshot.forEach(displayTopThree);

}

function displayTopThree(child) {
    var leaderBoardCount = DISPLAY_TOP_THREE_PARENT.querySelectorAll("p").length;
    console.log("Amount of elements in div: " + leaderBoardCount)
    if (leaderBoardCount === 0) {
        currentGame = FIRST_PLACE_G1;
    } else if (leaderBoardCount === 1) {
        currentGame = SECOND_PLACE_G1;
    } else if (leaderBoardCount === 2) {
        currentGame = THIRD_PLACE_G1;
    } else if (leaderBoardCount === 3) {
        currentGame = FIRST_PLACE_G2;
    } else if (leaderBoardCount === 4) {
        currentGame = SECOND_PLACE_G2;
    } else if (leaderBoardCount === 5) {
        currentGame = THIRD_PLACE_G2;     
    }
    var value = String(child.val());
    var positiveValue = value.split("-").pop();
    console.log(child.key + " got " + positiveValue + " points")
    currentGame.innerHTML += "<p>" + child.key + " : " + positiveValue + "</p>";


}



async function obtainUserInfo() {
    console.log(currentUserAuthInfo[0] + ": Uid, Test")
    var snapshot = await firebase.database().ref("/userInfo/" + userUid + "/").once('value','',readError);
    saveUserInfo(snapshot);
}

function saveUserInfo(snapshot) {
    usersInfo = snapshot.val();
    console.log(usersInfo)
    displayProfileName();
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
            readLeaderBoard();
        }
    } else if (CURRENT_PAGE === "geodash2.html") {
        if (usersInfo.mostRecentScoreGD2 < usersInfo.highScoreGD2 || usersInfo.highScoreGD2 === undefined || usersInfo.highScoreGD2 === null) {
            console.log("new highscore")
            firebase.database().ref("/userInfo/" + userUid + "/").update({highScoreGD2 : usersInfo.mostRecentScoreGD2});
            firebase.database().ref("/Game2/").update({
                [usersInfo.name] : usersInfo.mostRecentScoreGD2
            }); 
            readLeaderBoard();
        }

    }
}

function displayWelcome() {
    WELCOME_MESSAGE.innerHTML = "<h1>Welcome " + usersInfo.googleName + "</h1>";
    
}
function displayProfileName() {
    DISPLAYING_USER_NAME.innerHTML = "<h2><i>" + usersInfo.name + "</i></h2>";
    DISPLAY_PROFILE_PICTURE.innerHTML = "<img src = " + usersInfo.photoURL + " alt = profile picture>";
}



function changeUserDetails() {
    CHANGE_DETAILS_POPUP.showModal();
    console.log("Displaying Data")
    const FORM_NEW_USERNAME = document.getElementById("newUsernameField");
    const FORM_NEW_USER_AGE = document.getElementById("newAgeField");
    FORM_NEW_USERNAME.value = usersInfo.name;
    FORM_NEW_USER_AGE.value = usersInfo.age;
    console.log(FORM_NEW_USERNAME + ":" + FORM_NEW_USER_AGE)
    

}

function saveNewDetails() {
    const FORM_NEW_USERNAME = document.getElementById("newUsernameField").value;
    const FORM_NEW_USER_AGE = Number(document.getElementById("newAgeField").value);
    newUserAge = FORM_NEW_USER_AGE;
    newUserName = FORM_NEW_USERNAME;
    console.log(newUserName + ":" + newUserAge)
    if (newUserAge === 0 || newUserAge === null) {
        newUserAge = usersInfo.age;
    } else if (newUserName === '' || newUserName === null) {
        newUserName = usersInfo.name
    } else {
        checkValidityOfInput();
    }
    
}

async function updateInformation() {
    console.log("Reading user name in relation to high score")
    var snapshotV = await firebase.database().ref('/Game1/' + usersInfo.name).once('value', '', readError);
    var snapshotK = await firebase.database().ref('/userInfo/' + userUid + "/name/").once('value', '' , readError);
    console.log(snapshotK.val() + " / " + usersInfo.name)
    console.log(snapshotK.val() + " / " + snapshotV.val())
    getValue(snapshotK, snapshotV);
    

    async function getValue(snapshotK, snapshotV) {
        console.log("Changing user name in relation to high score")
        var highScoreValue = snapshotV.val();
        var newUserName = snapshotK.val();
        console.log(snapshotK.val() + " / " + snapshotV.val())
        await firebase.database().ref('/Game1/').update({[newUserName] : highScoreValue});
        firebase.database().ref('/Game1/' + usersInfo.name + '/').remove();
        console.log("Finsihed firebase functions" + usersInfo.name)
        obtainUserInfo();

    }
}

async function saveNewDetailsAndClose() {
    await saveNewDetails();
    SAVE_DETAILS_POPUP.close();
    CHANGE_DETAILS_POPUP.close();
}

function closePopupDontSave() {
    SAVE_DETAILS_POPUP.close();
    CHANGE_DETAILS_POPUP.close();

}


function closePopup() {
    const FORM_NEW_USERNAME = document.getElementById("newUsernameField").value;
    const FORM_NEW_USER_AGE = Number(document.getElementById("newAgeField").value);
    if (FORM_NEW_USERNAME !== "" && FORM_NEW_USERNAME !== usersInfo.name || FORM_NEW_USER_AGE !== 0 && FORM_NEW_USER_AGE !== usersInfo.age) {
        SAVE_DETAILS_POPUP.showModal();
    } else {
        CHANGE_DETAILS_POPUP.close();
    }

}

function readLeaderBoard() {
    if (CURRENT_PAGE === "geodash1.html") {
        currentGame = "Game1";
    } else if (CURRENT_PAGE === "geodash2.html") {
        currentGame = "Game2"
    }
    firebase.database().ref("/" + currentGame + "/").orderByValue().once('value', sortLeaderBoard, readError);

}

function sortLeaderBoard(snapshot) {
    if (CURRENT_PAGE === "geodash1.html") {
        currentGame = DISPLAY_LEADERBOARD_G1;
    } else if (CURRENT_PAGE === "geodash2.html") {
        currentGame = DISPLAY_LEADERBOARD_G2;
    }
    currentGame.innerHTML = "";
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