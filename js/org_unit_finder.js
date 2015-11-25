function getOwnOrgUnit() {
    return $.ajax({
        url: "/api/me",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
    });
}

var sendToOrgUnit = true;

function getParentOrgId(orgId) {
    $.ajax({
        url: "/api/organisationUnits/" + orgId,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: function (data) {
            if (data.parent==null){
                sendToOrgUnit = false;
                // Initializes to the userGroup called "EPI Stock Completeness Notification Recipients"
                console.log("No organisationUnit found above you. Will therefore send to the userGroup EPI Stock Completeness Notification Recipients");
                sendID = "qlEhuAA77gc";
            } else {
                console.log("Found organisationUnit above you.");
                sendID = data.parent.id;
            }
        },
        error: function (data) {
            alert(JSON.stringify(data));
        }
    });
}
var promise = getOwnOrgUnit();
promise.success(function (data) {
    // console.log(JSON.stringify(data));
    usersOrgId = data.organisationUnits[0].id;
    getParentOrgId(usersOrgId);
    // console.log(getParentOrgId(orgId))
});
