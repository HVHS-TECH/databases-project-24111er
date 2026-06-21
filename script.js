

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
    // if (userName === null || userName === undefined || userAge === 0 || userAge === null || userAge === undefined) {}
    firebase.database().ref('/userInfo/' + userUid + '/').update({
        name : userName,
        age : userAge
    })
    
}

async function goToMenu() {
    var snapshot = await firebase.database().ref('/userInfo/' + userUid + '/name/').once('value');
    var savedUserName = snapshot.val();
    if (savedUserName === null || savedUserName === undefined) {
        window.alert("Please submit details first")
    } else {
        window.location.href = "./menu.html";
    }
}





//  async function setUserName() {
//     var snapshotN = await firebase.database().ref('/userInfo/' + userUid + "/name").once('value');
//     saveUserName(snapshotN);
// }

// function saveUserName(snapshotN) {
//     userName = snapshotN.val();
//     console.log(userName)
// }


/***** function testing() {
firebase.database().ref('/Game1/').update({userName3 : { 
    highScore : 45
}}

)
console.log("Updated Database")

} *****/





