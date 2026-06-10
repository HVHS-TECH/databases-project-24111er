
/***** function testing() {
firebase.database().ref('/Game1/').update({userName3 : { 
    highScore : 45
}}

)
console.log("Updated Database")

} *****/
var userName;
var userAge;
const WELCOME_MESSAGE = document.getElementById(welcomeMessage);
const DISPLAYING_USER_NAME = document.getElementById(userNameDisplayed);
const DISPLAY_PROFILE_PICTURE = document.getElementById(profilePictureDisplayed);

function submitDetails() {
    const FORM_USER_NAME = document.getElementById("usernamefield").value;
    const FORM_USER_AGE = Number(document.getElementById("agefield").value);
    userName = FORM_USER_NAME;
    userAge = FORM_USER_AGE;
    console.log(userName + " : " + userAge)
    firebase.database().ref('/userInfo/' + userUID)

}