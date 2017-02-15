(function(){

	var map, marker;


	function iniMap() {
		map = new google.maps.Map(document.querySelector('#map-wrapper'),
			{
				center: {lat: 42.983233, lng: -81.250688},
				zoom: 14 // have to test in firefox
			}// options object
		); //what element you want to draw ur map in

		marker= new google.maps.Marker({
			position: { lat: 42.983233, lng: -81.250688 },
			map: map,
			title: "Paddy's secret hut"
		});
	} 






})();