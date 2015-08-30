/**
 * TrackingController
 *
 * @description :: Server-side logic for managing Trackings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


	subscribe:function(req,res){
	  if(req.isSocket){
	   var roomName = 'dashboard';
	   sails.sockets.join(req.socket, roomName);
	   res.json({
	       message: 'Subscribed to a fun room called '+roomName+'!'
	     });
	  }else{
	   res.json(500,{error:"Get out!"})
	  }
	 },

	 update:function(req,res){
	  sails.sockets.broadcast("dashboard","updateTracker", {data:"hola rafa"});
	  res.json({code:1})
	 }
	
};

