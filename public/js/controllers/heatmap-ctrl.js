/** 
 * Dashboard Controller
 */

angular
	.module('HackerCore.io')
	.controller('HeatmapCtrl', HeatmapCtrl);

HeatmapCtrl.$inject = ['hackathonservice', 'uiGmapGoogleMapApi'];

function HeatmapCtrl(hackathonservice, uiGmapGoogleMapApi) {
	var vm = this;

	vm.map = {
		center: { latitude: 39.8282, longitude: -98.5795 },
		zoom: 4,
		heatLayerCallback: function (layer) {
	        //set the heat layers backend data
	        hackathonservice.locations()
	        .then(function (data) {
	        	MockHeatLayer(layer, data);
	        })
	        .catch(function (error) {
	        	console.log(error);
	        })
        },
	    showHeat: true
	};

	activate();

	function activate() {
		uiGmapGoogleMapApi
		.then(function (maps) {

		});
	}

	function MockHeatLayer(heatLayer, points) {
	    var map, pointarray, heatmap;

	    var hackathonData = [];
	    points.forEach(function (point) {
	    	hackathonData.push(new google.maps.LatLng(point.lat, point.lng));
	    });

	    var pointArray = new google.maps.MVCArray(hackathonData);
	    heatLayer.setData(pointArray);
	    heatLayer.set('radius', heatLayer.get('radius') ? null : 20);
    }
}
