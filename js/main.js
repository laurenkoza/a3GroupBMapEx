(function(){
	var map = new google.maps.Map(document.querySelector('.map-wrapper'));
	var marker;

	function iniMap(position) {
		map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });

		map.setZoom(14);

		marker = new google.maps.Marker({
			position: { lat: position.coords.latitude, lng: position.coords.longitude },
			//position: { lat: 42.983233, lng: -81.250688 },
			map: map,
			title: "Paddy's secret hut"
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

	//iniMap();//fires map function
})();