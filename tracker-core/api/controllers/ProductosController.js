/**
 * ProductosController
 *
 * @description :: Server-side logic for managing Productos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	all:function(req,res){
		Productos.find().then(function(data){
			return res.json(data)
		})
		
	}
};

