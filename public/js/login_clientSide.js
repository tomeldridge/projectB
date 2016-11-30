/*******************************************************************
client side js logic for login page
** ****************************************************************/
	function makeHiddenInputs(elName, elVal){
		x = document.createElement("input");
		x.type = "hidden";
		x.name = elName;
		x.value = elVal;

		return x;
	}

document.addEventListener("DOMContentLoaded", function(proceed){
	
	var submitButton = document.getElementById("login");
	submitButton.addEventListener("click", function(event)
	{

		//check if incorrect password message is on screen from previous login attempt and delete it
		var oldMessage = document.getElementById("pwMessage");
		if(oldMessage)
		{
			oldMessage.remove();
		}
		
		
		var req = new XMLHttpRequest();
		var payload = {};
		payload.uname = document.getElementById('uname').value;
		payload.pw = document.getElementById('pw').value;
		
		req.open('POST', '/loginuser', true);
		req.setRequestHeader('Content-Type', 'application/json');
		
		
		req.addEventListener('load',function(){
			//if node returns incorret pw code
			console.log(req.status);
			if(req.status == 401){
				var div = document.getElementById("loginForm");
				var passwordMessage = document.createElement("h3");
				passwordMessage.id = "pwMessage";
				passwordMessage.textContent = "Incorrect Username or Password";
				passwordMessage.style.color = "red";
				div.appendChild(passwordMessage);
			}
			
			
			if(req.status >= 200 && req.status < 400){
				console.log("The response text: ");
				console.log(req.responseText);
				var resData = JSON.parse(req.response);
				console.log(resData.animal);
				console.log(resData.uid);

				
				document.getElementById("animalList").style.visibility = "visible";
				for(var i = 0; i < resData.animal.length; i++){
					var listItem = document.createElement("li");
					listItem.style.border="thin solid";
					listItem.style.backgroundColor = "white";
					listItem.style.padding = "3px";
					listItem.style.marginLeft = "50px";
					listItem.class = "listInner";
					//var aPic = document.createElement("file");
					//aPic = resData[i].photo;
					//listItem.appendChild(aPic);
					var aCity = document.createElement("div");
					aCity.class="cityDiv";
					aCity.style.backgroundColor = "white";
					aCity.style.marginLeft = "15px";
					aCity.textContent = "Current Location: " + resData.animal[i].city + ", " + resData.animal[i].animalState;
					listItem.appendChild(aCity);
					var aDescrip = document.createElement("div");
					aDescrip.class="descriptionDiv"; 
					aDescrip.style.backgroundColor = "white";
					aDescrip.style.marginLeft = "15px";
					aDescrip.textContent = "Description: " + resData.animal[i].description;
					listItem.appendChild(aDescrip);
					var form = document.createElement("form");
					form.action = "/viewanimal";
					form.class = "listForm";
					form.method = "get";
					form.style.backgroundColor = "white";
					form.style.marginLeft = "25px";
					form.style.alignItems = "center";
					form.style.padding = "0";
					
					var uid = makeHiddenInputs("uid",resData.uid);
					form.appendChild(uid);

					var upass = makeHiddenInputs("upass",resData.upass);
					form.appendChild(upass);

					var des = makeHiddenInputs("description", resData.animal[i].description);
					form.appendChild(des);

					var c = makeHiddenInputs("city", resData.animal[i].city);
					form.appendChild(c);

					var s = makeHiddenInputs("animalState", resData.animal[i].animalState);
					form.appendChild(s);

					var ad = makeHiddenInputs("address", resData.animal[i].address);
					form.appendChild(ad);

					var stat = makeHiddenInputs("status", resData.animal[i].status);
					form.appendChild(stat);

					var button = document.createElement("button");
					button.type = "submit";
					button.class = "listButton";
					button.name = "anId";
					button.textContent = "View Animal";
					button.id = resData.animal[i].id;
					button.value = resData.animal[i].id;
					button.formaction="/viewanimal";
					button.style.color = "green";
					button.style.backgroundColor = "lightgrey";
					button.style.alignSelf = "center";
					button.style.fontSize = "12px";
					button.style.border = "1px solid black";
					form.appendChild(button);
					var formCont = document.createElement("div");
					formCont.style.alignItems = "center";
					formCont.appendChild(form);
					listItem.appendChild(formCont);
					document.getElementById('animalList').appendChild(listItem);
				}
			}	
			else{
				console.log("Error in network request: " + req.statusText);
			}
		});
		
		
		req.send(JSON.stringify(payload));
		event.preventDefault();
		event.stopPropagation();
})});


