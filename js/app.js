fetch('manifest.webapp')
    .then(getListOfAllUsers);

// deprecated
function setUserID(){
    userID = $( "#userList option:selected" ).val();
}
