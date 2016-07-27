var app = app || {};

app.controller = (function() {
    function BaseController(data) {
        this._data = data;
    }

    BaseController.prototype.loadMenu = function(menuSel) {
        var viewUrl;
        if (this._data.users.isLogged()) {
            viewUrl = './views/user-menu.html';
        } else {
            viewUrl = './views/default-menu.html';
        }
        $(menuSel).load(viewUrl);
    }
    BaseController.prototype.loadHome = function(sel) {
        var output,
            _this = this,
            data;
        if (this._data.users.isLogged()) {
            $.get('./views/user-home.html', function(view) {
                data = _this._data.users.getUserData();
                output = Mustache.render(view, data);
                $(sel).html(output);
            });
        } else {
            $(sel).load('./views/default-home.html');
        }
    }
    BaseController.prototype.loadLogin = function(sel) {
        $(sel).load('./views/login.html');
    }
    BaseController.prototype.loadRegister = function(sel) {
        $(sel).load('./views/register.html');
    }
    BaseController.prototype.logout = function(sel) {
        this._data.users.logout();
        Noty.success("Successfully logged out.");
        redirectTo('#/');
    }
    BaseController.prototype.loadAddProduct = function(sel) {
        if (!this._data.users.isLogged()) {
            redirectTo('#/');
            return;
        }

        $(sel).load('./views/add-product.html');
    }
    BaseController.prototype.loadProducts = function(sel) {
        var _this = this;
        if (!this._data.users.isLogged()) {
            redirectTo('#/');
            return;
        }

        this._data.products.getAll()
            .then(function(data) {
                    $.get('views/products.html', function(view) {
                        var products = data.results,
                            categories = [],
                            output,
                            userId = _this._data.users.getUserData().userId;

                        products.forEach(function(pr) {
                            if (pr.ACL[userId]) {
                                pr.showButtons = true;
                            }
                            pr.priceString = formatPrice(pr.price);

                            categories[pr.category] = pr.category;
                        });

                        data.categories = Object.keys(categories)
                            .map(function(value, index) {
                                return value; })
                        output = Mustache.render(view, data);
                        $(sel).html(output);
                    });
                },
                function(error) {
                    Noty.error('Error loading products.');
                });
    }
    BaseController.prototype.loadEditProduct = function(sel, productId) {
        if (!this._data.users.isLogged()) {
            redirectTo('#/');
            return;
        }
        this._data.products.getById(productId)
            .then(function(data) {
                $.get('views/edit-product.html', function(view) {
                    var output = Mustache.render(view, data);
                    $(sel).html(output);
                });
            });
    }
    BaseController.prototype.loadDeleteProduct = function(sel, productId) {
        if (!this._data.users.isLogged()) {
            redirectTo('#/');
            return;
        }
        this._data.products.getById(productId)
            .then(function(data) {
                $.get('views/delete-product.html', function(view) {
                    var output = Mustache.render(view, data);
                    $(sel).html(output);
                });
            })
    }
    BaseController.prototype.attachEventHandlers = function() {
        var sel = '#main';
        attachRegisterHandler.call(this, sel);
        attachLoginHandler.call(this, sel);
        attachCreateProductHandler.call(this, sel);
        attachEditProductHandler.call(this, sel);
        attachDeleteProductHandler.call(this, sel);
        attachFilterHandler.call(this, sel);
        attachClearFiltersHandler.call(this, sel);
    }

    var attachEditProductHandler = function(sel) {
        var _this = this;
        $(sel).on('click', '#edit-product-button', function(e) {
            var productId = $('.edit-product-form').attr('data-id'),
                product = {
                    name: $('#item-name').val(),
                    category: $('#category').val(),
                    price: parseFloat($('#price').val())
                };

            _this._data.products.edit(product, productId)
                .then(function(data) {
                        Noty.success("Product successfully edited.");
                        redirectTo('#/products');
                    },
                    function(error) {
                        Noty.error("Error. Try again.");
                        redirectTo('#/products');
                    });
        });
    }
    var attachDeleteProductHandler = function(sel) {
        var _this = this;
        $(sel).on('click', '#delete-product-button', function(ev) {
            var productId = $('.delete-product-form').attr('data-id');
            _this._data.products.delete(productId)
                .then(function(data) {
                    Noty.success("Product successfully deleted.");
                    redirectTo('#/products');
                }, function(error) {
                    Noty.error("Could not delete product.");
                    redirectTo('#/products');
                });
        });
    }
    var attachFilterHandler = function(sel) {
        var _this = this;
        $(sel).on('click', '#filter', function(e) {
            var keyword = $('#search-bar').val(),
                minPrice = parseFloat($('#min-price').val()),
                maxPrice = parseFloat($('#max-price').val()),
                category = $('#category').val();

            $('#products-list').children()
                .each(function(index) {
                    var self = $(this),
                        productName = self.attr('data-name'),
                        productPrice = parseFloat(self.attr('data-price')),
                        productCategory = self.attr('data-category');

                    if (productName.contains(keyword) &&
                        minPrice <= productPrice && maxPrice >= productPrice &&
                        (category === "All" || category === productCategory)) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
        });
    }
    var attachClearFiltersHandler = function(sel) {
        $(sel).on('click', '#clear-filters', function(ev) {
            $('#products-list').children().each(function(idx) {
                $(this).show();
            });
        });
    }
    var attachRegisterHandler = function(sel) {
        var _this = this;
        $(sel).on('click', '#register-button', function(ev) {
            var username = $('#username').val(),
                password = $('#password').val(),
                confirmPassword = $('#confirm-password').val();
            if (password !== confirmPassword) {
                Noty.error("Passwords must be identical.");
                return;
            }
            _this._data.users.register(username, password)
                .then(function(data) {
                        Noty.success("Registration successful.");
                        redirectTo('#/login');
                    },
                    function(error) {
                        Noty.error("Your registration has encountered an error.");
                    });
        });
    }
    var attachLoginHandler = function(sel) {
        var _this = this;
        $(sel).on('click', '#login-button', function() {
            var username = $('#username').val(),
                password = $('#password').val();

            _this._data.users.login(username, password)
                .then(function(data) {
                        redirectTo('#/');
                    },
                    function(error) {
                        Noty.error("Incorrect username/password.");
                    });
        });
    }
    var attachCreateProductHandler = function(sel) {
        var _this = this;
        $(sel).on("click", "#add-product-button", function() {
            var product = {
                    name: $('#item-name').val(),
                    category: $('#category').val(),
                    price: parseFloat($('#price').val())
                },
                userId = _this._data.users.getUserData().userId;

            _this._data.products.add(product, userId)
                .then(function(data) {
                        Noty.success("Product successfully created!");
                        redirectTo('#/products');
                    },
                    function(error) {
                        Noty.error("Error creating product.");
                    });
        });
    }

    ////////////HELPER_FUNCS////////////
    function redirectTo(url) {
        window.location = url;
    }

    function formatPrice(priceString) {
        return '$' + parseFloat(priceString).toFixed(2);
    }
    String.prototype.contains = function(needle) {
        return this.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    }
    return {
        get: function(data) {
            return new BaseController(data);
        }
    }

})();
