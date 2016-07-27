var app = app || {};

(function() {
    var baseUrl = "https://api.parse.com/1/";
    var ajaxRequester = app.ajaxRequester.get();
    var data = app.data.get(baseUrl, ajaxRequester);
    var controller = app.controller.get(data);
    controller.attachEventHandlers();

    app.router = Sammy(function () {
        var mainSelector = '#main',
            headerSelector = '#header';

        this.get('#/', function (){
            controller.loadHeader(headerSelector);
            controller.loadHome(mainSelector);
        });
        this.get('#/register', function () {
            controller.loadHeader(headerSelector);
            controller.loadRegister(mainSelector);
        });
      this.get('#/login', function () {
            controller.loadHeader(headerSelector);
            controller.loadLogin(mainSelector);
        });

        this.get('#/logout', function () {
            controller.logout();
        });

         this.get('#/profile/edit', function () {
            controller.loadHeader(headerSelector);
            controller.loadEditProfile(mainSelector);
        });

        
    });

    app.router.run('#/');
}());