var idLocation = 0; 
//i need timer every time anyone pass in front activate the div for 30 seconds

//calling start methods
mostrarVentana();
setActionsToButtoms();

var socket = io.connect('http://localhost:8081');
      socket.on('removeScreen', function(msg){
        console.log("message" + msg);
      });
        socket.emit('removeAction', "example");

function mostrarVentana()
{
    var ventana = document.getElementById("miVentana");
    ventana.style.display = "block";
}

function ocultarVentana()
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
			idlocation = txtIdLocation;
		}
	}else{
		alert("put a numeric value and dont let empty");
	}
}

function validateIdArduino(id){
	
}