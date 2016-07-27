var app = app || {};

app.homeController = (function(){
	function HomeController(viewBag, model, constants) {
        this.viewBag = viewBag;
        this.model = model;
        this.constants = constants;
    }
    HomeController.prototype.loadWelcomePage = function(sel){
    	this.viewBag.showWelcomePage(sel);
    };
    HomeController.prototype.loadLoginMenu = function(sel){
    	 this.viewBag.showLoginMenu(sel);
    };
     HomeController.prototype.loadHomeMenu = function(sel) {
        this.viewBag.showHomeMenu(sel);
    };
      HomeController.prototype.loadHomePage = function(sel) {
        var data = {
            username: sessionStorage['username']
        };

        this.viewBag.showHomePage(sel, data);
    };
    return {
        load: function(viewBag, model, constants) {
            return new HomeController(viewBag, model, constants);
        }
    }
})();