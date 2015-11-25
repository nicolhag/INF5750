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
    $('#bulk-order-list :input').each(function(index,element) {
		if (index > 0){
			if (index % 2 == 0){
				if ($(element).val() != ""){
					res += $(element).val() + "\n";
				}
			} else {
				if ($(element).val() != ""){
					res += $(element).val() + " : ";
				}
			}
		}
    });
    return res;
}


//POST FORM
$("#send-order-button").click(function(e) {
	sendCommodityOrder(getListOfAllCommodities());
	$("#bulk-order-list").submit();
});
