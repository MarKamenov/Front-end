const app = app || {};

(function () {
    const baseUrl = 'https://api.parse.com/1/',
        ajaxRequester = app.ajaxRequester.get(),
        data = app.data.get(baseUrl, ajaxRequester),
        controller = app.controller.get(data);
    controller.attachEventHandlers();

    app.router = Sammy(function () {
        var sel = '#wrapper';

        this.get('#/', function () {
            controller.loadHome(sel);
        });
        this.get('#/login', function () {
            controller.loadLogin(sel);
        });
        this.get('#/register', function () {
            controller.loadRegister(sel);
        });
        this.get('#/bookmarks', function () {
            controller.loadBookmarks(sel);
        });
    });
    app.router.run('#/');
})();
