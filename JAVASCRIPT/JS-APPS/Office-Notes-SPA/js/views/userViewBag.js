var app = app || {};

app.userViewBag = (function(){

	 function showRegisterPage(selector) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);
            $('#registerButton').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    fullName = $('#fullName').val();

                Sammy(function() {
                    this.trigger('register', {username: username, password: password, fullName: fullName});
                })
            });
        });
    };
     function showLoginPage(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);
            $('#loginButton').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val();

                Sammy(function() {
                    this.trigger('login', {username: username, password: password});
                })
            })
        })
    }
	 return {
        load: function () {
            return {
            	showRegisterPage: showRegisterPage,
                showLoginPage: showLoginPage
                
            }
        }
    }

})();

