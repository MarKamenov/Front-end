var app = app || {};

app.itemsController = (function(){
	 function ItemsController(viewBag, model, itemTypesModel) {
        this.model = model;
        this.viewBag = viewBag;
        this.itemTypesModel = itemTypesModel;
    }
   ItemsController.prototype.loadStore = function (selector, heroId) {
        var _this = this;
        this.model.getAllItems()
            .then(function (data) {
                _this.viewBag.showStore(selector, data, heroId);
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.description,
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            })
    };
    return {
        load: function (viewBag, model) {
            return new ItemsController(viewBag, model);
        }
    };
})();