'use strict';

var API_KEY = "AIzaSyCY3mMw2d_n0myF8BDhnoc6rUMgFdIxOiQ";
	//API_KEY = 'AIzaSyDcgcRWPdgGdeztRGC37OJlmaKlGW6YOkc';
var URL_POST = 'http://yoplanner.com:1337/api/tracking/update';
	//URL_POST = 'http://192.168.0.16:1337/api/tracking/update';

var fs = require("fs");
var request = require('request');
var Promise = require("bluebird");
var polyline = require('polyline');

var routes = [
	[{
		origin: {
			latitude: 20.6737919,
			longitude: -103.3354131
		},
		destination: {
			latitude: 21.5009858,
			longitude: -104.8769046
		}
	}],
	//monterrey - apodaca
	[{
		origin: {
			latitude: 25.6640744,
			longitude: -100.3119816
		},
		destination: {
			latitude: 26.503248,
			longitude: -100.1763922
		}
	}],
	//planetario_alfa - apodaca
	[{
		origin: {
			latitude: 25.6364532,
			longitude: -100.3578866
		},
		destination: {
			latitude: 25.7800006,
			longitude: -100.1911025
		}
	}],
	//nicolas de los garza - nuevo laredo
	[{
		origin: {
			latitude: 25.7553404,
			longitude: -100.2896538
		},
		destination: {
			latitude: 27.4827043,
			longitude: -99.5062617
		}
	}],

	[{
		origin: {
			longitude: -99.11341,
			latitude: 19.40584
		},
		destination: {
			longitude: -99.11127,
			latitude: 19.42717
		}
	}],

	[{
		origin: {
			latitude: 19.418744,
			longitude: -99.094346
		},
		destination: {
			latitude: 17.072437,
			longitude: -96.724917
		}
	}],

	[{
		origin: {
			latitude: 19.0400705,
			longitude: -98.1929651
		},
		destination: {
			latitude: 19.1787668,
			longitude: -96.1624256
		}
	}],

	[{
		origin: {
			latitude: 17.163454,
			longitude: -96.210067
		},
		destination: {
			latitude: 16.2574821,
			longitude: -92.2546849
		}
	}],

	[{
		origin: {
			latitude: 19.3907336,
			longitude: -99.1436127
		},
		destination: {
			latitude: 20.8425118,
			longitude: -99.8198078
		}
	}],

	[{
		origin: {
			latitude: 24.5949798,
			longitude: -104.8414145
		},
		destination: {
			latitude: 23.2467895,
			longitude: -106.4221601
		}
	}],

	[{
		origin: {
			latitude: 23.3956145,
			longitude: -105.9358544
		},
		destination: {
			latitude: 23.2467895,
			longitude: -106.4221601
		}
	}],

	[{
		origin: {
			latitude: 25.5486137,
			longitude: -103.4019159
		},
		destination: {
			latitude: 23.2467895,
			longitude: -106.4221601
		}
	}],

	[{
		origin: {
			latitude: 19.2941124,
			longitude: -99.6312135
		},
		destination: {
			latitude: 19.418744,
			longitude: -99.094346
		}
	}],

	[{
		origin: {
			latitude: 19.298325,
			longitude: -99.409942
		},
		destination: {
			latitude: 19.298325,
			longitude: -99.409942
		}
	}],

	[{
		origin: {
			latitude: 20.6737918,
			longitude: -103.3354131
		},
		destination: {
			latitude: 20.6829335,
			longitude: -103.4039811
		}
	}],
];

