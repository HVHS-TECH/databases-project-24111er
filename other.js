
var displayName = sessionStorage.getItem("currentUserName");
var usersInfo = {};

obtainUserInfo();

async function obtainUserInfo() {
    var snapshot = await firebase.database().ref("/userInfo/" + userUid + "/").once('value');
    saveUserInfo(snapshot);
}

function saveUserInfo(snapshot) {
    usersInfo = snapshot.val();
    console.log(usersInfo)
}
const WELCOME_MESSAGE = document.getElementById("welcomeMessage");
const DISPLAYING_USER_NAME = document.getElementById("userNameDisplayed");
const DISPLAY_PROFILE_PICTURE = document.getElementById("profilePictureDisplayed");

// WELCOME_MESSAGE.innerHTML = "<h1>Welcome " + currentUserInfo[1] + "</h1>";
DISPLAYING_USER_NAME.innerHTML = "<h2>" + usersInfo + "</h2>";
// DISPLAYING_USER_NAME = "<img src = " + currentUserInfo[3] + " alt = profile picture>";
