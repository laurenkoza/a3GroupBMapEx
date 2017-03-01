(function(){
	var map = new google.maps.Map(document.querySelector('.map-wrapper')),
		marker,
		preloader = document.querySelector('.preload-wrapper'),

		geocoder = new google.maps.Geocoder(), //from https://developers.google.com/maps/documentation/javascript/
		geocodeButton = document.querySelector(".geocode"),


		//directions service - draw a route on a map
		directionService = new google.maps.DirectionsService(),
		locations=[],
		directionsDisplay;

	function iniMap(position) {
		locations[0] = { lat: position.coords.latitude, lng: position.coords.longitude }; /*locations is an array that stores locations*/
		
		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);//tells it to show itself on "map" map, as defined below in codeAddress

		map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });

		map.setZoom(14);

		marker = new google.maps.Marker({
			position: { lat: position.coords.latitude, lng: position.coords.longitude },
			//position: { lat: 42.983233, lng: -81.250688 },
			map: map,
			title: "Paddy's secret hut"
		});

		preloader.classList.add('hide-preloader');
	}

	//geocoding api => find and address on a map
	
	function codeAddress(){
		var address = document.querySelector('.address').value;

		geocoder.geocode( {'address' : address}, function(results,status){
			if (status === google.maps.GeocoderStatus.OK){//making sure it loads
				locations[1] = { lat: results[0].geometry.location.lat(), //create second location
								lng: results[0].geometry.location.lng() };

				map.setCenter(results[0].geometry.location);

				if(marker){
					marker.setMap(null);
					marker = new google.maps.Marker({
						map: map, //map name
						position: results[0].geometry.location
					});
				}

				calcRoute(results[0].geometry.location);//make up function calcRoute and pass data through

			} else {
				console.log('Geocoder was not successful for the following reason:',status);
			}
		});
		//debugger;
		console.log('address');
	}


	function calcRoute(codedLoc) {
		var request = {
			origin: locations[0],
			destination: locations[1],
			travelMode: 'DRIVING'
		};

		directionService.route(request, function(response,status){
			if(status==='OK'){
				directionsDisplay.setDirections(response);
			}
		});
	}



	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(iniMap, handleError);
	}else{ //give some kind of error message to the user
		console.log('Your browser does not have a geolocation');
	}

	function handleError(e){
		console.log(e);
	}

	geocodeButton.addEventListener ('click', codeAddress, false);

	//iniMap();//fires map function
})();