app = app || {};

app.itemsViewBag = (function(){
	function showStore(selector, items, heroId){
		$.get('templates/store.html',function(templ){
			var rendered = Mustache.render(templ, {items: items});
            $(selector).html(rendered);
             $(".buy").on('click',function(){
             	var itemId = $(this).attr('data-id'),
                type = $(this).attr('data-type');
                 Sammy(function () {
                    this.trigger('checkForItemTypeInHeroAndBuyItem', {itemId: itemId, heroId: heroId, type: type})
                });
             });
		});
	};

	 return {
        load: function () {
            return {
                showStore: showStore
            }
        }
    }
})();