const app = app || {};

(function () {

    const router = Sammy(function () {
        const sel = '#container',
            menu = '#menu',
            constants = app.constants,
            requester = app.requester.load(
                constants.APPLICATION_ID,
                constants.APPLICATION_SECRET,
                constants.BASE_URL),
            homeViewBag = app.homeViewBag.load(),
            homeController = app.homeController.load(homeViewBag, null, constants),
            userModel = app.userModel.load(requester),
            userViewBag = app.userViewBag.load(),
            userController = app.userController.load(userViewBag, userModel, constants),
            lecturesViewBag = app.lecturesViewBag.load(),
            lecturesModel = app.lecturesModel.load(requester),
            lecturesController = app.lecturesController.load(lecturesViewBag, lecturesModel, constants);

        this.before(function () {
            if (!window.navigator.onLine) {
                app.notyErrorMessage(constants.NO_INTERNET_CONNECTION_MSG);
                return false;
            }

            if (!sessionStorage['sessionId']) {
                homeController.loadLoginMenu(menu);
            } else {
                homeController.loadHomeMenu(menu);
            }
        });

        this.before({ except: { path: '\/#\/(login\/|register\/)?' } }, function () {
            if (!sessionStorage['sessionId']) {
                app.notyErrorMessage(constants.NOT_LOGGED_IN_MSG)
                this.redirect('#/');
                return false;
            }
        });


        this.get('#/', function () {
            homeController.loadWelcomePage(sel);
        });
        this.get('#/home/', function () {
            homeController.loadHomePage(sel);
        });
        this.get('#/register/', function () {
            userController.loadRegisterPage(sel);
        });
        this.get('#/login/', function () {
            userController.loadLoginPage(sel);
        });
        this.get('#/logout/', function () {
            userController.logout();
        });
        this.get('#/calendar/list/', function () {
            lecturesController.loadAllLectures(sel);
        });
        this.get('#/calendar/my/', function () {
            lecturesController.loadMyLectures(sel);
        });
        this.get('#/calendar/add/', function () {
            lecturesController.loadAddLecture(sel);
        });
        this.get('#/calendar/edit/:id', function () {
            const id = this.params['id'];

            lecturesController.loadEditLecture(sel, id);
        });
        this.get('#/calendar/delete/:id', function () {
            const id = this.params['id'];

            lecturesController.loadDeleteLecture(sel, id);
        });

        //////BIND_EVENTS/////////
        this.bind('redirectUrl', function (ev, data) {
            this.redirect(data.url);
        });
        this.bind('register', function (ev, data) {
            userController.register(data);
        });
        this.bind('login', function (ev, data) {
            userController.login(data);
        });
        this.bind('addLecture', function (ev, data) {
            lecturesController.addLecture(data);
        });
        this.bind('editLecture', function (ev, data) {
            lecturesController.editLecture(data);
        });
        this.bind('deleteLecture', function (ev, data) {
            lecturesController.deleteLecture(data._id);
        })

    });//end Sammy
    router.run('#/');
})();