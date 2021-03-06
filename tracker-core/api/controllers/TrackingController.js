/**
 * TrackingController
 *
 * @description :: Server-side logic for managing Trackings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var Q = require("q");
module.exports = {


	subscribe:function(req,res){
	  if(req.isSocket){
	  	var promesas = [];
	  	promesas.push( Cedis.find() );
	  	promesas.push( Estacionamiento.find() );
	  	promesas.push( Obra.find() );

	  	Q.all(promesas).allSettled(promesas).then(function(result){
			//console.log("Se ejecutaron los queris: ", result);
	  		var roomName = 'dashboard';
		   	sails.sockets.join(req.socket, roomName);
		   	var puntos = [];
		   	for(var rProm in result){
		   		var arrayData = result[rProm];
		   		puntos = puntos.concat(arrayData.value);
		   	}
		   	console.log("puntos: ", puntos);
		   	res.json({puntos: puntos});
		}).catch(function(err){
			console.error("Error al ejecutar promesas: ", err);
		});		

	  }else{
	   res.json(500,{error:"Get out!"})
	  }
	 },

	 update:function(req,res){
	 	var params = req.allParams();
	 	Conductor.findOne({idRef: eval(params.id)}).populate("unidad").then(function(conductor){
	 		params.conductor = conductor;
	 		//console.log(  );
	 		sails.sockets.broadcast("dashboard","updateTracker", {data:params} );
	  		res.json({code:1})
	 	})
	 	//console.log( "Params: ", params );
	  	
	 },
	
    stopped:function(req,res){
	  	var promesas = [];
        promesas.push( Conductor.find({"idref":{$gt:50}}) );
	  	Q.all(promesas).allSettled(promesas).then(function(result){
		   	var puntos = [];
		   	for(var rProm in result){
		   		var arrayData = result[rProm];
		   		puntos = puntos.concat(arrayData.value);
		   	}
		   	res.json({puntos: puntos});
		}).catch(function(err){
			console.error("Error al ejecutar promesas: ", err);
		});
    }
};

