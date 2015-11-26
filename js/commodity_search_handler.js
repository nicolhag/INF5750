//init
var allCommodities = ["BCG", "Malarone", "Typhoid", "Meningococcal", "Measles", "Pneumococcal", "Yellow fever", "Dateiphtheria", "Rabies", "Rubella", "Twinrix", "Tetanus", "Hepatitis A", "Hepatitis B"];
var lastSearchResult = [];
lastSearchResult[0] = allCommodities;
var previousInputLength = 0;

function showResult(str) {
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
	showResults(lastSearchResult[index]);
	//console.log(lastSearchResult[index]);

}

function filterByLetterOnIndex(list, index, letter) {
	var subList = [];
	var elements = 0;

	for (var i = 0; i < list.length; i++) {
		if(list[i].toLowerCase().charAt(index) == letter) {
			subList[elements++] = list[i];
		}
	}
	return subList;
}

function showResults(list) {

	//init position of suggestion box
	var boxPos = $("#name").position();
	$("#searchResults").css({"left": boxPos.left + 1, "top": boxPos.top + 22})
	//clear old search results
	$("#searchResults").html("");
	if (!(list.length == allCommodities.length)) {
		$("#searchResults").css({"display": "block"})
		for (var i = 0; i < 4 && i < list.length; i++) {
			$("#searchResults").append('<li class="resultItem">' + list[i] + "</li>");
		}
	}

	$(".resultItem").click(function(e){
		resultClickHandler(e.target.innerHTML);
	});

}

function resultClickHandler(value) {
	$("#name").val(value);
	$("#searchResults").css({"display": "none"})
}
