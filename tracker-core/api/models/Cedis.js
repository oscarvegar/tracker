/**
* Cedis.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	compras:{
  		collection:'compra',
  		via:'cedis'
  	},
  	estado:{
  		model:'estado'
  	},
  	locacion:'json',//{type:'string',coordinates:[98.378282,-107.23829292]}
  }
};

