/*******************************************************************
client side js logic for signup page
** ****************************************************************/
document.addEventListener("DOMContentLoaded", function(proceed){

	var submitButton = document.getElementsByName("Submit Info")[0];

	submitButton.addEventListener("click", function(event){
		//store form input values to variables
		var payload = {};
		payload.fname = document.getElementsByName("newUserFirstName")[0].value;
		payload.lname = document.getElementsByName("newUserLastName")[0].value;
		payload.address = document.getElementsByName("newUserStreetAddress")[0].value;
		payload.city = document.getElementsByName("newUserCity")[0].value;
		payload.state = document.getElementById("stateSubmit").value;
		payload.zip = document.getElementsByName("newUserZip")[0].value;
		payload.number = document.getElementsByName("newUserPhone")[0].value;
		payload.email = document.getElementsByName("newUserEmail")[0].value;
		payload.uname = document.getElementsByName("newUserSystemName")[0].value;
		payload.pw = document.getElementsByName("newUserPassword")[0].value;
		
		//store animal preference checkbox values to variables
		payload.hostDog = document.getElementById("hostDog").checked;
		payload.hostCat = document.getElementById("hostCat").checked;
		payload.hostBird = document.getElementById("hostBird").checked;
		payload.hostHorse = document.getElementById("hostHorse").checked;
		payload.helpDog = document.getElementById("helpDog").checked;
		payload.helpCat = document.getElementById("helpCat").checked;
		payload.helpBird = document.getElementById("helpBird").checked;
		payload.helpHorse = document.getElementById("helpHorse").checked;		
		payload.adoptDog = document.getElementById("adoptDog").checked;
		payload.adoptCat = document.getElementById("adoptCat").checked;
		payload.adoptBird = document.getElementById("adoptBird").checked;
		payload.adoptHorse = document.getElementById("adoptHorse").checked;	

		
		
		var req = new XMLHttpRequest();
		req.open("GET", "http://35.164.210.244:3000/insert?fname=" + payload.fname + "&lname=" + payload.lname + "&address=" + payload.address + "&city=" + payload.city + "&state=" + payload.state + "&zip=" + payload.zip + "&number=" + payload.number + "&email=" + payload.email + "&uname=" + payload.uname + "&pw=" + payload.pw + "&hostDog=" + payload.hostDog + "&hostCat=" + payload.hostCat + "&hostBird=" + payload.hostBird + "&hostHorse=" + payload.hostHorse + "&helpDog=" + payload.helpDog + "&helpCat=" + payload.helpCat + "&helpBird=" + payload.helpBird + "&helpHorse=" + payload.helpHorse + "&adoptDog=" + payload.adoptDog + "&adoptCat=" + payload.adoptCat + "&adoptBird=" + payload.adoptBird + "&adoptHorse=" + payload.adoptHorse, true);
		
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


