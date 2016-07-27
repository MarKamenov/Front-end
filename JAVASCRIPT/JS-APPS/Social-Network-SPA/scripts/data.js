var app = app || {};

app.data = (function () {

    function Data (baseUrl, ajaxRequester) {
        this.users = new Users(baseUrl, ajaxRequester);
        this.posts = new Posts(baseUrl, ajaxRequester);
    }

    var credentials = (function () {

        function getHeaders() {
            var headers = {
                    'X-Parse-Application-Id': 'fnU9ApPBEPkU6nliVDeABkP0G4unT2FwV26r4cXc',
                    'X-Parse-REST-API-Key': 'noNdpXaiJvgfN8Yxp76iSutzKcuRY3tW2BjPHSmr'
                },
                currentUser = getSessionToken();

            if (currentUser) {
                headers['X-Parse-Session-Token'] = currentUser;
            }
            return headers;
        }

        function getSessionToken() {
            return localStorage.getItem('sessionToken');
        }

        function setSessionToken(sessionToken) {
            localStorage.setItem('sessionToken', sessionToken);
        }

        function getUserId() {
            return localStorage.getItem('userId');
        }

        function setUserId(userId) {
            return localStorage.setItem('userId', userId);
        }

        function getUsername() {
            return localStorage.getItem('username');
        }

        function setUsername(sessionToken) {
            localStorage.setItem('username', sessionToken);
        }
        
        function clearLocalStorage() {
            delete localStorage['username'];
            delete localStorage['sessionToken'];
            delete localStorage['userId'];
        }

        return {
            getSessionToken: getSessionToken,
            setSessionToken: setSessionToken,
            getUsername: getUsername,
            setUsername: setUsername,
            getUserId: getUserId,
            setUserId: setUserId,
            getHeaders: getHeaders,
            clearLocalStorage: clearLocalStorage
        }
    }());

    var Users = (function (argument) {
        function Users(baseUrl, ajaxRequester) {
            this._serviceUrl = baseUrl;
            this._ajaxRequester = ajaxRequester;
        }

        Users.prototype.login = function (username, password) {
            var url = this._serviceUrl + 'login?username=' + username + '&password=' + password;

            return this._ajaxRequester.get(url, credentials.getHeaders())
                .then(function (data) {
                    credentials.setSessionToken(data.sessionToken);
                    credentials.setUsername(data.username);
                    credentials.setUserId(data.objectId);
                    return data;
                });
        }

        Users.prototype.register = function (userRegData) {
            var url = this._serviceUrl + 'users';

            return this._ajaxRequester.post(url, userRegData, credentials.getHeaders())
                .then(function (data) {
                    return data;
                });
        }

        Users.prototype.editProfile = function (userId, userProfileData) {
            var url = this._serviceUrl + 'users/' + userId ;

            return this._ajaxRequester.put(url, userProfileData, credentials.getHeaders())
                .then(function (data) {
                    return data;
                });
        }

        Users.prototype.getById = function (userId) {
            var url = this._serviceUrl + 'users/' + userId;

            return this._ajaxRequester.get(url, credentials.getHeaders());
        }

        Users.prototype.isLogged = function() {
            return credentials.getSessionToken();
        }

        Users.prototype.validateToken = function (sessionToken) {
            var url = this._serviceUrl + 'users/me';
            return this._ajaxRequester.get(url, credentials.getHeaders());
        }

        Users.prototype.getUserData = function () {
            return {
                userId: credentials.getUserId(),
                username: credentials.getUsername(),
                sessionToken: credentials.getSessionToken()
            }
        }

        Users.prototype.logout = function() {
            credentials.clearLocalStorage();
        }

        return Users;
    }());

    var Posts = (function () {
        var POSTS_URL = 'classes/Post';

        function Posts(baseUrl, ajaxRequester) {
            this._serviceUrl = baseUrl + POSTS_URL;
            this._ajaxRequester = ajaxRequester;
        }

        Posts.prototype.getAll = function () {
            var url = this._serviceUrl + "?include=createdBy";
            return this._ajaxRequester.get(url, credentials.getHeaders());
        }

        Posts.prototype.getById = function (objectId) {
            return this._ajaxRequester.get(this._serviceUrl + '/' + objectId, credentials.getHeaders());
        }

        Posts.prototype.add = function (post, objectOwnerId) {
            post.ACL = { };
            post.ACL[objectOwnerId] = {"write": true, "read": true};
            post.ACL['*'] = {"read": true};
            return this._ajaxRequester.post(this._serviceUrl, post, credentials.getHeaders());
        }

        Posts.prototype.delete = function (objectId) {
            var url = this._serviceUrl + '/' + objectId;
            return this._ajaxRequester.delete(url, credentials.getHeaders());
        }

        return Posts;
    }());

    return {
        get: function (baseUrl, ajaxRequester) {
            return new Data(baseUrl, ajaxRequester);
        }
    }
}());