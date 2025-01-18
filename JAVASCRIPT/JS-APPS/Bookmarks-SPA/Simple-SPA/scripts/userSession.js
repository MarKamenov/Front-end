'use strict'

const userSession = {
	login: function (data) {
		sessionStorage['currentUser'] = JSON.stringify(data);
	},
	getCurrentUser: function (data) {
		const userData = sessionStorage['currentUser'];
		if (userData) {
			return JSON.parse(sessionStorage['currentUser']);
		}
	},
	logout: function () {
		delete sessionStorage['currentUser'];
	}
}