var routesArry = [
	[
		[-99.17542,
			19.42697
		],
		[-99.17680,
			19.42487
		],
		[-99.12337,
			19.36929
		],
		[-99.12019,
			19.36953
		],
		[-99.08577,
			19.43948
		],
		[-99.08530,
			19.44093
		],
		[-99.17530,
			19.42715
		],
		[-99.17530,
			19.42707
		]
	],
	[
		[-98.99464,
			19.35791
		],
		[-98.99773,
			19.35858
		],
		[-99.08629,
			19.41459
		],
		[-99.09549,
			19.41985
		],
		[-99.13307,
			19.42377
		],
		[-99.13968,
			19.42444
		],
		[-99.27636,
			19.35791
		],
		[-99.27851,
			19.35524
		]
	],
	[
		[-99.11820,
			19.50094
		],
		[-99.11857,
			19.50004
		],
		[-99.11940,
			19.49691
		],
		[-99.12032,
			19.49268
		],
		[-99.12533,
			19.48559
		],
		[-99.13354,
			19.47553
		],
		[-99.13683,
			19.47152
		],
		[-99.13749,
			19.47072
		]
	],
	[
		[-99.14623,
			19.43744
		],
		[-99.14362,
			19.43982
		],
		[-99.13508,
			19.44767
		],
		[-99.13458,
			19.44803
		],
		[-99.12478,
			19.46505
		],
		[-99.12378,
			19.46755
		],
		[-99.11680,
			19.46736
		],
		[-99.11566,
			19.46892
		]
	],
	[
		[-99.10067,
			19.32633
		],
		[-99.10685,
			19.32932
		],
		[-99.10899,
			19.33447
		],
		[-99.10912,
			19.33568
		],
		[-99.10882,
			19.33985
		],
		[-99.10830,
			19.34167
		],
		[-99.10766,
			19.34520
		],
		[-99.10582,
			19.35585
		]
	],
	[
		[-99.08744,
			19.44579
		],
		[-99.09393,
			19.44108
		],
		[-99.10718,
			19.43517
		],
		[-99.10811,
			19.43461
		],
		[-99.11182880401611,
			19.437628876640293
		],
		[-99.1141140460968,
			19.437861575262016
		],
		[-99.11417841911316,
			19.437952631153628
		],
		[-99.11385118961334,
			19.439490456275397
		]
	],
	[
		[-99.08590793609619,
			19.492981507289148
		],
		[-99.08647656440735,
			19.491413847577633
		],
		[-99.09186244010924,
			19.477051355316497
		],
		[-99.0920341014862,
			19.47676813843876
		],
		[-99.09510254859924,
			19.478083069755442
		],
		[-99.09744143486022,
			19.479104662872523
		]
	],
	[

		[
			-100.30890941619873,
			25.75224154294367
		],
		[
			-100.31557202339172,
			25.733213057535963
		],
		[
			-100.36740303039551,
			25.669185804405448
		],
		[
			-100.36092281341553,
			25.674243111562983
		],
		[
			-100.28504848480223,
			25.670984412414946
		],
		[
			-100.28213024139404,
			25.672531580388192
		],
		[
			-100.25723934173584,
			25.703045362851377
		],
		[
			-100.30869483947754,
			25.75258941984422
		]
	],
	[
		[
			25.697943, -100.554584
		],
		[
			25.671675, -100.354427
		],
		[
			25.451665, -100.162044
		],
		[
			25.606853, -99.999781
		],
		[
			25.661165, -100.071682
		],
		[
			25.841444, -100.233945
		],
		[
			25.807334, -100.444789
		],
		[
			25.702321, -100.567215
		]
	]
];


var genericRoutesIterator = function(x, routeArry) {

	console.log(routeArry, '********', x);
	
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
	 console.log('URL_GET ::', URL_GET, '******', x);

	request(URL_GET, function (error, response, body) {
	    // console.log(routeSteps); // Show the HTML for the Google homepage.
		if (!error && response.statusCode == 200) {
			console.log(JSON.parse(body), x);

			if(JSON.parse(body).routes.length == 0) {
				setTimeout(function() {
					genericRoutesIterator(x, routeArry);
				}, 1500);
			}

			var routeSteps = JSON.parse(body).routes[0].legs;
			var routes = JSON.parse(body).routes;

			// var recursivePolylinePoints = function(id, polylinePoints, index, cb, steps, stepIndex) {
			var recursivePolylinePoints = function(id, polylinePoints, index, timeout, cb) {
				console.log('on recursivePolylinePoints');
				if(index < polylinePoints.length) {
					var polylinePoint = polylinePoints[index];

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
								return console.error('upload failed:', err);
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

for(var y = 0; y < routesArry.length; y++) {

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

}
