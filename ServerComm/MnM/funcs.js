var dhis2Instance;

function sendCommodityOrder(){
    $.ajax({
        url: dhis2Instance + "/api/messageConversations",
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:district"));
        },
        type: 'POST',
        dataType: 'xml',
        contentType: 'application/xml',
        processData: false,
        data: '<message xmlns="http://dhis2.org/schema/dxf/2.0"><subject>Mortality data reporting</subject><text>Have you reported data for the Mortality data set for January 2014?</text><users><user id="SzPPs3sGSd6" /></users></message>',
        success: function (data) {
            $("#messageSent").html(JSON.stringify(data));
        },
        error: function(data){
           $("#messageSent").html(JSON.stringify(data));
        }
    });
}

function getListOfUsers(){
    $.ajax({
        url: dhis2Instance + "/api/users",
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:district"));
        },
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: function (data) {
            jQuery.each(data.users, function() {
                $("#list").append('<li style="font-size:20px;"> Name: ' + this.name + ', id: ' + this.id + '</li>');
            });

        },
        error: function(data){
            jQuery.each(data.users, function() {
                $("#list").append('<li> Name: ' + this.name + ', id: ' + this.id + '</li>');
            });
        }
    });
}

function getBaseUrlFromManifest(manifest) {
	dhis2Instance = manifest.activities.dhis.href;
    return manifest.activities.dhis.href;
}

function parseJson(rawResponse) {
    return rawResponse.json();
}
