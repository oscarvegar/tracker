/**
 * OrdenController
 *
 * @description :: Server-side logic for managing ordens
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Q = require('q')
module.exports = {
	'place':function(req,res){
		var order = req.allParams();
		var queries = [];
		order.location = {type:"Point",coordinates:order.location.coordinates};
		queries.push(Repartidor.findOne({currentLocation:{$near:{$geometry:{type:"Point",coordinates:order.location.coordinates}}}}));
		queries.push(Modelorama.findOne({location:{$near:{$geometry:{type:"Point",coordinates:order.location.coordinates}}}}));
		delete order.coordinates;
		Q.all(queries).then(function(resultados){
			console.log("REPARTIDOR MAS CERCANO",resultados[0]);
			console.log("MODELORAMA MAS CERCANO",resultados[1]);
			order.repartidor = resultados[0];
			order.modelorama = resultados[1];
			Orden.create(order).populateAll()
			.then(function(data){
				return Orden.findOne({id:data.id}).populateAll();
			}).then(function(data){
				console.log("Orden creada",data);
				sails.sockets.broadcast("orden", "create", data); 
				res.json({code:1})
			})
				
			
		}).catch(function(err){
			console.error(err);
		});
		
	},
	subscribe:function(req,res){
		sails.sockets.join(req.socket, "orden");
		console.log("NUEVO CLIENTE",req.socket.id)
		Orden.find().populateAll().then(function(ordenes){
			res.json({
				message: 'Subscribed to a fun room called orden',
				ordenes:ordenes
			});
		})
	},
	repartidor:function(req,res){
		Orden.find({repartidor:req.param('id')}).then(function(data){
			return res.json(data)
		})
	}
};

