'use strict';

var Client = require('node-rest-client').Client;

var API_KEY = "AIzaSyCY3mMw2d_n0myF8BDhnoc6rUMgFdIxOiQ";

var client = new Client();
 /*
// direct way 
client.get("https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key="+API_KEY, function(data, response){
            // parsed response body as js object 
            console.log(data);
            // raw response 
            console.log(response);
        });
 */
 
 /*
// registering remote methods 
client.registerMethod("jsonMethod", "http://remote.site/rest/json/method", "GET");
 
client.methods.jsonMethod(function(data,response){
    // parsed response body as js object 
    console.log(data);
    // raw response 
    console.log(response);
});
 */

/**
 * Process an array of data synchronously.
 *
 * @param data An array of data.
 * @param processData A function that processes an item of data.
 *                    Signature: function(item, i, callback), where {@code item} is the i'th item,
 *                               {@code i} is the loop index value and {@code calback} is the
 *                               parameterless function to call on completion of processing an item.
 */
function doSynchronousLoop(data, processData, done) {
	if (data.length > 0) {
		var loop = function(data, i, processData, done) {
			processData(data[i], i, function() {
				if (++i < data.length) {
					loop(data, i, processData, done);
				} else {
					done();
				}
			});
		};
		loop(data, 0, processData, done);
	} else {
		done();
	}
}

var fs = require("fs");
var request = require('request');
var Promise = require("bluebird");
var polyline = require('polyline');

var routes = [
	{
		origin: {
			latitude: 20.6737919,
			longitude: -103.3354131
		},
		destination: {
			latitude: 21.5009858,
			longitude: -104.8769046
		}
	},
	//monterrey - apodaca
	{
		origin: {
			latitude: 25.6640744,
			longitude: -100.3119816
		},
		destination: {
			latitude: 26.503248,
			longitude: -100.1763922
		}
	},
	//planetario_alfa - apodaca
	{
		origin: {
			latitude: 25.6364532,
			longitude: -100.3578866
		},
		destination: {
			latitude: 25.7800006,
			longitude: -100.1911025
		}
	},
	//nicolas de los garza - nuevo laredo
	{
		origin: {
			latitude: 25.7553404,
			longitude: -100.2896538
		},
		destination: {
			latitude: 27.4827043,
			longitude: -99.5062617
		}
	},

	{
		origin: {
			longitude: -99.11341,
			latitude: 19.40584
		},
		destination: {
			longitude: -99.11127,
			latitude: 19.42717
		}
	},
];

