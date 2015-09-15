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
	 	console.log(ordenId);
	 	Orden.find().where({id: ordenId}).populateAll().then(function(ordenes){
			res.json(ordenes);
		});

	 	/*DetalleOrden.find().where({orden: ordenId}).populate('orden').then(function(dataAll){
	 		if(dataAll){
	 			if(dataAll.length>0){
	 				var result = []
	 					for(var i=0; i<dataAll.length; i++){
	 						console.log("valor id orden");
	 						console.log(dataAll[i].orden.id);
	 						result.push(
								Orden.find().where({id: dataAll[i].orden.id}).populateAll()
	 						);
	 						
	 					}
							Q.all(result)
							.allSettled(result).then(function(detalleordenes){
								console.log("Valor mergeado");
								console.log(detalleordenes);
								res.json(detalleordenes);

							}).catch(function(err,err2){
							      console.log(err)
								console.log(err2)
							});

	 			}else{
			          return res.json(dataAll);
			        }
	 		}else{
			          return res.json(dataAll);
			        }
	 	});*/

	 }
	
};

