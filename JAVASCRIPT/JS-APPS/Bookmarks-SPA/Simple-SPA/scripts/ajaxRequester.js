'use strict'

const ajaxRequester = (function () {

    const baseUrl = "https://api.parse.com/1/";

    const headers = {
        "X-Parse-Application-Id": "C0NsUSFtKPOq4TaGeqMf62XI6IG7HXydrpkjvSQX",
        "X-Parse-REST-API-Key": "0SL1EbtpvbP2QajiY0ENXKAjQkYLOmlrkgbNnBgN"
    };

    const login = function (username, password, success, error) {
        $.ajax({
            method: "GET",
            headers: headers,
            url: baseUrl + "login",
            data: { username: username, password: password },
            success: success,
            error: error
        });
    }

    const register = function (username, password, success, error) {
        $.ajax({
            method: "POST",
            headers: headers,
            url: baseUrl + "users",
            data: JSON.stringify({ username: username, password: password }),
            success: success,
            error: error
        });
    }
    const getHeadersWithToken = function (sessionToken) {
        const headersWithToken = JSON.parse(JSON.stringify(headers));
        headersWithToken['X-Parse-Session-Token'] = sessionToken;
        return headersWithToken;
    }
    const getBookmarks = function (sessionToken, success, error) {
        const headersWithToken = getHeadersWithToken(sessionToken);
        $.ajax({
            method: "GET",
            headers: headersWithToken,
            url: baseUrl + "classes/Bookmark",
            success: success,
            error: error
        });
    }
    const createBookmark = function (title, url, userId, success, error) {
        const bookmark = { title: title, url: url, ACL: {} };
        bookmark.ACL[userId] = { "write": true, "read": true };
        $.ajax({
            method: "POST",
            headers: headers,
            url: baseUrl + "classes/Bookmark",
            data: JSON.stringify(bookmark),
            success: success,
            error: error
        });
    }
    const deleteBookmark = function (sessionToken, bookmarkId, success, error) {
        const headersWithToken = getHeadersWithToken(sessionToken);
        $.ajax({
            method: "DELETE",
            headers: headersWithToken,
            url: baseUrl + "classes/Bookmark/" + bookmarkId,
            success: success,
            error: error
        });

    }
    return {
        login: login,
        register: register,
        getBookmarks: getBookmarks,
        createBookmark: createBookmark,
        deleteBookmark: deleteBookmark
    };
})();