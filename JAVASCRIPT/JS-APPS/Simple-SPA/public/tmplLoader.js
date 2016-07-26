 var templates = function() {
        var loadedTemplates = {};

        function get(templateName) {
            var promise = new Promise(function(resolve, reject) {
                if (loadedTemplates[templateName]) {
                    resolve(loadedTemplates[templateName]);
                    return;
                }
                var url = 'templates/' + templateName + '.handlebars';
                $.ajax({
                    url: url ,
                    success: function(html) {
                        loadedTemplates[templateName] = html;
                        resolve(html);
                    }
                });
            });
            return promise;
        }
        return {
            get: get
        };
    }();