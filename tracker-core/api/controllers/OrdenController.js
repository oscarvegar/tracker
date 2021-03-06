/**
 * OrdenController
 *
 * @description :: Server-side logic for managing ordens
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 var API_KEY = "AIzaSyCY3mMw2d_n0myF8BDhnoc6rUMgFdIxOiQ";
var Q = require('q')
var request = require('request');
var polyline = require('polyline');

module.exports = {
	'place':function(req,res){
		var order = req.allParams();
		var queries = [];
		order.location = {type:"Point",coordinates:order.location.coordinates};
		order.direccionCompleta = order.direccion.calle 
		+" "+order.direccion.no_ext
		+" COL. "+order.direccion.colonia
		+", "+order.direccion.del_mun
		+", "+order.direccion.estado
		+" C.P. "+order.direccion.cp

		var orderDet = order.detalle;
		queries.push(Repartidor.findOne({currentLocation:{$near:{$geometry:{type:"Point",coordinates:order.location.coordinates}}}}).populate('usuario'));
		queries.push(Modelorama.findOne({location:{$near:{$geometry:{type:"Point",coordinates:order.location.coordinates}}}}));
		
		Q.all(queries).then(function(resultados){
			var URL_GET = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + resultados[0].currentLocation.coordinates[1]+","+resultados[0].currentLocation.coordinates[0]
			+ '&destination='+order.location.coordinates[1]+","+order.location.coordinates[0]
			+ '&waypoints='+ resultados[1].location.coordinates[1]+","+resultados[1].location.coordinates[0]
			+ '&key='+API_KEY;

			request(URL_GET, function (error, response, body) {
				var rutas = JSON.parse(body).routes;
				order.repartidor = resultados[0];
				order.modelorama = resultados[1];
				order.icon="/icon/orden.png";
				Orden.create(order)
				.then(function(data){
					return Orden.findOne({id:data.id}).populateAll();
				}).then(function(data){
					data.ruta = polyline.decode(rutas[0].overview_polyline.points);
					console.log("Orden creada",data);
					data.detalle = orderDet;

					var productQ = [];
			 		for(var i in data.detalle){
			 			productQ.push(Productos.findOne({id:data.detalle[i].producto}))
			 		}
			 		Q.all(productQ).then(function(productos){
			 			console.log("data.detalle",data.detalle.length,data.detalle)
			 			console.log("productos",productos.length,productos)
			 			for(var i in productos){
			 				if(!productos[i])continue;
				 			data.detalle[i].producto = productos[i];
				 		}
				 		data.detail = data.detalle;
				 		data.repartidor = resultados[0];
				 		sails.sockets.broadcast("orden", "create", data); 
						sails.sockets.broadcast("dashboard", "nuevaOrden", data); 
						res.json({code:1})	
			 		}).catch(function(err){
			 			console.error(err)
			 		})

					
				})
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

