/**
 * OrdenController
 *
 * @description :: Server-side logic for managing ordens
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	place:function(req,res){

	},
	subscribe:function(req,res){
		sails.sockets.join(req.socket, "orden");
		res.json({
			message: 'Subscribed to a fun room called '+roomName+'!'
		});
	}
};

