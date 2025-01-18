const app = app || {};

app.userViewBag = (function () {

    function showRegisterPage(sel) {
        $.get('templates/register.html', function (templ) {
            $(sel).html(templ);
            $('#register-button').on('click', function () {
                const username = $('#username').val(),
                    password = $('#password').val(),
                    confirmPassword = $('#confirm-password').val();

                Sammy(function () {
                    this.trigger('register', {
                        username: username,
                        password: password,
                        confirmPassword: confirmPassword
                    });
                });
            });
        });
    }

    function showLoginPage(sel) {
        $.get('templates/login.html', function (templ) {
            $(sel).html(templ);
            $('#login-button').on('click', function () {
                const username = $('#username').val(),
                    password = $('#password').val();

                Sammy(function () {
                    this.trigger('login', { username: username, password: password });
                });
            });
        });
    }

    return {
        load: function () {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage
            }
        }
    }
})();