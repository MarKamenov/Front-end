const app = app || {};

app.homeViewBag = (function () {
    function showWelcomePage(sel) {
        $.get('templates/welcome-guest.html', function (templ) {
            $(sel).html(templ);
        });
    }

    function showLoginMenu(sel) {
        $.get('templates/menu-login.html', function (templ) {
            $(sel).html(templ);
        });
    }

    function showHomeMenu(sel) {
        $.get('templates/menu-home.html', function (templ) {
            $(sel).html(templ);
        });
    }
    function showHomePage(sel, data) {
        $.get('templates/welcome-user.html', function (templ) {
            const output = Mustache.render(templ, data);
            $(sel).html(output);
        })
    }

    return {
        load: function () {
            return {
                showLoginMenu: showLoginMenu,
                showWelcomePage: showWelcomePage,
                showHomeMenu: showHomeMenu,
                showHomePage: showHomePage
            }
        }
    }
}());
