var urlServer = 'http://localhost/friendlydisplays/';//modificar una vez se cambie de nombre a la carpeta
var visibleLayout = true;
//var urlImages 
var x = new XMLHttpRequest();
var idLocation = 0; 
var myVar;
//i need timer every time anyone pass in front activate the div for 30 seconds

//calling start methods
showModalLocation();
setActionsToButtoms();

var socket = io.connect('http://localhost:8081');
      socket.on('removeScreen', function(msg){
        var message = JSON.parse(msg);
        console.log(msg);
        console.log("the id from the client is:"+message["locationid"]);
        if(message["locationid"] == idlocation){
        	hideModalDarkLayer();
	        clearTimeout(myVar);
	        myVar = setTimeout(showModalDarkLayer, 5000);
        }
      });

function showModalDarkLayer(){
	var ventana = document.getElementById("layerDark");
    ventana.style.display = "block";
}

function hideModalDarkLayer(){
	var ventana = document.getElementById("layerDark");
    ventana.style.display = "none";
}

function showModalLocation()
{
    var ventana = document.getElementById("miVentana");
    ventana.style.display = "block";
}

function hideModalLocation()
{
    var ventana = document.getElementById("miVentana");
    ventana.style.display = "none";
}

function setActionsToButtoms(){
	// check the id of the location
	document.getElementById("btnAccept").onclick = function() { getIdLocations(); }
}

function getIdLocations(){
	var txtIdLocation = document.getElementById("idlocation").value;
	if(txtIdLocation != '' && isNaN(txtIdLocation) == false){
		if(txtIdLocation > 0){
			console.log("numeric value valid");
			validateIdArduino(txtIdLocation);
		}
	}else{
		alert("put a numeric value and dont let empty");
	}
}

function validateIdArduino(id){
	idlocation = id;

	x.open('POST', urlServer + 'getLocation.php', true);
	//send request
	var data = new FormData();
	data.append('idLocation', idlocation);

	x.send(data);
	//event handler
	x.onreadystatechange = function()
	{
		if(x.status ==200 & x.readyState == 4)
		{
			console.log(x.responseText);
			var location = JSON.parse(x.responseText);
			if(location["status"]==0){
				alert("location valid");
				hideModalLocation();

			}else{
				alert("location invalid");
			}
			
		}
	}
	
}