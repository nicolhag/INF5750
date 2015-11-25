var sendID = "qlEhuAA77gc";

function sendCommodityOrderToOrgUnit(dataToSend){
    $.ajax({
        url: "/api/messageConversations",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({
            "subject": "Commodity order submitted",
            "text": "Ordering stocks on the following commodities:\n" + dataToSend,
            "organisationUnits": [{"id": sendID}]
        })
    });
}

function sendCommodityOrderToUserGroup(dataToSend){
    $.ajax({
        url: "/api/messageConversations",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({
            "subject": "Commodity order submitted",
            "text": "Ordering stocks on the following commodities:\n" + dataToSend,
            "userGroups": [{"id": sendID}]
        })
    });
}

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
            "users": [{"id": sendID}]
        })
    });
}

function getListOfAllUsers(){
    $.ajax({
        url: "/api/users",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: function (data) {
            var usrLst = $('#userList');
            jQuery.each(data.users, function() {
                usrLst.append(
                    $('<option></option>').val(this.id).html(this.name)
                );
                //$("#list").append('<li style="font-size:20px;"> Name: ' + this.name + ', id: ' + this.id + '</li>');
            });
        },
        error: function(data){
            var usrLst = $('#userList');
            jQuery.each(data.users, function() {
                usrLst.append(
                    $('<option></option>').val(this.id).html(this.name)
                );
                //$("#list").append('<li style="font-size:20px;"> Name: ' + this.name + ', id: ' + this.id + '</li>');
            });
        }
    });
}
