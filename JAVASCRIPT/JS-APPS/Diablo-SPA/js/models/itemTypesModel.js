var app = app || {};

app.itemTypesModel = (function () {
    function ItemTypesModel(requester) {
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/item-types/';
    }

    ItemTypesModel.prototype.getAllTypes = function() {
        var requestUrl = this.serviceUrl;
        return this.requester.get(requestUrl, true);
    };

    return {
        load: function (requester) {
            return new ItemTypesModel(requester);
        }
    }
}());