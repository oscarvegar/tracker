/**
 * RepartidorController
 *
 * @description :: Server-side logic for managing Repartidors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	updateLocation:function(req,res){
		console.log("UPDATE LOC")
		var params = req.allParams();
		params.coordinates[0] = parseFloat(params.coordinates[0])
		params.coordinates[1] = parseFloat(params.coordinates[1])
		
		params.icon="/icon/vespa.png";
			sails.sockets.broadcast("dashboard", "updatePosition", params); 	
		Repartidor.update({id:params.id},{currentLocation:{type:"Point",coordinates:params.coordinates}})
		.then(function(repartidor){
			res.json({code:1})
		})
	},
	all:function(req,res){
		Repartidor.find()
		.populate('usuario').then(function(data){
			res.json(data)
		})
	},
	subscribe:function(req,res){
		sails.sockets.join(req.socket, "repartidor");
		console.log("NUEVO CLIENTE",req.socket.id)
		Repartidor.find().populateAll().then(function(repartidores){
			for(var i in repartidores){
				repartidores[i].icon = "/icon/vespa.png",
				repartidores[i].ordenesActuales = [];
			}
			res.json({
				message: 'Subscribed to a fun room called repartidor',
				repartidores:repartidores
			});
		})
	},
	test:function(req,res){
		console.log("INIT ::: ",new Date())
		var total = 0;
		var lng = 19.50;;
		lat = -99.151613;
		var motos = [];

		for(var j=0;j<1;j++){
			lat-=0.0333;
			motos.push({id:new Date().getTime()+j,lat:lat,lng:lng})
		}

		for(i=0;i<100;i++)
		{
			for(var j in motos){
				//var unixtime_ms = new Date().getTime();
		    	//while(new Date().getTime() < unixtime_ms + 100) {}
		    	console.log("SEND")
				lng = lng+=0.0005;
				console.log(lng)
				sails.sockets.broadcast("dashboard", "updatePosition", { "icon":"/icon/vespa.png","id": motos[j].id,"coordinates": [ motos[j].lat, lng ]}); 
				
				
			}
		}
		res.json("OK")
	}

};



