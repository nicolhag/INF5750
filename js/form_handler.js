var elements = 1;

//Function to add new form element when + is clicked.
$("#add-form-button").click(function(){
	newForm = $("#commodity-form").clone(); //cloning first form
	newForm.find("input").val(""); //removing input text
	$("#bulk-order-list").append(newForm); //appending on the end of list
	elements++;
});

//remove or clear inputs item when cancel-button is clicked
function cancelItem(event) {
	if (elements > 1) { //remove element
		event.parentNode.remove(event.parentNode);
		elements--;
	} else { //clear input boxes
		$("#commodity-form").find("input").val(""); //removing input text
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
function clearForms(){
	newForm = $("#commodity-form").clone(); //cloning first form
	newForm.find("input").val(""); //removing input text
	$(".commodity-form").remove();
	$("#bulk-order-list").append(newForm);
}

//POST FORM /venter på bedre metodenavn fra nicolai
$("#send-order-button").click(function() {
	sendCommodityOrderToUsers(getListOfAllCommodities());
	clearForms();
	$("#display-message").fadeIn(1000).delay(500).fadeOut(1000);
});

// Venter på kommentar fra nicolai
$(document).ready(function() {
    $("#display-message").hide();
});


function validateCommodityInput(str) {
	
	var commodities = getCommodities();
	console.log(commodities);
	if ($.inArray(str, commodities) > 0) {
		$("#name").css({"background-color": "#dff0d8"});
	} else {
		$("#name").css({"background-color": "#f2dede"});
	}
	//$("#searchResults").css({"display": "none"});
}

function resetSearchBoxColor() {
	$("#name").css({"background-color": "white"});
}