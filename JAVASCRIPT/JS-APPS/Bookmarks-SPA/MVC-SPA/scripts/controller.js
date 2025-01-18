const app = app || {};

app.controller = (function () {

    function BaseController(data) {
        this._data = data;
    }
    BaseController.prototype.loadHome =
        function (sel) {
            $(sel).load('./templates/home.html');
        }
    BaseController.prototype.loadLogin = function (sel) {
        $(sel).load('./templates/login.html');
    }
    BaseController.prototype.loadRegister = function (sel) {
        $(sel).load('./templates/register.html');
    }
    BaseController.prototype.loadBookmarks = function (sel) {
        this._data.bookmarks.getAll()
            .then(function (data) {
                $.get('templates/bookmarks.html', function (tmpl) {
                    const output = Mustache.render(tmpl, data);
                    $(sel).html(output);
                });
            });
    }
    BaseController.prototype.attachEventHandlers = function () {
        const sel = '#wrapper';
        attachLoginHandler.call(this, sel);
        attachRegisterHandler.call(this, sel);
        attachCreateBookmarkHandler.call(this, sel);
        attachDeleteBookmarkHandler.call(this, sel);
        attachSignOutHandler.call(this, sel);
    }
    //////////EVENT_HANDLERS////////////
    const attachLoginHandler = function (sel) {
        const _this = this;
        $(sel).on('click', '#login', function () {
            const username = $('#username').val(),
                password = $('#password').val();
            _this._data.users.login(username, password)
                .then(function (data) {
                    console.log('User logged in')
                    window.history.replaceState('Bookmarks', 'Bookmarks', '#/bookmarks');
                },
                    function (error) {
                        console.log(error);
                    });
        });
    }
    const attachRegisterHandler = function (sel) {
        const _this = this;
        $(sel).on('click', '#register', function () {
            const username = $('#username').val(),
                password = $('#password').val();
            _this._data.users.register(username, password)
                .then(function (data) {
                    console.log('User registered')
                    window.history.replaceState('Bookmarks', 'Bookmarks', '#/bookmarks');
                },
                    function (error) {
                        console.log(error);
                    });
        });
    }
    const attachSignOutHandler = function (sel) {
        const _this = this;
        $('#signOut').on('click', function (ev) {
            console.log('Sign Out');
            _this._data.users.signout();
            alert('User signed out !')
            document.location = '#/'
        });
    }
    const attachCreateBookmarkHandler = function (sel) {
        const _this = this;
        $(sel).on('click', '#create-bookmark', function (ev) {
            const title = $('#title').val();
            const url = $('#url').val();
            const bookmark = {
                title: title,
                url: url
            }
            _this._data.bookmarks.add(bookmark)
                .then(function (data) {
                    console.log('Creating bookmark');
                    _this._data.bookmarks.getById(data.objectId)
                        .then(function (bookmark) {
                            const li = $('<li>').append(bookmark.title + ' - ' + bookmark.url);
                            $('#bookmarks ul').append(li);
                            $('#title').val('');
                            $('#url').val('');
                            document.location.reload(true);
                        }, function (error) {
                            console.log(error);
                        });
                }, function (error) {
                    console.log(error);
                });
        });

    }
    const attachDeleteBookmarkHandler = function (sel) {
        const _this = this;
        $(sel).on('click', '.delete-bookmark-btn', function (ev) {
            const deleteConfirmed = confirm('Do you want to delete this bookmark');
            if (deleteConfirmed) {
                const objectId = $(this).parent().data('id');
                _this._data.bookmarks.delete(objectId)
                    .then(function (data) {
                        $(ev.target).parent().remove();
                    }, function (error) {
                        console.log(error);
                    });
            };
        });
    };
    return {
        get: function (data) {
            return new BaseController(data);
        }
    }
})();
