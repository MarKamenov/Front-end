var app = app || {};

app.userViewBag = (function(){

	function showRegisterPage(selector) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);
            $('#register-button').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    repeatPassword = $('#confirm-password').val();

                if(repeatPassword === password) {
                    Sammy(function() {
                        this.trigger('register', {username: username, password: password});
                    });
                } else {
                    noty({
                        theme: 'relax',
                        text: 'The passwords does not match!',
                        type:'error',
                        timeout: 2000,
                        closeWith: ['click']
                    });
                }
            })
        })
    }
	function showLoginPage(selector){
		$.get('templates/login.html', function (templ) {
            $(selector).html(templ);
             $('#login-button').on('click', function (){
             	var username = $('#username').val(),
                    password = $('#password').val();

                Sammy(function() {
                    this.trigger('login', {username: username, password: password});
                });
             });
        });
	};
	return {
        load: function () {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage
            }
        }
    }
})();