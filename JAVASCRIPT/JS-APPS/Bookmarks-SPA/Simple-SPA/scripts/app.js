(function () {
    $(function () {
        registerEventHandlers();
        const currentUser = userSession.getCurrentUser();
        if (currentUser) {
            showBookmarksView();
        } else {
            showHomeView();
        }
    });
    function registerEventHandlers() {
        $("#btnShowLoginView").click(showLoginView);
        $("#btnLoginRegister").click(showRegisterView);
        $("#btnShowRegisterView").click(showRegisterView);
        $("#btnLoginLogin").click(loginClicked);
        $("#btnRegister").click(registerClicked);
        $("#btnLogout").click(logoutClicked);
        $("#btnAddBookmark").click(addBookmarkClicked);
    }
    function showHomeView() {
        $('#main > *').hide();
        $('#homeView').show();
        const currentUser = userSession.getCurrentUser();
        if (!currentUser) {
            $("#header span").text("");
            $("#header a").hide();
        }
    }
    //LOGIN
    function showLoginView() {
        $("main > *").hide();
        $("#loginView").show();
        $("#txtLoginUsername").val('');
        $("#txtLoginPassword").val('');
    }
    function loginClicked() {
        const username = $("#txtLoginUsername").val();
        const password = $("#txtLoginPassword").val();
        ajaxRequester.login(username, password, authSuccess, loginError);
    }
    function authSuccess(data) {
        userSession.login(data);
        showBookmarksView();
    }
    function loginError(error) {
        showAjaxError("Login failed", error);
    }
    //END LOGIN

    //LOGOUT
    function logoutClicked() {
        userSession.logout();
        showInfoMessage('Logged out with success !')
        showHomeView();
    }
    //END LOGOUT

    //REGISTER
    function showRegisterView() {
        $("main > *").hide();
        $("#registerView").show();
        $("#txtRegisterUsername").val('');
        $("#txtRegisterPassword").val('');
    }
    function registerClicked() {
        const username = $("#txtRegisterUsername").val();
        const password = $("#txtRegisterPassword").val();
        ajaxRequester.register(username, password, function (data) {
            showInfoMessage('User Registered !')
            data.username = username;
            authSuccess(data);
        }, registerError);
    }
    function registerError(error) {
        showAjaxError("Register failed", error);
    }
    //END REGISTER

    //BOOKMRAKS
    function showBookmarksView() {
        const currentUser = userSession.getCurrentUser();
        if (currentUser) {
            $("#header span").text(" - " + currentUser.username);
            $("#header a").show();

            $("main > *").hide();
            const sessionToken = currentUser.sessionToken;
            ajaxRequester.getBookmarks(sessionToken, loadBookmarksSuccess, loadBookmarksError)
        } else {
            showHomeView();
        }
    }
    function loadBookmarksSuccess(data) {
        const $bookmarksUl = $("#bookmarksView ul");
        $bookmarksUl.html('');
        for (const b in data.results) {
            const bookmark = data.results[b];
            const $bookmarkLi = $("<li>");
            $bookmarkLi.data("bookmark", bookmark);

            const $title = $("<div class='title'>");
            $title.text(bookmark.title);
            $bookmarkLi.append($title);

            const $url = $("<a class='url'>");
            $url.text(bookmark.url);
            $url.attr("href", bookmark.url);
            $bookmarkLi.append($url);

            const $deleteButton = $('<a href="#">Delete</a>');
            $deleteButton.click(deleteBookmarkButtonClicked);
            $bookmarkLi.append($deleteButton);

            $bookmarksUl.append($bookmarkLi);
        }
        showInfoMessage('Success')
        $("#txtTitle").val('');
        $("#txtUrl").val('');

        $("#bookmarksView").show();
    }
    function loadBookmarksError(error) {
        showErrorMessage("Bookmarks load failed.");
    }
    function addBookmarkClicked() {
        const title = $("#txtTitle").val();
        const url = $("#txtUrl").val();
        const currentUser = userSession.getCurrentUser();
        ajaxRequester.createBookmark(title, url, currentUser.objectId, showBookmarksView, addBookmarkError)
    }
    function addBookmarkError(error) {
        showErrorMessage("Bookmarks create failed.");
    }
    function deleteBookmarkButtonClicked() {
        const bookmark = $(this).parent().data('bookmark');
        const currentUser = userSession.getCurrentUser();
        const sessionToken = currentUser.sessionToken;
        noty(
            {
                text: "Delete this bookmark?",
                type: 'confirm',
                layout: 'topCenter',
                buttons: [
                    {
                        text: "Yes",
                        onClick: function ($noty) {
                            deleteBookmark(sessionToken, bookmark);
                            $noty.close();
                        }
                    },
                    {
                        text: "Cancel",
                        onClick: function ($noty) {
                            $noty.close();
                        }
                    }
                ]
            }
        );
    }
    function deleteBookmark(sessionToken, bookmark) {
        ajaxRequester.deleteBookmark(
            sessionToken, bookmark.objectId, showBookmarksView, deleteBookmarkError);
    }
    function deleteBookmarkError(error) {
        showErrorMessage("Delete bookmark failed.");
    }
    //END BOOKMARKS

    //HELPER FUNCTIONS
    function showAjaxError(msg, error) {
        const errMsg = error.responseJSON;
        if (errMsg && errMsg.error) {
            showErrorMessage(msg + ": " + errMsg.error);
        } else {
            showErrorMessage(msg + ".");
        }
    }
    function showInfoMessage(msg) {
        noty({
            text: msg,
            type: 'info',
            layout: 'topCenter',
            timeout: 1000
        }
        );
    }
    function showErrorMessage(msg) {
        noty({
            text: msg,
            type: 'error',
            layout: 'topCenter',
            timeout: 5000
        }
        );
    }

})();