var usersToSend;
var userGroup = "Logistics";

var promise = $.ajax({
    url: "/api/me",
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
});

function getParentOrgId(orgId) {
    return $.ajax({
        url: "/api/organisationUnits/" + orgId,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        error: function (data) {
            alert(JSON.stringify(data));
        }
    });
}

function getUsersInParent(data) {
    return $.ajax({
        url: "/api/users?filter=organisationUnits.id:eq:" + data + "&filter=userGroups.name:like:" + userGroup,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            usersToSend = data.users;
            console.log(usersToSend);
        },
        error: function() {
            alert("failed");
        }
    });
}

function getOrgunitIdFromOU(data) {
    if (data.parent==null){
        // Initializes to the userGroup called "EPI Stock Completeness Notification Recipients"
        console.log("No organisationUnit found above you. Will therefore send to the userGroup EPI Stock Completeness Notification Recipients");
        return data.id;
    } else {
        console.log("Found organisationUnit above you.");
        return data.parent.id;
    }
}

promise.then(function (data) {
    getParentOrgId(data.organisationUnits[0].id)
        .then(function (data) {
            var orgUnitID = getOrgunitIdFromOU(data);
            getUsersInParent(orgUnitID)
        });
})

function sendCommodityOrderToUsers(dataToSend){
    $.ajax({
        url: "/api/messageConversations",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({
            "subject": "Commodity order submitted",
            "text": "Ordering stocks on the following commodities:\n" + dataToSend,
            "users": usersToSend
        })
    });
    console.log("test");
}
