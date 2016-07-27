var app = app || {};

app.itemsModel = (function(){
	 function ItemsModel(requester) {
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/items/';
    }
     ItemsModel.prototype.getAllItems = function(){
     var requestUrl = this.serviceUrl + "?resolve=type&retainReferences=false";	
      return this.requester.get(requestUrl, true);
     }

      return {
        load: function (requester) {
            return new ItemsModel(requester);
        }
    }
})();