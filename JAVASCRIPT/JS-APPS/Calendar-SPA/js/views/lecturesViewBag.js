const app = app || {};

app.lecturesViewBag = (function () {

    function showAllLectures(sel, data) {
        $.get('templates/calendar.html', function (templ) {
            const rendered = Mustache.render(templ);
            $(sel).html(rendered);

            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: [{
                    title: data[0].title,
                    start: data[0].start,
                    end: data[0].end,
                    allDay: false
                }],
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', { url: '#/calendar/add/' });
                            });
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').hide();
                        $('#deleteLecture').hide();
                    });
                    $('#events-modal').modal(calEvent);
                }
            });
        });
    }
    function showMyLectures(sel, data) {
        $.get('templates/calendar.html', function (templ) {
            const rendered = Mustache.render(templ);
            $(sel).html(rendered);
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', { url: '#/calendar/add/' });
                            });
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        const rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').on('click', function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', { url: '#/calendar/edit/' + calEvent._id });
                            });
                        });
                        $('#deleteLecture').on('click', function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', { url: '#/calendar/delete/' + calEvent._id });
                            });
                        })
                    });
                    $('#events-modal').modal(calEvent);
                }
            });
        });
    }
    function showAddLecture(sel) {
        $.get('templates/add-lecture.html', function (templ) {
            $(sel).html(templ);
            $('#addLecture').on('click', function () {
                const title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val();
                Sammy(function () {
                    this.trigger('addLecture', { title: title, start: start, end: end });
                });
            });
        });
    }
    function showEditLecture(sel, data) {
        $.get('templates/edit-lecture.html', function (templ) {
            const rendered = Mustache.render(templ, data);
            $(sel).html(rendered);
            $('#editLecture').on('click', function () {
                const title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                    id = $(this).attr('data-id');

                Sammy(function () {
                    this.trigger('editLecture', { title: title, start: start, end: end, _id: id });
                });
            });
        });
    }
    function showDeleteLecture(sel, data) {
        $.get('templates/delete-lecture.html', function (templ) {
            const rendered = Mustache.render(templ, data);
            $(sel).html(rendered);
            $('#deleteLecture').on('click', function () {
                const id = $(this).attr('data-id');
                Sammy(function () {
                    this.trigger('deleteLecture', { _id: id });
                });
            });
        });
    }
    return {
        load: function () {
            return {
                showAllLectures: showAllLectures,
                showMyLectures: showMyLectures,
                showAddLecture: showAddLecture,
                showEditLecture: showEditLecture,
                showDeleteLecture: showDeleteLecture
            }
        }
    }
})();