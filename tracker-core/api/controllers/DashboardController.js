/**
 * DashboardController
 *
 * @description :: Server-side logic for managing Dashboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Q = require('q');
module.exports = {
	subscribe:function(req,resp){
		sails.sockets.join(req.socket, "dashboard");
		console.log("NUEVO CLIENTE DASHBOARD",req.socket.id)
		var queries = [];
		queries.push(Repartidor.find().populateAll());
		queries.push(Orden.find().populateAll());
		Q.all(queries).then(function(res){
			var repartidores = res[0];
			var ordenes = res[1];
			for(var i in repartidores){
				repartidores[i].icon = "/icon/vespa.png",
				repartidores[i].ordenesActuales = [];
			}
			for(var i in ordenes){
				ordenes[i].icon = "/icon/orden.png";
			}
			console.log("REGRESA DE SUBSCRIBE DASHBOARD ")
			resp.json({
				message: 'Subscribed to a fun room called repartidor',
				repartidores:repartidores,
				ordenes:ordenes
			});
		})
	}
};

