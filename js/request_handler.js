var dhis2Instance;
var userID = "qlEhuAA77gc";

function sendCommodityOrder(dataToSend){
    $.ajax({
        url: "/api/messageConversations",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({"subject": "Commodity order submitted","text": "Ordering stocks on the following commodities:\n" + dataToSend,"userGroups": [{"id": userID}]}),
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
