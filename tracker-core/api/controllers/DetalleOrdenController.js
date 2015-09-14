/**
 * DetalleOrdenController
 *
 * @description :: Server-side logic for managing Detalleordens
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	 getDetalle:function(req,res){
	 	var params = req.allParams();
	 	DetalleOrden.find().populate('orden').populate('producto').then(function(dataAll){
	 		//console.log(dataAll);
	  		res.json(dataAll);
	 	});

	 }
	
};

