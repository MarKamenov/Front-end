var homeController = function(){
	function all (context){
		templates.get('home')
		.then(function(tmpl){
			context.$element().html(tmpl);
		});
	};
	return {
		all: all
	};
}();