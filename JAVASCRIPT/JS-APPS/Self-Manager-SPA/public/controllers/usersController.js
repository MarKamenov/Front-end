var usersController = function() {

    function register(context) {
        templates.get('register')
            .then(function(tmpl) {
                context.$element().html(tmpl);
                $('#btn-register').on('click', function() {
                    var user = {
                        username: $('#tb-reg-username').val(),
                        password: $('#tb-reg-pass').val()
                    };

                    data.users.register(user)
                        .then(function() {
                            toastr.success('User registered!');
                            context.redirect('#/');
                            document.location.reload(true);

                        });
                });
            });
    }

    function all(context) {
        var users;
        data.users.get().then(function(data) {
            users = data;
            return templates.get('users');
        }).then(function(tmpl) {
            context.$element().html(tmpl(users));
        })
    }

    return {
        register: register,
        all: all
    }
}();
