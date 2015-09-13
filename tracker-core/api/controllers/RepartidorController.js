/**
 * RepartidorController
 *
 * @description :: Server-side logic for managing Repartidors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	updateLocation:function(req,res){
		var params = req.allParams();
		sails.sockets.broadcast("repartidor", "update", params); 
		Repartidor.update({id:params.id},{currentLocation:{type:"Point",coordinates:params.coordinates}})
		.then(function(repartidor){
			res.json({code:1})
		})
	},
	subscribe:function(req,res){
		sails.sockets.join(req.socket, "repartidor");
		console.log("NUEVO CLIENTE",req.socket.id)
		Repartidor.find().populateAll().then(function(repartidores){
			for(var i in repartidores){
				repartidores[i].icon = "/pickup_green.png",
				repartidores[i].ordenesActuales = [];
			}
			res.json({
				message: 'Subscribed to a fun room called repartidor',
				repartidores:repartidores
			});
		})
	}
};

