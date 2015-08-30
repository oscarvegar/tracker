/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  /*
  Estado.find().then(function(estados){
  	if( estados.length === 0 ){
  		var estado1 = { "_id" : "55e253f4d7ab6f2e534c3eeb", "nombre" : "Jalisco" };
  		var estado2 = { "_id" : "55e253fad7ab6f2e534c3eec", "nombre" : "Distrito Federal" };
  		var estado3 = { "_id" : "55e25404d7ab6f2e534c3eed", "nombre" : "Nuevo León" };
  		Estado.create(estado1).then(function(estadon){});
  		Estado.create(estado2).then(function(estadon){});
  		Estado.create(estado3).then(function(estadon){});
  	}
  });
	*/



  cb();
};
	