var authenticationListener;
var GLOBAL_user;
var currentUserAuthInfo = [];





function logIn() {
    console.log("autneticating with google")
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
    currentUserAuthInfo.push(GLOBAL_user.uid, GLOBAL_user.displayName, GLOBAL_user.email, GLOBAL_user.photoURL);
    console.log(currentUserAuthInfo)
    sessionStorage.setItem("currentUserUid", currentUserAuthInfo[0] );
    var snapshot = await firebase.database().ref('/userInfo/' + currentUserAuthInfo[0] + '/name/').once('value');
    var storedUserInfo = snapshot.val();
    console.log("snapshot : "+ storedUserInfo)
    if (storedUserInfo=== null || storedUserInfo == undefined) {
        firebase.database().ref('/userInfo/').update(
            {[currentUserAuthInfo[0]] : {
                googleName: currentUserAuthInfo[1],
                email: currentUserAuthInfo[2],
                photoURL: currentUserAuthInfo[3]

            }
            
        }) 
        window.location.href = "./register.html";
    } else {
        window.location.href = "./menu.html";
        await obtainUserInfo();
        
    }
   
    
    
}

function logOut() {
    authenticationListener = 0;
    firebase.auth().signOut();
    console.log("User has logged out")
    window.location.href = "./index.html";
}

function readError(error) {
//   Look back at examples
}