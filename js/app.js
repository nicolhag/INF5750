fetch('manifest.webapp')
    .then(parseJson)
    .then(getBaseUrlFromManifest)
    .then(getListOfUsers)
    .then(sendCommodityOrder);


function printName(){
    alert("Fant navnet: " + $( "#userList option:selected" ).text() + " med id: " + $( "#userList option:selected" ).val())
}
