var app = app || {};

app.controller = (function () {

    function BaseController(data) {
        this._data = data;
    }

    BaseController.prototype.loadHeader = function(headerSel) {
        var userData;
        if (!this._data.users.isLogged()) {
            $(headerSel).html("");
        } else {
            userData = this._data.users.getUserData();

            this._data.users.getById(userData.userId)
                .then(function(data) {
                    $.get('./views/user-header.html', function(view) {
                        var output = Mustache.render(view, data);
                        $(headerSel).html(output);
                    });
                }
            );
        }
    }

    BaseController.prototype.loadHome = function (sel) {
        var output,
            _this = this,
            data;

        if (!this._data.users.isLogged()) {
            $(sel).load('./views/default-home.html');
        } else {
            data = _this._data.posts.getAll()
                .then(
                function (data) {
                    $.get('./views/posts.html', function (view) {
                        data.results.forEach(function (e) {
                            var isoDateString = e.createdAt;
                            e.createdAt = formatDate(isoDateString);
                        });

                        output = Mustache.render(view, data);
                        $(sel).html(output);
                    });
                },
                function (error) {
                    Noty.error("Error loading posts.");
                }
            );
        }
    }

    BaseController.prototype.loadLogin = function (sel) {
        $(sel).load('./views/login.html');
    }

    BaseController.prototype.loadRegister = function (sel) {
        $(sel).load('./views/register.html');
    }

    BaseController.prototype.logout = function (sel) {
        this._data.users.logout();
        Noty.success("Successfully logged out.");
        redirectTo('.#/');
    }

    BaseController.prototype.loadEditProfile = function (sel) {
        var userData;
        if (!this._data.users.isLogged()) {
            redirectTo('#/');
            return;
        }

        userData = this._data.users.getUserData();
        this._data.users.getById(userData.userId)
            .then(function(data) {
                $.get('views/edit-profile.html', function(view) {
                    var output = Mustache.render(view ,data),
                        gender = data.gender;
                    $(sel).html(output);
                    $('input[type="radio"][value=' + gender + ']')
                        .attr('checked', true);
                });
            });
    }

            /////////EVENTHANDLERS///////////
            BaseController.prototype.attachEventHandlers = function() {
                var sel = '#main',
                    headerSel = '#header';

                attachRegisterHandler.call(this, sel);
                attachLoginHandler.call(this, sel);

                attachHoverHandler.call(this, sel);
                attachShowPostHandler.call(this, headerSel);
                attachSubmitPostHandler.call(this, sel);
                attachPictureUploadHandler.call(this, sel);
                attachEditProfileHandler.call(this, sel);
            }
            var attachSubmitPostHandler = function(sel) {
                var _this = this;

                $(sel).on('click', '#submit-post-btn', function() {
                    var userId = _this._data.users.getUserData().userId;

                    var post = {
                        content: $('#post-content').val(),
                        createdBy: {
                            __type: "Pointer",
                            className: "_User",
                            objectId: userId
                        }
                    };

                    _this._data.posts.add(post, userId)
                        .then(function(data) {
                                _this.loadHome(sel);
                                Noty.success('Post successfully added.');
                            },
                            function(error) {
                                Noty.error('Error submitting post.');
                            });
                });
            }
            var attachPictureUploadHandler = function (sel) {
        $(sel).on('click', '#upload-file-button', function() {
            $('#picture').click();
        });

        $(sel).on('change', '#picture', function() {
            var file = this.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $('.picture-name').text(file.name);
                    $('.picture-preview').attr('src', reader.result);
                    $('#picture').attr('data-picture-data', reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                Noty.error("Invalid file format.");
            }
        });
    }
          var attachRegisterHandler = function (sel) {
        var _this = this;
        $(sel).on('click', '#reg-btn', function () {
            var userRegData = {
                username: $('#reg-username').val(),
                password: $('#reg-password').val(),
                name: $('#reg-name').val(),
                about: $('#reg-about').val(),
                gender: $('input[name="gender-radio"]:checked').val(),
                picture: $('#picture').attr('data-picture-data')
            };

            _this._data.users.register(userRegData)
                .then(function (data) {
                    Noty.success("Registration successful.");
                    redirectTo('#/');
                },
                function (error) {
                    Noty.error("Your registration has encountered an error.");
                });
        });
    }
           var attachLoginHandler = function (sel) {
        var _this = this;
        $(sel).on('click', '#login-btn', function () {
            var username = $('#login-username').val(),
                password = $('#login-password').val();

            _this._data.users.login(username, password)
                .then(function (data) {
                    redirectTo('#/');
                    Noty.success("Successfully logged in.");
                },
                function (error) {
                    Noty.error("Incorrect username/password.");
                }
            );
        });
    }
           var attachEditProfileHandler = function (sel) {
        var _this = this;
        $(sel).on('click', '#save-btn', function() {
            var userId = _this._data.users.getUserData().userId,
                userEditProfileData = {
                    password: $('#password').val(),
                    name: $('#name').val(),
                    about: $('#about').val(),
                    gender: $('input[name="gender-radio"]:checked').val(),
                    picture: $('#picture').attr('data-picture-data')
            };

            _this._data.users.editProfile(userId, userEditProfileData)
                .then(function(data) {
                    Noty.success("Profile successfully edited.");
                    redirectTo('#/');
                },
                function(error) {
                    Noty.error("Error saving changes. Please try again.");
                });
        });

        $(sel).on('click', '.cancel-btn', function() {
            redirectTo('#/');
        });
    }

            var attachShowPostHandler = function (sel) {
        $(sel).on('click', '#post-btn', function() {
            var container = $('#post-container');
            container.is(':visible') ? container.slideUp() : container.slideDown();
        });
    }
               
           var attachHoverHandler = function (sel) {
        var that = this;
        $(sel).on('mouseenter', '.profile-link', function() {

            var thisPerson = this,
                id = $(thisPerson).attr('data-user-id');

            var offset = $(thisPerson).offset();
            $('.hover-box')
                .css({
                    position:'absolute',
                    top: offset.top + 30,
                    left: offset.left + 10
                })
                .show();

            that._data.users.getById(id)
                .then(
                function(data) {
                 
                    $.get('views/hover-box.html', function (view) {
                            var output = Mustache.render(view, data);
                            $('.hover-box').html(output);
                        }
                    );
                },
                function(error) {
                    Noty.error("Error retrieving data.");
                }
            )
        });

        $(sel).on('mouseleave', '.profile-link', function() {
           
            $('.hover-box').hide();
        });
    }


                //////HELPER_FUNC/////////
                function redirectTo(url) {
                    window.location = url;
                }

                function formatDate(isoString) {
                    var timestamp = new Date(Date.parse(isoString)),
                        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                    return timestamp.getDate() + '-' + months[timestamp.getMonth()] + '-' + timestamp.getFullYear() + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes();
                }


                return {
                    get: function(data) {
                        return new BaseController(data);
                    }
                }
            })();
