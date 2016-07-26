var data = function() {

    var items = [
        { name: 'John', id: 100 },
        { name: 'Jane', id: 101 },
        { name: 'Michael', id: 102 }
    ];

    function get() {
        var promise = new Promise(function(resolve, reject) {
            resolve({
                result: items,
                length: items.lenght
            });
        });
        return promise;
    }

    function getById(id) {
        id = +id;
        var promise = new Promise(function(resolve, reject) {
            for (var i = 0; i < items.length; i += 1) {

                if (items[i].id === id) {
                    resolve({
                        result: items[i]
                    });
                    return;
                }
            }
            reject({
                msg: 'Ivalid Id'
            });
        });
        return promise;
    }
    var lasId = 0;

    function save(item) {
        var promise = new Promise(function(resolve, reject) {
            item.id = lasId += 1;
            items.push(item);
            resolve(item);
        });
        return promise;
    }

    function myGet(url) {
        return new Promise(function(resolve, reject) {
            resolve(items.slice());
        });
    }
    return {
        get: myGet,
        getById: getById,
        save: save
    };

}();
