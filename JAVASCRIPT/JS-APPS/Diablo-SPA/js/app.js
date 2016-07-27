var app = app || {};

(function(){
    var requester = app.requester.load('kid_Z1N2WtXI-W', '0f2877ec54d74a39b250ff082a39aa76', 'https://baas.kinvey.com/'),
    homeViewBag = app.homeViewBag.load(),
    homeController = app.homeController.load(homeViewBag),
    userViewBag = app.userViewBag.load(),
    userModel = app.userModel.load(requester),
    userController = app.userController.load(userViewBag, userModel),

    heroesViewBag = app.heroesViewBag.load(),
    heroesModel = app.heroesModel.load(requester),
    heroClassesModel = app.heroClassesModel.load(requester),
    heroesController = app.heroesController.load(heroesViewBag, heroesModel, heroClassesModel),

    itemsViewBag = app.itemsViewBag.load(),
    itemTypesModel = app.itemTypesModel.load(requester),
    itemsModel = app.itemsModel.load(requester),
    itemsController = app.itemsController.load(itemsViewBag, itemsModel, itemTypesModel),



    router = Sammy(function(){
         var selector = '#container',
             menu = '#menu';

      

        this.before(function () {
            if(!sessionStorage['sessionId']) {
                $.get('templates/menu-login.html', function (templ) {
                    $(menu).html(templ);
                })
            } else {
                $.get('templates/menu-home.html', function (templ) {
                    $(menu).html(templ);
                })
            }
        });
                        //doesn't work
        this.before({except:{path:'\/#\/(login\/|register\/)?'}}, function()  {
            if(!sessionStorage['sessionId']) {
                noty({
                    theme: 'relax',
                    text: 'You should be logged in to do this action!',
                    type:'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
                this.redirect('#/');
                return false;
            }
        });
        this.get('#/', function() {
            if(!sessionStorage['sessionId']) {
                homeController.loadWelcomePage(selector);
            } else {
                var username = sessionStorage['username'];
                homeController.loadUserHomePage(selector, {username: username});
            }

        });
        this.get('#/register/', function() {
            userController.loadRegisterPage(selector);
        });
        this.get('#/login/', function() {
            userController.loadLoginPage(selector);
        });
        this.get('#/logout/', function () {
            userController.logout();
        });
         this.get('#/heroes/list/', function () {
            heroesController.loadMyHeroes(selector);
        });
          this.get('#/heroes/add/', function () {
            heroesController.loadAddHero(selector);
        });
         this.get('#/heroes/:id', function () {
            var id = this.params['id'];
            if(id) {
                heroesController.loadHero(selector, id);
            }
        });
         this.get('#/heroes/:id/store', function () {
            var id = this.params['id'];
            if(id) {
                itemsController.loadStore(selector, id);
            }
        });

            ////////EVENT_HANDLERS///////
        this.bind('redirectUrl', function (e, data) {
            this.redirect(data.url);
        });
         this.bind('register', function (e, data) {
            userController.register(data);
        });
         this.bind('login', function (e, data) {
            userController.login(data);
        });
          this.bind('addHero', function(e, data) {
            heroesController.addHero(data);
        });
        this.bind('checkForItemTypeInHeroAndBuyItem', function(e, data) {
            heroesController.checkForItemTypeInHeroAndBuyItem(data);
        });

    });//end Sammy
         router.run('#/');
})();