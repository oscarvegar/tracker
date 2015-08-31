'use strict';

var API_KEY = "AIzaSyCY3mMw2d_n0myF8BDhnoc6rUMgFdIxOiQ";
	//API_KEY = 'AIzaSyDcgcRWPdgGdeztRGC37OJlmaKlGW6YOkc';
var URL_POST = 'http://yoplanner:1337/api/tracking/update';
	//URL_POST = 'http://192.168.0.16:1337/api/tracking/update';
    //yoplanner.com
var fs = require("fs");
var request = require('request');
var Promise = require("bluebird");
var polyline = require('polyline');

var routes = [
   //centro  av miguel hidalgo
[{
	origin:{
		latitude:  19.290431, 
		longitude: -99.654905
	},
	destination:{	
	    latitude:  19.288568, 
		longitude: -99.676105
	}
	
}],
//isidro fabela
[{
	origin:{
		latitude:  19.315820, 
		longitude: -99.650678
	},
	destination:{	
	    latitude:  19.379046, 
		longitude: -99.702174
	}
	
}],
// toluca atenco
[{
	origin:{
		latitude:  19.288820, 
		longitude: -99.622355
	},
	destination:{	
	    latitude:  19.284696, 
		longitude: -99.526463
	}
	
}],
// 
[{
	origin:{
		latitude:  19.287653, 
		longitude: -99.658537
	},
	destination:{	
	    latitude:  19.274123, 
		longitude: -99.659781
	}
	
}],
//
[{
	origin:{
		latitude:  19.287717, 
		longitude: -99.654333
	},
	destination:{	
	    latitude:  19.272848, 
		longitude: -99.653846
	}
	
}],
//
[{
	origin:{
		latitude:  19.275720, 
		longitude: -99.647325
	},
	destination:{	
	    latitude:  19.289730, 
		longitude: -99.650100
	}
	
}],
//
[{
	origin:{
	    latitude:  19.251163,
		longitude:   -99.614699
		
	},
	destination:{	
	    latitude:  19.272608, 
		longitude: -99.644253
	}
	
}]
 	
];