var routesArry = [
	[
		[-99.17542,
			19.42697
		],
		[-99.17680,
			19.42487
		],
		/*
		[-99.17766094207764,
			19.42365623092531
		],
		[-99.17791843414307,
			19.421065948769677
		],
		[-99.17783260345458,
			19.419325579756944
		],
		[-99.17916297912596,
			19.417099499205072
		],
		[-99.1819953918457,
			19.411959160369687
		],
		[-99.18392658233643,
			19.40884249784158
		],
		[-99.18461322784424,
			19.407709151202923
		],
		[-99.18495655059814,
			19.3997350248192
		],
		[-99.18598651885986,
			19.39111281391907
		],
		[-99.18632984161377,
			19.38698370611812
		],
		[-99.18808937072754,
			19.3741504184188
		],
		[-99.18783187866211,
			19.372935859327793
		],
		[-99.18319702148438,
			19.369292127738063
		],
		[-99.17924880981445,
			19.36694390199082
		],
		[-99.17341232299805,
			19.36070879361431
		],
		[-99.1706657409668,
			19.35884631239499
		],
		[-99.16482925415039,
			19.358279466062484
		],
		[-99.13504600524902,
			19.356740873228173
		],
		[-99.13393020629883,
			19.35641695709767
		],
		[-99.13084030151367,
			19.35844142235854
		],
		[-99.12543296813965,
			19.368482398543417
		],
		*/
		[-99.12337,
			19.36929
		],
		[-99.12019,
			19.36953
		],
		/*
		[-99.10852432250977,
			19.370263797461327
		],
		[-99.10534858703613,
			19.370587686081684
		],
		[-99.10397529602051,
			19.371397404816335
		],
		[-99.10200119018555,
			19.3735026546969
		],
		[-99.1018295288086,
			19.375931755375245
		],
		[-99.09891128540038,
			19.39682052576622
		],
		[-99.09788131713867,
			19.405321002073645
		],
		[-99.0970230102539,
			19.40791153511054
		],
		[-99.09822463989258,
			19.41665427943617
		],
		[-99.09341812133789,
			19.425558443086857
		],
		[-99.08723831176758,
			19.43583809782748
		],
		[-99.08655166625977,
			19.436242795331754
		],
		*/
		[-99.08577,
			19.43948
		],
		[-99.08530,
			19.44093
		],
		/*
		[-99.08577919006346,
			19.44255594578507
		],
		[-99.08676624298094,
			19.44534822247802
		],
		[-99.08740997314452,
			19.446481306563694
		],
		[-99.09071445465086,
			19.449597247004647
		],
		[-99.0933322906494,
			19.451944279513366
		],
		[-99.09453392028809,
			19.451984745293355
		],
		[-99.09539222717285,
			19.451661018770846
		],
		[-99.0977954864502,
			19.450730301420336
		],
		[-99.09916877746582,
			19.45020424142567
		],
		[-99.10243034362793,
			19.450366106221082
		],
		[-99.11088466644287,
			19.453684298938132
		],
		[-99.11247253417969,
			19.454412673620773
		],
		[-99.11715030670166,
			19.45817589070875
		],
		[-99.12152767181396,
			19.459632596461386
		],
		[-99.12659168243408,
			19.461210679593353
		],
		[-99.13264274597168,
			19.464569113082163
		],
		[-99.13375854492186,
			19.464892813838937
		],
		[-99.13667678833008,
			19.465054663974943
		],
		[-99.14081811904907,
			19.465074895230583
		],
		[-99.14120435714722,
			19.46495350765887
		],
		[-99.1423201560974,
			19.46375985836254
		],
		[-99.14270639419556,
			19.463658701238554
		],
		[-99.1437578201294,
			19.46454888176341
		],
		[-99.145667552948,
			19.464124023486267
		],
		[-99.14729833602905,
			19.463638469806188
		],
		[-99.14882183074951,
			19.463355229487917
		],
		[-99.15111780166626,
			19.46295059960343
		],
		[-99.15641784667969,
			19.463941941026665
		],
		[-99.15783405303955,
			19.46414425485805
		],
		[-99.15860652923584,
			19.463840784016288
		],
		[-99.1592288017273,
			19.46359800693388
		],
		[-99.15970087051392,
			19.4632338406286
		],
		[-99.16036605834961,
			19.462121105183286
		],
		[-99.16064500808716,
			19.461392765120284
		],
		[-99.16109561920166,
			19.46092743503389
		],
		[-99.16201829910278,
			19.460158625878467
		],
		[-99.16251182556152,
			19.45971352417509
		],
		[-99.1629409790039,
			19.459248189269797
		],
		[-99.1632628440857,
			19.458256819149412
		],
		[-99.16386365890503,
			19.455383834776573
		],
		[-99.16442155838013,
			19.449577013818168
		],
		[-99.16485071182251,
			19.447675083023956
		],
		[-99.16564464569092,
			19.443587879724284
		],
		[-99.16757583618164,
			19.4403706522572
		],
		[-99.16830539703368,
			19.438691193720896
		],
		[-99.1705799102783,
			19.435069169790534
		],
		[-99.17191028594969,
			19.43290401075761
		],
		*/
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
		/*
		[-98.99949789047241,
			19.360040732145404
		],
		[-99.002845287323,
			19.362611741583535
		],
		[-99.00516271591187,
			19.364555154883192
		],
		[-99.01009798049927,
			19.36834069552075
		],
		[-99.01638507843016,
			19.372956102053504
		],
		[-99.02722120285033,
			19.380749364569553
		],
		[-99.0368127822876,
			19.38607285941682
		],
		[-99.03790712356567,
			19.3867812961804
		],
		[-99.04904365539551,
			19.393055887232567
		],
		[-99.05807733535767,
			19.39821706307652
		],
		[-99.06902074813843,
			19.404612646012747
		],
		*/
		[-99.08629,
			19.41459
		],
		[-99.09549,
			19.41985
		],
		/*
		[-99.09938335418701,
			19.421774233148135
		],
		[-99.102623462677,
			19.42345386661883
		],
		[-99.10964012145996,
			19.426853553517134
		],
		[-99.10984396934509,
			19.426939556578578
		],
		[-99.11119043827057,
			19.426954733584687
		],
		[-99.11151230335236,
			19.42706603158623
		],
		[-99.11156058311461,
			19.42633753419236
		],
		[-99.11182880401611,
			19.42419249511865
		],
		[-99.11219358444214,
			19.41999339797712
		],
		[-99.11676406860352,
			19.421389736297158
		],
		[-99.1206693649292,
			19.42223967548736
		],
		[-99.12832975387573,
			19.42321102911835
		],
		*/
		[-99.13307,
			19.42377
		],
		[-99.13968,
			19.42444
		],
		/*
		[-99.15367126464844,
			19.425882221662324
		],
		[-99.15410041809082,
			19.425841749375685
		],
		[-99.15914297103882,
			19.424728757542052
		],
		[-99.16877746582031,
			19.422502751002426
		],
		[-99.17422771453856,
			19.421187369168102
		],
		[-99.17693138122559,
			19.42013505603468
		],
		[-99.17869091033936,
			19.417828038014637
		],
		[-99.17916297912596,
			19.416978075752667
		],
		[-99.18135166168213,
			19.416532855651205
		],
		[-99.18495655059814,
			19.41535908772028
		],
		[-99.19126510620117,
			19.412444868630025
		],
		[-99.20650005340576,
			19.403742375772055
		],
		[-99.21263694763184,
			19.399694546023177
		],
		[-99.21740055084229,
			19.397751551971478
		],
		[-99.22263622283936,
			19.39625381155502
		],
		[-99.23083305358887,
			19.394958457375697
		],
		[-99.23383712768555,
			19.394432216795252
		],
		[-99.23619747161865,
			19.393501171599986
		],
		[-99.23744201660156,
			19.393501171599986
		],
		[-99.23817157745361,
			19.3933392501528
		],
		[-99.23920154571533,
			19.392246276170823
		],
		[-99.23907279968262,
			19.390465117660188
		],
		[-99.23975944519043,
			19.389048273109488
		],
		[-99.24319267272949,
			19.387024188075465
		],
		[-99.25297737121582,
			19.379575338484454
		],
		[-99.25615310668945,
			19.377551135707083
		],
		[-99.2611312866211,
			19.374636239520235
		],
		[-99.26254749298096,
			19.3743933291506
		],
		[-99.2638349533081,
			19.37362411059092
		],
		[-99.26559448242188,
			19.371114003716865
		],
		[-99.26683902740479,
			19.368239479000568
		],
		[-99.26658153533936,
			19.364190766654165
		],
		[-99.26761150360106,
			19.362935645408914
		],
		*/
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
		/*
		[-99.1205620765686,
			19.49193977381835
		],
		[-99.12094831466673,
			19.49115088381649
		],
		[-99.12181735038757,
			19.489795602273574
		],
		[-99.12300,
			19.48833
		],
		*/
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
		/*
		[-99.14348959922789,
			19.43994573065492
		],
		[-99.14312481880187,
			19.439854675881158
		],
		[-99.14255619049072,
			19.44013795723183
		],
		[-99.14245963096619,
			19.440674167006428
		],
		[-99.14257764816284,
			19.440997915446776
		],
		[-99.14193391799927,
			19.441655527478407
		],
		[-99.14000272750853,
			19.44329448740906
		],
		[-99.13968086242674,
			19.44353729488018
		],
		[-99.13934826850891,
			19.44364858151638
		],
		[-99.13913369178772,
			19.443891388457786
		],
		[-99.13868308067322,
			19.44442758583326
		],
		[-99.13837194442748,
			19.444852495702854
		],
		[-99.13719177246094,
			19.445823714084483
		],
		[-99.13533568382263,
			19.44758403258635
		],
		*/
		[-99.13508,
			19.44767
		],
		[-99.13458,
			19.44803
		],
		/*
		[-99.13414478302002,
			19.448666517815337
		],
		[-99.13233160972595,
			19.450942748242355
		],
		[-99.13100123405455,
			19.45255126515335
		],
		[-99.13071155548096,
			19.45272324400511
		],
		[-99.13002490997314,
			19.453674182600057
		],
		[-99.12872672080994,
			19.455737902501536
		],
		[-99.12793278694153,
			19.456951843119263
		],
		[-99.12723541259766,
			19.458651344719236
		],
		[-99.12618398666382,
			19.46146357610333
		],
		*/
		[-99.12478,
			19.46505
		],
		[-99.12378,
			19.46755
		],
		/*
		[-99.12346959114075,
			19.46763412870707
		],
		[-99.12270784378052,
			19.467411588269645
		],
		[-99.11836266517639,
			19.465853796652844
		],
		[-99.11787986755371,
			19.465722294077906
		],
		*/
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
		/*
		[-99.1084599494934,
			19.435615513770177
		],
		[-99.108567237854,
			19.43677901797125
		],
		[-99.10888910293579,
			19.437345590911562
		],
		[-99.10926461219786,
			19.437456881792503
		],
		[-99.11049842834473,
			19.43758840728073
		],
		*/
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
		/*
		[-99.08701300621033,
			19.489876514922962
		],
		*/
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
		/*
		[
			-100.31725645065306,
			25.728525532770792
		],
		[
			-100.31726717948914,
			25.704350435841388
		],
		[
			-100.3265368938446,
			25.704224762768654
		],
		[
			-100.33437967300414,
			25.668238139807677
		],
		[
			-100.35198569297789,
			25.672560589595886
		],
		[
			-100.36432385444641,
			25.675219736982847
		],
		[
			-100.38235902786255,
			25.671197149202015
		],
		[
			-100.38285255432129,
			25.670220490822903
		],
		*/
		[
			-100.36740303039551,
			25.669185804405448
		],
		[
			-100.36092281341553,
			25.674243111562983
		],
		/*
		[
			-100.35334825515747,
			25.67189337603251
		],
		[
			-100.3486704826355,
			25.66940821439308
		],
		[
			-100.3082013130188,
			25.661710653523762
		],
		[
			-100.298513174057,
			25.666226745088363
		],
		[
			-100.29735445976256,
			25.659292975334147
		],
		[
			-100.27519941329955,
			25.62403766263065
		],
		[
			-100.27343988418579,
			25.641922934694183
		],
		[
			-100.27464151382446,
			25.649728160010245
		],
		[
			-100.28213024139404,
			25.66015367438787
		],
		[
			-100.2841579914093,
			25.66562718817461
		],
		*/
		[
			-100.28504848480223,
			25.670984412414946
		],
		[
			-100.28213024139404,
			25.672531580388192
		],
		/*
		[
			-100.25039434432983,
			25.6843860884442
		],
		[
			-100.24526596069335,
			25.68848557858897
		],
		[
			-100.24496555328369,
			25.69092200117038
		],
		[
			-100.24625301361083,
			25.698095622661928
		],
		*/
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


var loopObjRoutes = function(x, route) {

	request('https://maps.googleapis.com/maps/api/directions/json?origin=' + route.origin.latitude + ',' + route.origin.longitude
		+ '&destination=' + route.destination.latitude + ',' + route.destination.longitude
		+ '&key='+API_KEY, function (error, response, body) {

	// request('https://maps.googleapis.com/maps/api/directions/json?origin=19.462717,-99.129592&destination=19.417467,-99.178743&waypoints=19.459636,-99.162692|19.433413,-99.172649&key=AIzaSyCY3mMw2d_n0myF8BDhnoc6rUMgFdIxOiQ',function (error, response, body) {
		    // console.log(routeSteps); // Show the HTML for the Google homepage.
		if (!error && response.statusCode == 200) {
			var routeSteps = JSON.parse(body).routes[0].legs[0].steps;

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

						
						request.post({url:'http://yoplanner.com:1337/api/tracking/update', formData: postObj}, function optionalCallback(err, httpResponse, body) {
							if (err) {
								return console.error('upload failed:', err);
							}
							console.log('Successful!');

							recursiveCB2(id, routeSteps, index, datSplitArry, index2+1, timeout, cb);
						});
					}, (timeout * 1000));
		    	} else {
		    		cb(id, routeSteps, index+1, cb);
		    	}
		    }

		    var recursiveCB1 = function(id, routeSteps, index, cb) {
		    	if(index < routeSteps.length) {
			    	var step = routeSteps[index];
				    var TimeOutStep = Math.ceil(step.distance.value / step.duration.value);
				    //console.log(TimeOutStep);

				    var dat = polyline.decode(step.polyline.points);
				    var datSplitArry = (dat + "").match(/([-]?)\d{1,3}[.]\d{1,5}[,]([-]?)\d{1,3}[.]\d{1,5}([,]?)/g);

				    recursiveCB2(id, routeSteps, index, datSplitArry, 0, TimeOutStep, cb);

				    // cb(id, routeSteps, index++, cb);
		    	}
		    }

		    recursiveCB1(1000, routeSteps, 0, recursiveCB1);

	/*
			Promise.all(routeSteps)
				.each(function (step, index, value) {
				    var TimeOutStep = Math.ceil(step.distance.value / step.duration.value);
				    console.log(TimeOutStep);

				    var dat = polyline.decode(step.polyline.points);
				    var datSplitArry = (dat + "").match(/([-]?)\d{1,3}[.]\d{1,5}[,]([-]?)\d{1,3}[.]\d{1,5}([,]?)/g);

				    Promise.all(datSplitArry)
				    	.each(function (datSplit, index, value) {
							setTimeout(function() {
								var LatLongSplit = (datSplit + "").split(',');
								var postObj = {
									id: 1,
									latitude: LatLongSplit[0],
									longitude: LatLongSplit[1]
								};
								console.log(postObj);
							}, (TimeOutStep * 1000));
				    	});
				});
	 */
			/*
		    // console.log(routeSteps.length);
		    for (var index = 0; index < routeSteps.length; index++) {
			    // console.log(routeSteps[index], index);

			    var TimeOutStep = Math.ceil(routeSteps[index].distance.value / routeSteps[index].duration.value);
			    console.log(TimeOutStep, index);

			    // console.log(routeSteps[index].polyline.points, index);
			    var dat = polyline.decode(routeSteps[index].polyline.points);
			    // console.log((dat + ''), index);
				// fs.writeFile("datafile-step"+index+".txt", dat);
				var datSplit = (dat + "").match(/([-]?)\d{1,3}[.]\d{1,5}[,]([-]?)\d{1,3}[.]\d{1,5}([,]?)/g);
				// console.log(datSplit, index);

				var postObj = {};
				for(var index2 = 0; index2 < datSplit.length; index2++) {
					setTimeout(function() {
						var LatLongSplit = (datSplit[index2] + "").split(',');
						postObj['id'] = 1;
						postObj['latitude'] = LatLongSplit[0];
						postObj['longitude'] = LatLongSplit[1];
						console.log(postObj, index);
					}, (TimeOutStep * 1000));
				}

		    }
		     */
		}
	});
}


