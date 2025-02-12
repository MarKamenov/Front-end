const app = app || {};

app.data = (function () {
    function Data(baseUrl, ajaxRequester) {
        this.users = new Users(baseUrl, ajaxRequester);
        this.bookmarks = new Bookmarks(baseUrl, ajaxRequester);
    }
    const credentials = (function () {
        const headers = {
            'X-Parse-Application-Id': 'fE3pqGmdD8hKzNe2d1EKTSiarVHdh36uZZuO9nt8',
            'X-Parse-REST-API-Key': 'Z7ZsZRRkYT5Caq20M3aqBlHZMFL6CQ8JrgnSI4Dc',
            'X-Parse-Session-Token': getSessionToken()
        };

        function getSessionToken() {
            localStorage.getItem('sessionToken');
        }

        function setSessionToken(sessionToken) {
            localStorage.setItem('sessionToken', sessionToken);
        }

        function getUsername(sessionToken) {
            localStorage.getItem('username');
        }

        function setUsername(sessionToken) {
            localStorage.setItem('username', sessionToken);
        }

        function getHeaders() {
            return headers;
        }
        return {
            getSessionToken: getSessionToken,
            setSessionToken: setSessionToken,
            getUsername: getUsername,
            setUsername: setUsername,
            getHeaders: getHeaders
        }
    })();
    //////////USERS//////////////
    const Users = (function (arguments) {
        function Users(baseUrl, ajaxRequester) {
            this._serviceUrl = baseUrl;
            this._ajaxRequester = ajaxRequester;
            this._headers = credentials.getHeaders();
        }

        Users.prototype.login = function (username, password) {
            const url = this._serviceUrl + 'login?username=' + username + '&password=' + password;
            return this._ajaxRequester.get(url, this._headers).then(function (data) {
                credentials.setSessionToken(data.sessionToken);
                credentials.setUsername(data.username);
                return data;
            });
        }
        Users.prototype.register = function (username, password) {
            const user = {
                username: username,
                password: password
            };
            const url = this._serviceUrl + 'users';
            return this._ajaxRequester.post(url, user, this._headers)
                .then(function (data) {
                    credentials.setSessionToken(data.sessionToken);
                    return data;
                });
        }
        Users.prototype.signout = function () {
            localStorage.removeItem('sessionToken');
            localStorage.removeItem('username');
        }
        return Users;
    })();
    ///////////////BOOKMARKS////////////////
    const Bookmarks = (function (argument) {
        function Bookmarks(baseUrl, ajaxRequester) {
            this._serviceUrl = baseUrl + 'classes/Bookmark';
            this._ajaxRequester = ajaxRequester;
            this._headers = credentials.getHeaders();
        };
        Bookmarks.prototype.getAll = function () {
            return this._ajaxRequester.get(this._serviceUrl, this._headers);
        };
        Bookmarks.prototype.add = function (bookmark) {
            return this._ajaxRequester.post(this._serviceUrl, bookmark, this._headers);
        };
        Bookmarks.prototype.getById = function (objectId) {
            return this._ajaxRequester.get(this._serviceUrl + '/' + objectId, this._headers);
        }
        Bookmarks.prototype.delete = function (objectId) {
            const url = this._serviceUrl + '/' + objectId;
            return this._ajaxRequester.delete(url, this._headers);
        }
        return Bookmarks;
    })();
    return {
        get: function (baseUrl, ajaxRequester) {
            return new Data(baseUrl, ajaxRequester);
        }
    }
})();
