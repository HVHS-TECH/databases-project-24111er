<<<<<<< HEAD

/***** function testing() {
firebase.database().ref('/Game1/').update({userName3 : { 
    highScore : 45
}}

)
console.log("Updated Database")

} *****/


var userUid = sessionStorage.getItem("currentUserUid");
var userName;

const CURRENT_PAGE = window.location.pathname.split("/").pop();



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





//  async function setUserName() {
//     var snapshotN = await firebase.database().ref('/userInfo/' + userUid + "/name").once('value');
//     saveUserName(snapshotN);
// }

// function saveUserName(snapshotN) {
//     userName = snapshotN.val();
//     console.log(userName)
// }
=======

/***** function testing() {
firebase.database().ref('/Game1/').update({userName3 : { 
    highScore : 45
}}

)
console.log("Updated Database")

} *****/
>>>>>>> 590403f (9/6/26)
