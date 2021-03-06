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
