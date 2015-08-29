/**
* Solicitud.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	productos:{
  		collection:'producto',
  		via: 'solicitudes'
  	},

  	usuario:{
  		model:'usuario'
  	},

  	obra:{
  		model:'obra'
  	},

  	compras:{
  		collection:'compra',
  		via:'solicitud'
  	},

  	unidad:{
  		model:'unidades'
  	}

  }
};

