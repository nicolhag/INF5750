var elements = 1;

// Hides the message dialogue when webapp initializes
$(document).ready(function() {
    $("#display-message").hide();
});

$("#send-order-button").click(postOrder);

//Function to add new form element when + is clicked.
$("#add-form-button").click(addNewForm);

function addNewForm(){
	newForm = $("#commodity-form").clone(); //cloning first form section
	newForm.find("#name").val(""); //removing input text
	newForm.find("#quantity").val("1");
	resetSearchBoxColor(newForm.find("#name"));
	$("#bulk-order-list").append(newForm); //appending on the end of list
	elements++;
}

//remove or clear inputs item when cancel-button is clicked
function cancelItem(event) {
	if (elements > 1) { //remove element
		event.parentNode.remove(event.parentNode);
		elements--;
	} else { //clear input boxes
		$("#commodity-form").find("input").val(""); //removing input text
	}
}

function clearForms(){
	newForm = $("#commodity-form").clone(); //cloning first form section
	newForm.find("#name").val(""); //removing input text
	newForm.find("#quantity").val("1");
	$(".commodity-form").remove();
	$("#bulk-order-list").append(newForm);
}

function postOrder(){

	if (usersToSend == undefined || usersToSend == null || usersToSend.length == 0){
		$("#display-message").html("Failed: No recipients!");
		$("#display-message").removeClass("messageSuccess");
		$("#display-message").addClass("messageFailure");
	} else {
		sendCommodityOrderToUsers(getListOfAllCommodities());
		$("#display-message").html("Message sent!");
		$("#display-message").removeClass("messageFailure");
		$("#display-message").addClass("messageSuccess");
	}

	clearForms();

	// Displays a popup-message
	$("#display-message").fadeIn(1000).delay(5000).fadeOut(1000);
}

//Validating the input in a searchBox. Gives the box green color if input is in list of commodities. Else: red. 
function validateCommodityInput(searchBox) {
	var str = searchBox.value;
	var commodities = getCommodities();

	if ($.inArray(str, commodities) >= 0) {
		$(searchBox).css({"background-color": "#dff0d8"});
	} else {
		$(searchBox).css({"background-color": "#f2dede"});
	}

}

function getListOfAllCommodities(){
    var res = "\n";
    $('#bulk-order-list :input').each(function(index,element){
		if (index % 2 == 1){
			if ($(element).val() != ""){
				res += $(element).val() + "\n";
			}
		} else {
			if ($(element).val() != ""){
				res += $(element).val() + " : ";
			}
		}
    });
    return res;
}

function resetSearchBoxColor(searchBox) {
	$(searchBox).css({"background-color": "white"});
}
