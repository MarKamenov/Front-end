var app = app || {};

app.heroesController = (function(){
	 function HeroesController(viewBag, model, heroClassesModel) {
        this.model = model;
        this.viewBag = viewBag;
        this.heroClassesModel = heroClassesModel;
    }
    HeroesController.prototype.loadMyHeroes = function(selector){
    var _this = this;
        this.model.getAllHeroes()
        .then(function(data){
        _this.viewBag.showHeroes(selector, data);	
        })	
    }
    HeroesController.prototype.loadHero = function (selector, id) {
        var _this = this;
        this.model.getHero(id, true).then(function (data) {
        	
            _this.viewBag.showHero(selector, data);
        })
    };
     HeroesController.prototype.loadAddHero = function (selector) {
        var _this = this;
        this.heroClassesModel.getAllClasses().then(function (data) {

            _this.viewBag.showAddHero(selector, data);
        });
    };
    HeroesController.prototype.addHero = function(data){
     var result = {
            name: data.name,
            class: {
                "_type": "KinveyRef",
                "_id": data.class,
                "_collection": "hero-classes"
            }
        };
       this.model.addHero(result)
       .then(function(success){
       	 noty({
                    theme: 'relax',
                    text: 'Add hero successful!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/heroes/list/'})
                })
       }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.description,
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            }) 	
    }
    HeroesController.prototype.checkForItemTypeInHeroAndBuyItem = function(data){
        var _this = this;
        this.hasAlreadyItemOfThisType(data.heroId, data.type).then(function(res){
            if(!res){
              _this.buyItem(data);   
            }else{
               noty({
                    text: 'You already have: ' + res.name + '. Do you want to throw it and buy this item instead?',
                    type: 'confirm',
                    buttons: [
                        {
                            addClass: 'btn btn-primary', text: 'Yes', onClick: function ($noty) {
                            $noty.close();
                            _this.model.removeItem(data.heroId, res._id).then(function (_) {
                                _this.buyItem(data);
                            });
                        }
                        },
                        {
                            addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                            $noty.close();
                        }
                        }
                    ]
                })  
            }
        })
    }
    HeroesController.prototype.buyItem = function(data){
      this.model.addItem(data).then(function(res){
          noty({
                theme: 'relax',
                text: 'Item bought successfully!',
                type: 'success',
                timeout: 2000,
                closeWith: ['click']
            });
            Sammy(function () {
                this.trigger('redirectUrl', {url: '#/heroes/' + data.heroId})
            }); 
      },function (error) {
            noty({
                theme: 'relax',
                text: error.responseJSON.description,
                type: 'error',
                timeout: 2000,
                closeWith: ['click']
            });
        });  
    };
    HeroesController.prototype.hasAlreadyItemOfThisType = function(heroId, type){
      return this.model.getItems(heroId)
      .then(function(heroItems){
       var heroItemsTypes = heroItems.map(function (item) {
                return item.type;
            }); 
        var indexInArray = $.inArray(type, heroItemsTypes);
        if (indexInArray != -1) {
                return heroItems[indexInArray];
            }
            return false;
      }) ; 
    };
    return {
        load: function (viewBag, model, heroClassesModel) {
            return new HeroesController(viewBag, model, heroClassesModel);
        }
    };
})();