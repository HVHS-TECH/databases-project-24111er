var authenticationListener;
var GLOBAL_user;
var userDisplayName;
var userProfilePicture;
var userEmail;
var userUID;



function logIn() {
    authenticationListener = firebase.auth().onAuthStateChanged(handleLogIn);

}

async function handleLogIn(_user) {
    if (_user) {
        console.log("User is logged in")
        GLOBAL_user = _user;
    } else {
        console.log("User isn't logged in")
        await logInPopup();
    }

}

async function logInPopup() {
    var provider = new firebase.auth.GoogleAuthProvider();
    var result = await firebase.auth().signInWithPopup(provider);
    GLOBAL_user = result.user;
    console.log("User has logged in")
    userDisplayName = GLOBAL_user.displayName;
    userEmail = GLOBAL_user.email;
    userProfilePicture = GLOBAL_user.photoURL;
    userUID = GLOBAL_user.uid;
    firebase.database().ref('/userInfo/').update(
        {[userUID] : {
            name: userDisplayName,
            email: userEmail,
            photoURL: userProfilePicture

        }
            
        
    })
    
}

function logOut() {
    authenticationListener;
    firebase.auth().signOut();
    console.log("User has logged out")
}