import 'sammy'
import 'jquery'
import Handlebars from 'handlebars'
import data from 'data.js'
import templates from 'helpers/templatesLoader.js'
import eventsLoader from 'eventsLoader.js'
import notifier from 'helpers/notifier.js'



var containerId = '#main',
    $container = $(containerId);

var sammyApp = Sammy(containerId, function() {
    this.get('#/', function() {
        this.redirect('#/home')
    });
    this.get('#/home', function() {
        templates.load('home')
            .then(function(templateHtml) {
                $container.html(templateHtml);
            })
    });

    this.get('#/login', function() {
        templates.load('login')
            .then(function(templateHtml) {
                $container.html(templateHtml);
            });
        eventsLoader.loginPageEvents($container);
    });
    this.get('#/shops', function() {
        Promise.all([data.shops.all(), templates.load('shops')])
            .then(function(results) {
                var template = Handlebars.compile(results[1]),
                    html = template(results[0]);

                $container.html(html);
            });

        eventsLoader.shopEvents($container);
    });

    this.get('#/search/:value', function() {
        var value = this.params.value;
        Promise.all([data.search(value), templates.load('shops')])
            .then(function(results) {
                var template = Handlebars.compile(results[1]),
                    html = template(results[0]);
                $container.html(html);
            })
    });

    eventsLoader.navigationEvents($('#wrapper nav'));

    Promise.all([data.users.current(), templates.load('login-logout')]).then(function(res) {
        var template = Handlebars.compile(res[1]),
            html = template(res[0]);
        $('#wrapper nav').append(html);

    });

});
sammyApp.run('#/');
