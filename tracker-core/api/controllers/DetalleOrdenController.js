/**
 * DetalleOrdenController
 *
 * @description :: Server-side logic for managing Detalleordens
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Q = require("q"); 

module.exports = {

	 'getDetalle/:orderId':function(req,res){
	 	var params = req.allParams();
	 	var ordenId = params.orderid;
	 	console.log("ordenId",ordenId);
	 	Orden.findOne().where({id: ordenId}).populateAll().then(function(data){
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
		 		console.log(data)
		 		res.json(data);
	 		}).catch(function(err){
	 			console.error(err)
	 		})
		}).catch(function(err){
			console.log(err)
		})

	 	

	 },
	 test:function(req,res){
	 	Orden.findOne({id:"55f87c175b50a9f445a34824"}).populateAll().then(function(data){
	 		var productQ = [];
	 		for(var i in data.detalle){
	 			productQ.push(Productos.find({id:data.detalle[i].producto}))
	 		}
	 		Q.all(productQ).then(function(productos){
	 			for(var i in productos){
		 			data.detalle[i].producto = productos[i];
		 			res.json(data);
		 		}
	 		})
	 		
	 	})
	 }
	
};

