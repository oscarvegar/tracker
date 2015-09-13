/**
* Orden.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		detalle:{
			collection:'DetalleOrden',
			via:'orden'
		},
		usuario:{
			model:'usuario'
		},
		locacion:'json',//{type:'string',coordinates:[98.378282,-107.23829292]}
		direccion:'json',
		modelorama:{
			model:'modelorama'
		},
		repartidor:{
			model:'repartidor'
		}
	}
};

