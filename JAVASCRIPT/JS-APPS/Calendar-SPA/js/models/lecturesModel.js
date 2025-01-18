const app = app || {};

app.lecturesModel = (function () {

    function LecturesModel(requester) {
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/lectures/';
    }

    LecturesModel.prototype.getAllLectures = function () {
        const reqUrl = this.serviceUrl;
        return this.requester.get(reqUrl, true);
    }
    LecturesModel.prototype.getLectureById = function (lectureId) {
        const reqUrl = this.serviceUrl + lectureId;
        return this.requester.get(reqUrl, true);
    };
    LecturesModel.prototype.getMyLectures = function (userId) {
        const reqUrl = this.serviceUrl + '?query={"_acl.creator":"' + userId + '"}';
        return this.requester.get(reqUrl, true);
    }
    LecturesModel.prototype.addLecture = function (data) {
        return this.requester.post(this.serviceUrl, data, true);
    };
    LecturesModel.prototype.editLecture = function (lectureId, data) {
        const reqUrl = this.serviceUrl + lectureId;
        return this.requester.put(reqUrl, data, true);
    };
    LecturesModel.prototype.deleteLecture = function (lectureId) {
        const reqUrl = this.serviceUrl + lectureId;
        return this.requester.remove(reqUrl, true);
    };
    return {
        load: function (requester) {
            return new LecturesModel(requester);
        }
    }
})();