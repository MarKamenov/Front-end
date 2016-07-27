var app = app || {};

app.userController = (function(){
	 function UserController(viewBag, model) {
        this.model = model;
        this.viewBag = viewBag;
    }
    UserController.prototype.loadRegisterPage = function(selector) {
        this.viewBag.showRegisterPage(selector);
    };

    UserController.prototype.register = function(data){
    	 return this.model.register(data)
    	 .then(function(success){
    	  sessionStorage['sessionId'] = success._kmd.authtoken;
          sessionStorage['username'] = success.username;
          sessionStorage['userId'] = success._id;	

          noty({
                    theme: 'relax',
                    text: 'Registered successfully!',
                    type:'success',
                    timeout: 2000,
                    closeWith: ['click']
                });
            Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/'});
                });
    	 }, function(error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.description,
                    type:'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            }).done();
    }
      UserController.prototype.loadLoginPage = function(selector) {
        this.viewBag.showLoginPage(selector);
    };
    UserController.prototype.login = function(data){
    	return this.model.login(data)
    	.then(function(success){
    		sessionStorage['sessionId'] = success._kmd.authtoken;
            sessionStorage['username'] = success.username;
            sessionStorage['userId'] = success._id;

               noty({
                    theme: 'relax',
                    text: 'Login successful!',
                    type:'success',
                    timeout: 2000,
                    closeWith: ['click']
                });
             Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/'});
                });
    	}, function(error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.description,
                    type:'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            });
    };
     UserController.prototype.logout = function() {
        this.model.logout()
            .then(function() {
                sessionStorage.clear();

                noty({
                    theme: 'relax',
                    text: 'Logout successful!',
                    type:'success',
                    timeout: 2000,
                    closeWith: ['click']
                });
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/'});
                });
            }, function(error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.description,
                    type:'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            })
    };
     return {
        load: function(viewBag, model) {
            return new UserController(viewBag, model);
        }
    }

})();