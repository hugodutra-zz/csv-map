global.$       = global.jQuery = require('jquery');

var axios = require('axios');
var Papa = require('../../node_modules/papaparse/papaparse.js');

let parsedCsv;

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
		}
	})