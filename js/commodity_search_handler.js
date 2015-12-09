//init
var allCommodities = getCommodities();
var lastSearchResult = [];
lastSearchResult[0] = allCommodities;
var previousInputLength = 0;

function getCommodities() {
	//In a real setting this would be returned from the DHIS2 database. Maybe through the API in json. 
	return ["BCG", "Malarone", "Typhoid", "Meningococcal", "Measles", "Pneumococcal", "Yellow fever", "Dateiphtheria", "Rabies", "Rubella", "Twinrix", "Tetanus", "Hepatitis A", "Hepatitis B"];
}

//Controlling the search suggestions. Is called when text changes in one of the search boxes. 
function showResult(searchBox) {
	var str = searchBox.value;
	var index = 0;
	str = str.toLowerCase();

	if (str.length == 0) {
		index = 0;
	} else if (str.length < previousInputLength) {
		previousInputLength = str.length;
		index = str.length;
	} else {
		index = str.length;
		previousInputLength = str.length;

		lastSearchResult[index] = filterByLetterOnIndex(lastSearchResult[index -1], str.length - 1, str.charAt(str.length - 1));
	}
	showResults(searchBox, lastSearchResult[index]);
}

//Search algorithm. Takes a set, returns all elements in set that starts on specified letter.
function filterByLetterOnIndex(list, index, letter) {
	var subList = [];
	var elements = 0;
	
	
	for (var i = 0; list != null && i < list.length; i++) {
		if(list[i].toLowerCase().charAt(index) == letter) {
			subList[elements++] = list[i];
		}
	}
	
	return subList;
}

// Updates the suggestion list. Both content and the position of the div. 
function showResults(searchBox, list) {

	//init position of suggestion box, based on the searchBox in use
	var boxPos = searchBox.getBoundingClientRect();
	$("#searchResults").css({"left": boxPos.left + 1, "top": boxPos.top + 22})
	
	$("#searchResults").html(""); //clear old search results
	if (!(list.length == allCommodities.length)) {
		$("#searchResults").css({"display": "block"})
		for (var i = 0; i < 4 && i < list.length; i++) {
			$("#searchResults").append('<li class="resultItem">' + list[i] + "</li>");
		}
	}

	$(".resultItem").click(function(e){
		resultClickHandler(searchBox, e.target.innerHTML);
	});

}

//Handles click on the suggestions. 
function resultClickHandler(searchBox, value) {
	searchBox.value = value;
	$("#searchResults").css({"display": "none"});
	validateCommodityInput(searchBox);
}



