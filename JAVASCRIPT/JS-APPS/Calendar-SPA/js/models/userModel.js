const app = app || {};

app.userModel = (function () {

    function UserModel(requester) {
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'user/' + requester.appId + '/';
    }
    UserModel.prototype.register = function (data) {
        return this.requester.post(this.serviceUrl, data, false);
    };
    UserModel.prototype.login = function (data) {
        const reqUrl = this.serviceUrl + 'login';
        return this.requester.post(reqUrl, data, false);
    }
    UserModel.prototype.logout = function () {
        const reqUrl = this.serviceUrl + '_logout';
        return this.requester.post(reqUrl, null, true);
    }
    return {
        load: function (requester) {
            return new UserModel(requester);
        }
    }
})();