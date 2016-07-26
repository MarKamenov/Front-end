var data = function() {

    const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
        LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';
    ///////////USERS/////////////
    function register(user) {
        var reqUser = {
            username: user.username,
            passHash: CryptoJS.SHA1(user.username + user.password).toString()
        };
        return jsonRequester.post('api/users', {
            data: reqUser
        }).then(function(data) {
            var user = data.result;
            localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, user.username);
            localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, user.authKey);
            return {
                username: data.result.username
            };
        });
    };

    function login(user) {
        var reqUser = {
            username: user.username,
            passHash: CryptoJS.SHA1(user.username + user.password).toString()
        };
        var options = {
            data: reqUser
        };
        return jsonRequester.put('api/users/auth', options)
            .then(function(data) {
                var user = data.result;
                localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, user.username);
                localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, user.authKey);
            });
        return user;
    }

    function hasUser() {
        return !!localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) && !!localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY);
    }

    function logout() {
        var primise = new Promise(function(resolve, reject) {
            localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
            localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
            resolve();
        });
        return primise;
    }

    function usersGet() {
        return jsonRequester.get('api/users')
            .then(function(res) {
                return res.result;
            });
    }
    /////////////TODOS////////////////

    function getTodos() {
        var options = {
            headers: {
                'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
            }
        };
        return jsonRequester.get('api/todos', options)
            .then(function(res) {
                return res.result;
            });
    }

    function todosAdd(todo) {
        var options = {
            data: todo,
            headers: {
                'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
            }
        };
        return jsonRequester.post('api/todos', options)
            .then(function(data) {
                return data.result;
            });
    }

    function todosUpdate(id, todo) {
        var options = {
            data: todo,
            headers: {
                'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
            }
        };
        return jsonRequester.put('api/todos/' + id, options)
            .then(function(data) {
                return data.result;
            });
    }
    //////////////EVENTS///////////////////
    function eventsGet() {
        var options = {
            headers: {
                'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
            }
        };
        return jsonRequester.get('api/events', options)
            .then(function(data) {
                return data.result;
            });
    }

    function eventsAdd(event) {
        var options = {
            data: event,
            headers: {
                'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
            }
        };

        return jsonRequester.post('api/events', options)
            .then(function(data) {
                return data.result;
            });
    }
    //////CATEGORIES//////////////////
    function categoriesGet() {
        var options = {
            headers: {
                'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
            }
        };
        return jsonRequester.get('api/categories', options)
            .then(function(data) {
                return data.result;
            });
    }
    return {
        users: {
            register: register,
            hasUser: hasUser,
            login: login,
            logout: logout,
            get: usersGet
        },
        todos: {
            get: getTodos,
            add: todosAdd,
            update: todosUpdate
        },
        events: {
            get: eventsGet,
            add: eventsAdd
        },
        categories: {
            get: categoriesGet
        }
    }
}();
