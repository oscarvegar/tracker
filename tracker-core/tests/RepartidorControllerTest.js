var unirest = require('unirest')
console.log("INIT ::: ",new Date())
var total = 0;
var lng = 0;;
lat = 0;
var motos = [];

for(var j=0;j<500;j++){
	motos.push({id:new Date().getTime()+j,lat:lat,lng:lng,nextCall:0})
}

for(i=0;i<10;i++)
{
	for(var j in motos){
		//var unixtime_ms = new Date().getTime();
    	//while(new Date().getTime() < unixtime_ms + 100) {}
		lng = lng+=0.0005;
		var obj = { "id": motos[j].id,"coordinates": [ lat+(randomInt(-120,130)), lng+(randomInt(-60,70)) ]};

		setTimeout(sendPetition,0,obj,obj);
		
	}
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function sendPetition(obj){
	unirest.post("http://yoplanner.com:1337/api/repartidor/updateLocation")
			.header('Accept', 'application/json')
			.send(obj)
			.end(function (response) {
				total++;
			  	var resp = response.body;
				if(total==100)console.log("END ::: ",new Date())
			});

}



