

/***** function testing() {
firebase.database().ref('/Game1/').update({userName3 : { 
    highScore : 45
}}

)
console.log("Updated Database")

} *****/


var userUid = sessionStorage.getItem("currentUserUid");
var userAge;
var userName;
var formUserName;
var formUserAge;

const CURRENT_PAGE = window.location.pathname.split("/").pop();


async function checkValidityOfInput() {

    if (CURRENT_PAGE === "register.html") {
        formUserName  = document.getElementById("usernamefield");
        formUserAge = document.getElementById("agefield");
        userName = formUserName.value;
        userAge = Number(formUserAge.value);
    } else if (CURRENT_PAGE === "menu.html") {
        formUserName = document.getElementById("newUsernameField");
        formUserAge = document.getElementById("newAgeField");
        userName = formUserName.value;
        userAge = Number(formUserAge.value);
    }

    console.log(userName + " : " + userAge)
    console.log(userUid + ": Testing") 

    if ((userName === null || userName === "" || userAge === 0 || userAge === null) && CURRENT_PAGE !== "menu.html") {
        window.alert("Please fill in all input boxes correctly before submitting");
    } else if (formUserName.checkValidity() === false) {
        window.alert("Please insert the correct input type into this field");
    } else if (formUserAge.checkValidity() === false) {
        window.alert("Please only insert numbers into this field");
    } else if (userAge < 13) {
        window.alert("You have to be at least 13 years old to use this site");
    } else if (userAge > 120) {
        window.alert("Please insert an accurate age into this field")
    } else {
        firebase.database().ref('/userInfo/' + userUid + '/').update({
            name : userName,
            age : userAge
        });
        if (CURRENT_PAGE === "menu.html") {
            await updateInformation();
            
        }
    }

}

async function goToMenu() {
    var snapshot = await firebase.database().ref('/userInfo/' + userUid + '/name/').once('value');
    var savedUserName = snapshot.val();
    if (savedUserName === null || savedUserName === "") {
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





