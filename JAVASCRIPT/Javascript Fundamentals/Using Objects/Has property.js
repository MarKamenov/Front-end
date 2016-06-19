/*Write a function that checks if a given object contains a given property.*/
function hasProperty(obj, property) {
    var prop;
    for (prop in obj) {
        if (property === prop) {
            return 'Yes';
        }
    }
    return 'No';
}

var obj = {
    color: 'red',
    size: 'large',
    length: 25,
    string: 'obj'
}

var hasProp = hasProperty(obj, 'length');
console.log('Has property: \'length\' in obj: ' + hasProp);

hasProp = hasProperty(obj, 'exit');
console.log('Has property: \'exit\' in obj: ' + hasProp);

var hasProp = hasProperty(obj, 'size');
console.log('Has property: \'size\' in obj: ' + hasProp);