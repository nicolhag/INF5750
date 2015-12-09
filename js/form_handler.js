var elements = 1;

// Constant for readability
var MESSAGE_FAILURE = "messageFailure";
var MESSAGE_SUCCESS = "messageSuccess";

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

// Sends the commodity order if theres users to send to, and the forms have been filled in properly
function postOrder(){
	if (!validateAllCommodityInput()) {
        displayMessage("Some of the commodities defined does not exist!", MESSAGE_FAILURE);
	} else if (hasNoUsersToSendTo()){
        displayMessage("Failed: No recipients!", MESSAGE_FAILURE);
	} else {
		sendCommodityOrderToUsers(getListOfAllCommodities());
        displayMessage("Message sent!", MESSAGE_SUCCESS);
	}
}

/*
Displays a pop-up message, informing about wheter the message was sent or not.
If the message is not sent, the user will be informed what the reason was.
*/
function displayMessage(message, kindOfMessage){
    $("#display-message").html(message);

    if (kindOfMessage == MESSAGE_FAILURE){
        $("#display-message").removeClass("messageSuccess");
        $("#display-message").addClass("messageFailure");
    } else if (kindOfMessage == MESSAGE_SUCCESS){
        $("#display-message").removeClass("messageFailure");
		$("#display-message").addClass("messageSuccess");
    }

    if (hasNoUsersToSendTo() || MESSAGE_SUCCESS){
        clearForms();
    }
    // Displays the popup-message
	$("#display-message").fadeIn(1000).delay(5000).fadeOut(1000);
}

// If the JSON-array is empty or undefined, it is no users to send to
function hasNoUsersToSendTo(){
    return (usersToSend == undefined || usersToSend == null || usersToSend.length == 0);
}

//Validating the input in a searchBox. Gives the box green color if input is in list of commodities. Else: red.
function validateCommodityInput(searchBox) {
	var str = searchBox.value;
	var commodities = getCommodities();

	if ($.inArray(str, commodities) >= 0) {
		$(searchBox).css({"background-color": "#dff0d8"});
		return true;
	} else {
		$(searchBox).css({"background-color": "#f2dede"});
		return false;
	}

}

function validateAllCommodityInput() {
	var valid = true;
	$(".commodityNameInput").each(function(index) {
		if (!validateCommodityInput(this)) {
			valid = false;
		}
	});

	return valid;

}

// Extracts the list of the commodities entered by the user
function getListOfAllCommodities(){
    var res = "\n";

    // For each input-field in the list in commodity
    $('#bulk-order-list :input').each(function(index,element){
        // Extract
        if (isNameOfCommodity(index)){

            // Extract the name of the commodity, followed by a newline
			if ($(element).val() != ""){
				res += $(element).val() + "\n";
			}
		} else {
            // add a colon, indicating that the quantity comes next
			if ($(element).val() != ""){
				res += $(element).val() + " : ";
			}
		}
    });
    return res;
}

function isNameOfCommodity(index){
    // Checks with modulo to find the input field on the left (indicating a commodity-name)
    return (index % 2 == 1);
}

function resetSearchBoxColor(searchBox) {
	$(searchBox).css({"background-color": "white"});
}
