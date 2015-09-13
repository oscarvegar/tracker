/**
 * ModeloramaController
 *
 * @description :: Server-side logic for managing Modeloramas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	all:function(req,res){
		Modelorama.find().then(function(data){
			return res.json(data);
		})
	}
};

