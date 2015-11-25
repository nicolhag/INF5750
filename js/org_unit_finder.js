function printOrgUnit() {
    $.ajax({
        url: "/api/me",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: function (data) {
            var orgId = data.organisationUnits[0].id;
            alert(orgId);
        },

        error: function (data) {
            alert(JSON.stringify(data));
        }
    });
}

printOrgUnit();