var app = app || {};

app.homeViewBag = (function(){

	function showWelcomePage(selector){
		 $.get('templates/welcome-guest.html', function(templ) {
            $(selector).html(templ);
        });	
	};
	 function showUserHomePage(selector, data){
	 	 $.get('templates/welcome-user.html', function(templ) {
            var output = Mustache.render(templ, data);
            $(selector).html(output);
        });
	 };
	 return {
        load: function () {
            return {
                showWelcomePage: showWelcomePage,
                showUserHomePage: showUserHomePage
            }
        }
    }
})();