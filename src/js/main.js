
global.$       = global.jQuery = require('jquery');

const axios = require('axios');
const Papa = require('../../node_modules/papaparse/papaparse.js');
const L = require('leaflet');


let parsedCsv;
let map = L.map('map');
let attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'; 
let tiles = 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVnb2R1dHJhIiwiYSI6ImNpcnd5eHA2eDAwM2oybm53emxtdzRpYXcifQ.rQib4fLiSiySuIuh-zLmkw';
 
L.Icon.Default.imagePath = '../images/leaflet';
L.tileLayer(tiles, {
  maxZoom: 18,
  attribution: attribution
}).addTo(map);

map.setView([37.472189, -122.190191], 11);

axios.get('sample.csv')
	.then((response) => {	
		parsedCsv = Papa.parse(response.data).data;

		for(let i=0, l=parsedCsv[0].length; i<l; i++) {
			$('.js-table thead tr').append(`<td>${parsedCsv[0][i]}</td>`)
		}

		for(let i=1, l=parsedCsv.length; i<l; i++) {
			$('.js-table tbody').append(`<tr data-key=${i}></tr>`);
			for(let j=0, ln=parsedCsv[i].length; j<ln; j++) {
				$(`.js-table tbody tr[data-key=${i}]`).append(`<td>${parsedCsv[i][j]}</td>`)
			}
			L.marker([parsedCsv[i][9], parsedCsv[i][10]]).addTo(map)
		}
	})