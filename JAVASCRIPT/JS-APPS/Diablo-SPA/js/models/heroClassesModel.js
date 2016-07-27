var app = app || {};

app.heroClassesModel = (function () {
    function HeroClassesModel(requester) {
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/hero-classes/';
    }

    HeroClassesModel.prototype.getAllClasses = function() {
        var requestUrl = this.serviceUrl;
        return this.requester.get(requestUrl, true);
    };

    return {
        load: function (requester) {
            return new HeroClassesModel(requester);
        }
    }
}());