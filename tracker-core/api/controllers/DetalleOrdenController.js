/**
 * DetalleOrdenController
 *
 * @description :: Server-side logic for managing Detalleordens
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	 'getDetalle/:orderId':function(req,res){
	 	var params = req.allParams();
	 	var ordenId = params.orderid;
	 	console.log(ordenId);
	 	DetalleOrden.find().where({orden: ordenId}).populateAll().then(function(dataAll){
	 		console.log(dataAll);
	  		res.json(dataAll);
	 	});

	 }
	
};

