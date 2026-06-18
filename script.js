
/***** function testing() {
firebase.database().ref('/Game1/').update({userName3 : { 
    highScore : 45
}}

)
console.log("Updated Database")

} *****/
var userName;
var userAge;
var userUid = localStorage.getItem("currentUserUid");

const WELCOME_MESSAGE = document.getElementById(welcomeMessage);
const DISPLAYING_USER_NAME = document.getElementById(userNameDisplayed);
const DISPLAY_PROFILE_PICTURE = document.getElementById(profilePictureDisplayed);

function submitDetails() {
    const FORM_USER_NAME = document.getElementById("usernamefield").value;
    const FORM_USER_AGE = Number(document.getElementById("agefield").value);
    userName = FORM_USER_NAME;
    userAge = FORM_USER_AGE;
    console.log(userName + " : " + userAge)
    console.log(userUid)
    firebase.database().ref('/userInfo/' + userUid + '/').update({
        name : userName,
        age : userAge
    })
    
}

WELCOME_MESSAGE.innerHTML = "<h1>Welcome " + currentUserInfo[1] + "</h1>";
DISPLAYING_USER_NAME.innerHTML = "<h2>" + userName + "</h2>";
DISPLAYING_USER_NAME = "<img src = " + currentUserInfo[3] + " alt = profile picture>";