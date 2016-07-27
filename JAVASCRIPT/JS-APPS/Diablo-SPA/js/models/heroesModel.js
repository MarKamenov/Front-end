var app = app || {};

app.heroesModel = (function(){
	function HeroesModel(requester) {
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/heroes/';
    }
     HeroesModel.prototype.getAllHeroes = function(){
     	 var requestUrl = this.serviceUrl + "?resolve=class&retainReferences=false";
        return this.requester.get(requestUrl, true);
     }
      HeroesModel.prototype.addHero = function (data) {
        return this.requester.post(this.serviceUrl, data, true);
    };
    HeroesModel.prototype.getHero = function (id, resolveReferences) {
        var requestUrl;
        if (resolveReferences) {
            requestUrl = this.serviceUrl + id + "?resolve=class,items,items.type&retainReferences=false";
        } else {
            requestUrl = this.serviceUrl + id;
        }
        return this.requester.get(requestUrl, true);
    };
    HeroesModel.prototype.getItems = function(id){
      var requestUrl = this.serviceUrl + id + "?resolve=items,items.type&retainReferences=false";
      return this.requester.get(requestUrl, true)
      .then(function(data){
        if(data.items !== undefined){
          return data.items.map(function(item){
           return {
                        id: item._id,
                        name: item.name,
                        type: item.type.name
                    } 
                  });
        }else{
            return [];
          };
      }); 
    };
    HeroesModel.prototype.addItem = function(data){
      var _this = this;
      return this.getHero(data.heroId, false)
      .then(function(hero){
       if (hero.items == undefined) {
                hero.items = [];
            }
        hero.items.push({
                "_type": "KinveyRef",
                "_id": data.itemId,
                "_collection": "items"
            });
             var requestUrl = _this.serviceUrl + data.heroId;
            return _this.requester.put(requestUrl, hero, true);  
      });  
    };
    HeroesModel.prototype.removeItem = function (heroId, itemId) {
        var _this = this;
        return this.getHero(heroId, false).then(function (hero) {
            var itemIds = hero.items.map(function (item) {
                return item._id;
            });
            var indexOfItem = itemIds.indexOf(itemId);
            hero.items.splice(indexOfItem, 1);

            var requestUrl = _this.serviceUrl + heroId;
            return _this.requester.put(requestUrl, hero, true);
        })
    };


     return {
        load: function (requester) {
            return new HeroesModel(requester);
        }
    }

})();