var genericRoutesIterator = function(x, routeArry) {
	//console.log(routeArry, '********', x);
	
	var URL_GET;
	if(routeArry.length == 1) {
		var route = routeArry[routeArry.length-1];
		URL_GET = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + route.origin.latitude + ',' + route.origin.longitude
			+ '&destination=' + route.destination.latitude + ',' + route.destination.longitude
			+ '&key='+API_KEY
	} else {
		URL_GET = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + routeArry[0]
			+ '&destination='+routeArry[routeArry.length-1]
			+ '&waypoints='+routeArry.join('|')
			+ '&key='+API_KEY
	}
	//console.log('URL_GET ::', URL_GET, '******', x);

	request(URL_GET, function (error, response, body) {
	    // console.log(routeSteps); // Show the HTML for the Google homepage.
		if (!error && response.statusCode == 200) {
			//console.log(JSON.parse(body), x);

			if(JSON.parse(body).routes.length == 0) {
				setTimeout(function() {
					genericRoutesIterator(x, routeArry);
				}, 1500);
			}

			// var routeSteps = JSON.parse(body).routes[0].legs;
			var routes = JSON.parse(body).routes;

			// var recursivePolylinePoints = function(id, polylinePoints, index, cb, steps, stepIndex) {
			var recursivePolylinePoints = function(id, polylinePoints, index, timeout, cb) {
				console.log('on recursivePolylinePoints');
				if(index < polylinePoints.length) {
					var polylinePoint = polylinePoints[index];

					if(x < 15) {
						timeout = timeout / 2;
					}
					setTimeout(function() {
						var LatLongSplit = (polylinePoint + "").split(',');
						var postObj = {
							id: x,
							latitude: parseFloat(LatLongSplit[0]),
							longitude: parseFloat(LatLongSplit[1]),
							icon: 'pickup.png'
						};
						//console.log(postObj);

						if(index == 0) {
							postObj['first'] = 'true';
						}
						
						request.post({url: URL_POST, formData: postObj}, function optCb(err, httpResponse, body) {
							if (err) {
								return console.error('post failed:', err);
							}
							console.log('Successfully!');

							recursivePolylinePoints(id, polylinePoints, (index + 1), timeout, cb);
						});
					}, (timeout * 1000));
				} else {
					cb();
				}
			}

			// var recursiveSteps = function(id, steps, index, cb, legs, legIndex) {
			var recursiveSteps = function(id, steps, index, cb) {
				console.log('on recursiveSteps');
				if(index < steps.length) {
					var step = steps[index];
				    var TimeOutStep = Math.ceil(step.distance.value / step.duration.value);
				    //console.log(TimeOutStep);

				    var dat = polyline.decode(step.polyline.points);
				    var polylinePoints = (dat + "").match(/([-]?)\d{1,3}[.]\d{1,5}[,]([-]?)\d{1,3}[.]\d{1,5}([,]?)/g);

				    // recursivePolylinePoints(id, polylinePoints, 0, recursiveSteps, steps, stepIndex);
				    recursivePolylinePoints(id, polylinePoints, 0, TimeOutStep, function() {
				    	recursiveSteps(id, steps, (index + 1), cb);
				    });
				} else {
					cb();
				}
			}

			// var recursiveLegs = function(id, legs, index, cb, routes, routeIndex) {
			var recursiveLegs = function(id, legs, index, cb) {
				console.log('on recursiveLegs');
				if(index < legs.length) {
					var leg = legs[index];
					recursiveSteps(id, leg.steps, 0, function() {
						recursiveLegs(id, legs, (index + 1), cb);
					});
				} else {
					cb();
				}
			}

			var recursiveRoutes = function(id, routes, index) {
				console.log('on recursiveRoutes');
				if(index < routes.length) {
					var route = routes[index];
					// recursiveLegs(id, route.legs, 0, recursiveRoutes, routes, index);
					recursiveLegs(id, route.legs, 0, function() {
						recursiveRoutes(id, routes, (index + 1));
					});
				}
			}

			recursiveRoutes(x, routes, 0);

			/*
		    var recursiveCB2 = function(id, routeSteps, index, datSplitArry, index2, timeout, cb) {
		    	if(index2 < datSplitArry.length) {
			    	var datSplit = datSplitArry[index2];
					//console.log(datSplit, index2);
					setTimeout(function() {
						var LatLongSplit = (datSplit + "").split(',');
						var postObj = {
							id: x,
							latitude: parseFloat(LatLongSplit[0]),
							longitude: parseFloat(LatLongSplit[1]),
							icon: 'pickup.png'
						};
						//console.log(postObj);

						if(index2 == 0) {
							postObj['first'] = 'true';
						}
						
						request.post({url: URL_POST, formData: postObj}, function optionalCallback(err, httpResponse, body) {
							if (err) {
								return console.error('upload failed:', err);
							}
							console.log('Successfully!');

							recursiveCB2(id, routeSteps, index, datSplitArry, index2+1, timeout, cb);
						});
					}, (timeout * 1000));
		    	} else {
		    		cb(id, routeSteps, index+1, cb);
		    	}
		    }

		    var recursiveCB1 = function(id, routeSteps, index, cb) {
		    	if(index < routeSteps.length) {
		    		//console.log(routeSteps[index], index);
			    	var step = routeSteps[index].steps[0];
				    var TimeOutStep = Math.ceil(step.distance.value / step.duration.value);
				    //console.log(TimeOutStep);

				    var dat = polyline.decode(step.polyline.points);
				    var datSplitArry = (dat + "").match(/([-]?)\d{1,3}[.]\d{1,5}[,]([-]?)\d{1,3}[.]\d{1,5}([,]?)/g);

				    recursiveCB2(id, routeSteps, index, datSplitArry, 0, TimeOutStep, cb);

				    // cb(id, routeSteps, index++, cb);
		    	}
		    }

		    recursiveCB1(1000, routeSteps, 0, recursiveCB1);
		    */
		}
	});
}


for(var x = 0; x < routes.length; x++) {
	// loopObjRoutes(x, routes[x]);
	genericRoutesIterator(x, routes[x]);
}

/*
for(var y = 0; y < routesArry.length; y++) {

	if((y+1) == routesArry.length) {
		loopArryRoutes((y+routes.length), routesArry[y]);
	} else {
		var newArryR = new Array();
		var tmpArry = routesArry[y];
		for(var z = 0; z < routesArry[y].length; z++) {
			newArryR.push(routesArry[y][z].reverse());
		}
		loopArryRoutes((y+routes.length), newArryR);
	}
}
*/

/*for(var y = 0; y < routesArry.length; y++) {

	if((y+1) == routesArry.length) {
		genericRoutesIterator((y+routes.length), routesArry[y]);
	} else {
		var newArryR = new Array();
		var tmpArry = routesArry[y];
		for(var z = 0; z < routesArry[y].length; z++) {
			newArryR.push(routesArry[y][z].reverse());
		}
		genericRoutesIterator((y+routes.length), newArryR);
	}

}*/
