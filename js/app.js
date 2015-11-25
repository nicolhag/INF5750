var requestOptions = {
    credentials: 'same-origin',
    headers: {
        Authorization: 'Basic ' + btoa('admin:district'),
    },
};

fetch('manifest.webapp', requestOptions)
    .then(parseJson)
    .then(getBaseUrlFromManifest)
    .then(getListOfUsers)
    .then(sendCommodityOrder);


function printName(){
    alert("Fant navnet: " + $( "#userList option:selected" ).text() + " med id: " + $( "#userList option:selected" ).val())
}
