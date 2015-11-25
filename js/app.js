fetch('manifest.webapp')
    .then(parseJson)
    .then(getBaseUrlFromManifest)
    .then(getListOfAllUsers);

// deprecated
function setUserID(){
    userID = $( "#userList option:selected" ).val();
}
