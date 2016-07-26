import 'jquery'

export default {
    load: function(name) {
        var url = 'templates/' + name + '.handlebars';

        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                success: function(data) {
                    resolve(data);
                },
                error: function(err) {
                    reject(err);
                }
            })
        });
    }
}