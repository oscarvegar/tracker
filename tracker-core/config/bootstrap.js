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

  Repartidor.count().then(function(count){
    if(count>0)return;
    Repartidor.create([
    {
      nombre:'Oscar Vega',
      usuario:{
        username:'oscar.vega'
      },
      currentLocation:{
        type:"Point",
        coordinates:[-99.1595123,19.5132069]
      }

    },
    {
      nombre:'Erik Ortiz',
      usuario:{
        username:'erik.ortiz'
      },
      currentLocation:{
        type:"Point",
        coordinates:[-99.143071,19.517874]
      }
    }, 
    {
      nombre:'Eladio Rodríguez',
      usuario:{
        username:'eladio.rodriguez'
      },
      currentLocation:{
        type:"Point",
        coordinates:[-99.145944,19.506848]
      }
    }
      ]).then(function(regs){
        console.info("REPARTIDORES CREADOS : ",regs);
        console.info("INDICE 2DSPHERE CREADO REPARTIDOR");
        Repartidor.native(function(err,collection){
          collection.createIndex( { currentLocation : "2dsphere" } )

        });
      })
  });

  Modelorama.count().then(function(count){
    if(count>0)return;
    Modelorama.create(
      [
        {
        nombre :"Modelorama Cerrada De Lago Erene",
        direccion:"3Ra Cerrada De Lago Erene No 22 Miguel Hidalgo 11430 D.F.",
        location:{type:'Point',coordinates:[-99.1912866,19.4490307]}
        },
        {
        nombre :"Modelorama Narvarte Poniente",
        direccion:"Calle Pitágoras No 1002 Narvarte Poniente, Benito Juárez 03020 Benito Juárez, D.F.",
        location:{type:'Point',coordinates:[-99.1522758,19.3866443]}
        },
        {
        nombre :"Modelorama Obrera",
        direccion:"Calle Dr Erazo 73 Obrera, Cuauhtémoc 06720 D.F.",
        location:{type:'Point',coordinates:[-99.1441497,19.4178632]}
        },
        {
        nombre :"Modelorama Alamos",
        direccion:"Segovia 45 Alamos 03400 Benito Juárez, D.F.",
        location:{type:'Point',coordinates:[-99.1458846,19.4053095]}

        },
        {
        nombre :"Modelorama Agricola Oriental",
        direccion:"Av Texcoco 122 Juárez Pantitlan 57460 Nezahualcóyotl, Méx.",
        location:{type:'Point',coordinates:[-99.0489731,19.3937812]}
        },
        {
        nombre :"Modelorama La Noria",
        direccion:"Av. Guadalupe I. Ramírez 660 Tierra Nueva, Xochimilco 16010 Ciudad de México, D.F.",
        location:{type:'Point',coordinates:[-99.1244459,19.2681942]}
        }
      ]).then(function(modeloramas){
        console.info("MODELORAMAS CREADOS ::: ",modeloramas);
        Modelorama.native(function(err,collection){
          collection.createIndex( { location : "2dsphere" } )
          console.info("INDICE 2DSPHERE CREADO MODELORAMAS");

        });
      });
  });


 Modelorama.count().then(function(count){
    if(count>0)return;
    Modelorama.create(
      [
        {
        nombre :"Modelorama Cerrada De Lago Erene",
        direccion:"3Ra Cerrada De Lago Erene No 22 Miguel Hidalgo 11430 D.F.",
        location:{type:'Point',coordinates:[-99.1912866,19.4490307]}
        },
        {
        nombre :"Modelorama Narvarte Poniente",
        direccion:"Calle Pitágoras No 1002 Narvarte Poniente, Benito Juárez 03020 Benito Juárez, D.F.",
        location:{type:'Point',coordinates:[-99.1522758,19.3866443]}
        },
        {
        nombre :"Modelorama Obrera",
        direccion:"Calle Dr Erazo 73 Obrera, Cuauhtémoc 06720 D.F.",
        location:{type:'Point',coordinates:[-99.1441497,19.4178632]}
        },
        {
        nombre :"Modelorama Alamos",
        direccion:"Segovia 45 Alamos 03400 Benito Juárez, D.F.",
        location:{type:'Point',coordinates:[-99.1458846,19.4053095]}

        },
        {
        nombre :"Modelorama Agricola Oriental",
        direccion:"Av Texcoco 122 Juárez Pantitlan 57460 Nezahualcóyotl, Méx.",
        location:{type:'Point',coordinates:[-99.0489731,19.3937812]}
        },
        {
        nombre :"Modelorama La Noria",
        direccion:"Av. Guadalupe I. Ramírez 660 Tierra Nueva, Xochimilco 16010 Ciudad de México, D.F.",
        location:{type:'Point',coordinates:[-99.1244459,19.2681942]}
        }
      ]).then(function(modeloramas){
        console.info("MODELORAMAS CREADOS ::: ",modeloramas);
        Modelorama.native(function(err,collection){
          collection.createIndex( { location : "2dsphere" } )
          console.info("INDICE 2DSPHERE CREADO MODELORAMAS");

        });
      });
  });

  Productos.count().then(function(count){
    if(count>0)return;
    Productos.create(
      [
        {
        'imagen': 'http://www.modelonow.com/repository/productos/1440115982601.png',
        'imagen_hover': 'http://www.modelonow.com/repository/productos/1440115982678.png',
        'descripcion': 'Bud Light',
        'precio': 170.00,
        'presentacion': 'Bud Light - 18 Pack - 355ml - No retornable'
        },
        {
        'imagen': 'http://www.modelonow.com/repository/productos/1440116133232.png',
        'imagen_hover': 'http://www.modelonow.com/repository/productos/1440116133309.png',
        'descripcion': 'Corona Extra',
        'precio': 170.00,
        'presentacion': 'Corona Extra - 18 Pack - 355ml - No retornable'
        },
        {
        'imagen': 'http://www.modelonow.com/repository/productos/1440116317974.png',
        'imagen_hover': 'http://www.modelonow.com/repository/productos/1440116318051.png',
        'descripcion': 'Corona Light',
        'precio': 170.00,
        'presentacion': 'Corona Light - 18 Pack - 355ml - No retornable'
        },
        {
        'imagen': 'http://www.modelonow.com/repository/productos/1440116459637.png',
        'imagen_hover': 'http://www.modelonow.com/repository/productos/1440116459714.png',
        'descripcion': 'Modelo Especial',
        'precio': 220.00,
        'presentacion': 'Modelo Especial - 18 Pack - 355ml - No retornable'
        },
        {
        'cantidad': 0,
        'imagen': 'http://www.modelonow.com/repository/productos/1440116568795.png',
        'imagen_hover': 'http://www.modelonow.com/repository/productos/1440116568872.png',
        'descripcion': 'Stella Artois',
        'precio': 340.00,
        'presentacion': 'Stella Artois - 18 Pack - 330 ml - No Retornable'
        },
        {
        'imagen': 'http://www.modelonow.com/repository/productos/1440116699453.png',
        'imagen_hover': 'http://www.modelonow.com/repository/productos/1440116699530.png',
        'descripcion': 'Michelob Ultra',
        'precio': 265.00,
        'presentacion': 'Michelob Ultra - 18 Pack - 355ml - No retornable'
        },
        {
        'imagen': 'http://www.modelonow.com/repository/productos/1440169062281.png',
        'imagen_hover': 'http://www.modelonow.com/repository/productos/1440169062358.png',
        'descripcion': 'Bud Light Raz-Ber-Rita',
        'precio': 205.00,
        'presentacion': 'Bud Light Raz-Ber-Rita - 18 Pack - 8 Oz - No Retornable'
        },
        {
        'imagen': 'http://www.modelonow.com/repository/productos/1440169658601.png',
        'imagen_hover': 'http://www.modelonow.com/repository/productos/1440169658678.png',
        'descripcion': 'Bud Light Lime-A-Rita',
        'precio': 205.00,
        'presentacion': 'Bud Light Lime-A-Rita - 18 Pack - 8 Oz - No Retornable'
        },
        {
        'imagen': 'http://www.modelonow.com/repository/productos/1440169932088.png',
        'imagen_hover': 'http://www.modelonow.com/repository/productos/1440169932165.png',
        'descripcion': 'Bud Light Straw-Ber-Rita',
        'precio': 205.00,
        'presentacion': 'Bud Light Straw-Ber-Rita - 18 Pack - 8 Oz - No Retornable'
        },
        {
        'imagen': 'http://www.modelonow.com/repository/productos/1440170191776.png',
        'imagen_hover': 'http://www.modelonow.com/repository/productos/1440170191853.png',
        'descripcion': 'Barrilito',
        'precio': 205.00,
        'presentacion': 'Barrilito - 18 Pack - 325 ml - No Retornable'
        },
        {
        'imagen': 'http://www.modelonow.com/repository/productos/1440607565153.png',
        'imagen_hover': 'http://www.modelonow.com/repository/productos/1440607565230.png',
        'descripcion': 'Promo Bud Light',
        'precio': 170.00,
        'presentacion': 'Compra un 18-Pack de Bud Light bote, y ll&eacute;vate 3 botes adicionales. Aplican Restricciones.'
        },
        {
        'imagen': 'http://www.modelonow.com/repository/productos/1441243753010.png',
        'imagen_hover': 'http://www.modelonow.com/repository/productos/1441243753087.png',
        'descripcion': 'Bud Light',
        'precio': 120.00,
        'presentacion': 'Bud Light - 12 Pack - 355ml - No retornable'
        }
      ]
    ).then(function(productos){
      console.info("PRODUCTOS CREADOS ::: ",productos);
    })
  })

 DetalleOrden.count().then(function(count){
    if(count>0)return;
    DetalleOrden.create(
      [{
          orden:{
            locacion:{type:'Point',coordinates:[-99.0489731,19.3937812]},
            direccion:"Av Texcoco 122 Juárez Pantitlan 57460 Nezahualcóyotl, Méx.",
            modelorama:{
              nombre :"Modelorama Narvarte Poniente",
              direccion:"Calle Pitágoras No 1002 Narvarte Poniente, Benito Juárez 03020 Benito Juárez, D.F.",
              location:{type:'Point',coordinates:[-99.1522758,19.3866443]}
            },
          repartidor:{
            nombre:'Erik Ortiz',
            usuario:{
              username:'erik.ortiz'
            },
            currentLocation:{
              type:"Point",
              coordinates:[-99.143071,19.517874]
            }
          }
        },
        producto:{
          imagen: 'http://www.modelonow.com/repository/productos/1440115982601.png',
          imagen_hover: 'http://www.modelonow.com/repository/productos/1440115982678.png',
          descripcion: 'Bud Light',
          precio: 170.00,
          presentacion: 'Bud Light - 18 Pack - 355ml - No retornable'
        },
        cantidad:340.00       
      },


      {
          orden:{
            locacion: {type:'Point',coordinates:[-99.1940733,19.3590942]},
            direccion:"Blvrd Adolfo López Mateos Los Alpes 01010 Ciudad de México, D.F.",
            modelorama:{
              nombre :"Modelorama Narvarte Poniente",
              direccion:"Calle Pitágoras No 1002 Narvarte Poniente, Benito Juárez 03020 Benito Juárez, D.F.",
              location:{type:'Point',coordinates:[-99.1522758,19.3866443]}
            },
          repartidor:{
            nombre:'Eladio Rodríguez',
            usuario:{
              username:'eladio.rodriguez'
            },
            currentLocation:{
              type:"Point",
              coordinates:[-99.143071,19.517874]
            }
          }
        },
        producto:{
           imagen: 'http://www.modelonow.com/repository/productos/1440116459637.png',
           imagen_hover: 'http://www.modelonow.com/repository/productos/1440116459714.png',
           descripcion: 'Modelo Especial',
           precio: 220.00,
           presentacion: 'Modelo Especial - 18 Pack - 355ml - No retornable'
        },
        cantidad:660.00       
      },


       {
          orden:{
            locacion: {type:'Point',coordinates:[-99.1549333,19.4236633]},
            direccion:"Guaymas 34 Roma Nte. 06700 Ciudad de México, D.F.",
            modelorama:{
              nombre :"Modelorama Obrera",
              direccion:"Calle Dr Erazo 73 Obrera, Cuauhtémoc 06720 D.F.",
              location:{type:'Point',coordinates:[-99.1441497,19.4178632]}
            },
          repartidor:{
            nombre:'Oscar Vega',
            usuario:{
              username:'oscar.vega'
            },
            currentLocation:{
              type:"Point",
              coordinates:[-99.155238,19.423400]
            }
          }
        },
        producto:{
           imagen: 'http://www.modelonow.com/repository/productos/1440116459637.png',
           imagen_hover: 'http://www.modelonow.com/repository/productos/1440116459714.png',
           descripcion: 'Modelo Especial',
           precio: 220.00,
           presentacion: 'Modelo Especial - 18 Pack - 355ml - No retornable'
        },
        cantidad:880.00       
      },


        
      ]).then(function(detalleordenes){
        console.info("DETALLE ORDENES CREADAS::: ",detalleordenes);
      });
  });
  

  cb();
};
	