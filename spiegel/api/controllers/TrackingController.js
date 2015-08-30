/**
 * TrackingController
 *
 * @description :: Server-side logic for managing Trackings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	subscribe:function(req,res){
	  if(req.isSocket){
	  	sails.sockets.join(req.socket, "dashboard");
	  	res.json({code:1})
	  }else{
	   res.json(500,{error:"Get out!"})
	  }
	 },

	 update:function(req,res){
	 	var params = req.allParams();
 		params.conductor = {};
	 	console.info("llega update:",params)
 		sails.sockets.broadcast("dashboard","updateTracker", {data:params} );
  		res.json({code:1})
	 }
};

