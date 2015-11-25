function getOwnOrgUnit() {
    return $.ajax({
        url: "/api/me",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
    });
}
function getParentOrgId(orgId) {
    $.ajax({
        url: "/api/organisationUnits/" + orgId,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: function (data) {
            parentOrgId = data.parent.id;
            alert(parentOrgId);
        },

        error: function (data) {
            alert(JSON.stringify(data));
        }
    });
}
var promise = getOwnOrgUnit();
promise.success(function (data) {
    console.log(JSON.stringify(data));
    var orgId = data.organisationUnits[0].id;
    console.log(getParentOrgId(orgId))
});
