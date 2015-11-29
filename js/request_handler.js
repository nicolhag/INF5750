var usersToSend;
var userGroup = "Logistics"; // This usergroup needs to be present

// Collects information about the users (e.g. organisational unit)
var promise = $.ajax({
    url: "/api/me",
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
});

// Get the organisational unit at the level above the user
function getParentOrgId(orgId) {
    return $.ajax({
        url: "/api/organisationUnits/" + orgId,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
}

// Get all the users in the organisational unit above
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
            conslole.log(JSON.stringify(data));
        }
    });
}

function getOrgunitIdFromOU(data) {
    if (data.parent == null){
        // Initializes to the userGroup called "EPI Stock Completeness Notification Recipients"
        console.log("No OU found above you. Will therefore send to the specified userGroup in own OU");
        return data.id;
    } else {
        console.log("Found OU above you.");
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

// Sends a message (mail) to the generated list of users
function sendCommodityOrderToUsers(dataToSend){
    $.ajax({
        url: "/api/messageConversations",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "subject": "Commodity order submitted",
            "text": "Ordering stocks on the following commodities:\n" + dataToSend,
            "users": usersToSend
        })
    });
}
