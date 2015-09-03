/**
 * ObraController
 *
 * @description :: Server-side logic for managing Obras
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	

	 getObras:function(req,res){
	 	var params = req.allParams();
	 	Obra.find().then(function(dataAll){
	 		console.log(dataAll);
	  		res.json(dataAll);
	 	});

	 }

};