var loopArryRoutes = function(x, routeArry) {

	//console.log(routeArry.join('|'), '********');

	/*
	request('https://maps.googleapis.com/maps/api/directions/json?origin=' + route.origin.latitude + ',' + route.origin.longitude
		+ '&destination=' + route.destination.latitude + ',' + route.destination.longitude
		+ '&key='+API_KEY, function (error, response, body) {
	 */
	request('https://maps.googleapis.com/maps/api/directions/json?origin='+routeArry[0]
		+ '&destination='+routeArry[routeArry.length-1]
		+ '&waypoints='+routeArry.join('|')
		+ '&key='+API_KEY, function (error, response, body) {
	    // console.log(routeSteps); // Show the HTML for the Google homepage.
		if (!error && response.statusCode == 200) {
			//console.log(JSON.parse(body).routes[0], x);
			var routeSteps = JSON.parse(body).routes[0].legs;

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

						
						request.post({url:'http://yoplanner.com:1337/api/tracking/update', formData: postObj}, function optionalCallback(err, httpResponse, body) {
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
		}
	});
}

/*
start_location: {
lat: 20.6560863,
lng: -103.3769796
},

end_location: {
lat: 20.6702168,
lng: -103.4030583
},
 */


for(var x = 0; x < routes.length; x++) {
	loopObjRoutes(x, routes[x]);
}

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
