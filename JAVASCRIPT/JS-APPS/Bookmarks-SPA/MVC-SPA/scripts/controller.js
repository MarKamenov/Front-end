var app = app || {};

app.controller = (function() {

    function BaseController(data) {
        this._data = data;
    }
    BaseController.prototype.loadHome =
        function(sel) {
            $(sel).load('./templates/home.html');
        }
    BaseController.prototype.loadLogin = function(sel) {
        $(sel).load('./templates/login.html');
    }
    BaseController.prototype.loadRegister = function(sel) {
        $(sel).load('./templates/register.html');
    }
    BaseController.prototype.loadBookmarks = function(sel) {
        this._data.bookmarks.getAll()
            .then(function(data) {
                $.get('templates/bookmarks.html', function(tmpl) {
                    var output = Mustache.render(tmpl, data);
                    $(sel).html(output);
                });
            });
    }
    BaseController.prototype.attachEventHandlers = function() {
            var sel = '#wrapper';
            attachLoginHandler.call(this, sel);
            attachRegisterHandler.call(this, sel);
            attachCreateBookmarkHandler.call(this, sel);
            attachDeleteBookmarkHandler.call(this, sel);
            attachSignOutHandler.call(this, sel);
        }
        //////////EVENT_HANDLERS////////////
    var attachLoginHandler = function(sel) {
        var _this = this;
        $(sel).on('click', '#login', function() {
            var username = $('#username').val(),
                password = $('#password').val();
            _this._data.users.login(username, password)
                .then(function(data) {
                        console.log('User logged in')
                        window.history.replaceState('Bookmarks', 'Bookmarks', '#/bookmarks');
                    },
                    function(error) {
                        console.log(error);
                    });
        });
    }
    var attachRegisterHandler = function(sel) {
        var _this = this;
        $(sel).on('click', '#register', function() {
            var username = $('#username').val(),
                password = $('#password').val();
            _this._data.users.register(username, password)
                .then(function(data) {
                        console.log('User registered')
                        window.history.replaceState('Bookmarks', 'Bookmarks', '#/bookmarks');
                    },
                    function(error) {
                        console.log(error);
                    });
        });
    }
    var attachSignOutHandler = function(sel){
        var _this = this;
        $('#signOut').on('click',function(ev){
            console.log('Sign Out');
            _this._data.users.signout();
            alert('User signed out !')
             document.location = '#/'
        });
    }
    var attachCreateBookmarkHandler = function(sel) {
        var _this = this;
        $(sel).on('click', '#create-bookmark', function(ev) {
            var title = $('#title').val();
            var url = $('#url').val();
            var bookmark = {
                title: title,
                url: url
            }
            _this._data.bookmarks.add(bookmark)
                .then(function(data) {
                    console.log('Creating bookmark');
                    _this._data.bookmarks.getById(data.objectId)
                        .then(function(bookmark) {
                            var li = $('<li>').append(bookmark.title + ' - ' + bookmark.url);
                            $('#bookmarks ul').append(li);
                            $('#title').val('');
                            $('#url').val('');
                            document.location.reload(true);
                        }, function(error) {
                            console.log(error);
                        });
                }, function(error) {
                    console.log(error);
                });
        });

        /* function getBookmark(objectId) {
             _this._data.bookmarks.getById(objectId)
                 .then(function(bookmark) {
                     console.log('I am in get by id success!');
                     console.log(bookmark);
                 }, function(error) {
                     console.log(error);
                 });
         }*/
    }
    var attachDeleteBookmarkHandler = function(sel) {
        var _this = this;
        $(sel).on('click', '.delete-bookmark-btn', function(ev) {
            var deleteConfirmed = confirm('Do you want to delete this bookmark');
            if (deleteConfirmed) {
                var objectId = $(this).parent().data('id');
                _this._data.bookmarks.delete(objectId)
                    .then(function(data) {
                        $(ev.target).parent().remove();
                    }, function(error) {
                        console.log(error);
                	});
            };
        });
    };
    return {
        get: function(data) {
            return new BaseController(data);
        }
    }
})();
