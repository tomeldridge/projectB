/*******************************************************************
client side js logic for submitAnimal page
** ****************************************************************/
document.addEventListener("DOMContentLoaded", function(proceed){

	var submitButton = document.getElementsByName("newAnimalSubmit")[0];

	submitButton.addEventListener("click", function(event){
		//store form input values to variables
		var payload = {};
		
		var animalType = document.getElementById("submitAnimalType");
		payload.animalType = animalType.options[animalType.selectedIndex].value;
		payload.address = document.getElementsByName("newAnimalAddress")[0].value;
		payload.city = document.getElementsByName("newAnimalCity")[0].value;
		payload.state = document.getElementById("newAnimalState").value;
		payload.description = document.getElementById("newAnimalDescription").value;

		
		
		var req = new XMLHttpRequest();
		req.open("GET", "http://35.164.210.244:3000/insertanimal?animalType=" + payload.animalType + "&address=" + payload.address + "&city=" + payload.city + "&state=" + payload.state  + "&description=" + payload.description, true);
		
		req.addEventListener("load",function(){
			if(req.status >= 200 && req.status < 400){
				
				console.log("success");
			} 
		
			else {
				console.log("Network Error: " + req.statusText);
		  }});
		
		req.send(null);
		event.preventDefault();
		
})});


