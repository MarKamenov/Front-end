/*Write a function that formats a string. 
The function should have placeholders, as shown in the example
Add the function to the String.prototype*/
String.prototype.format = function(options) {
    var prop,
        result = this;
    for (prop in options) {
        result = result.replace(new RegExp('#{' + prop + '}', 'g'), options[prop]);
    }
    return result;
};

var options = {
        name: 'John',
        age: 13
    },
    result = 'My name is #{name} and I am #{age}-years-old.'.format(options);

console.log('Problem 1: ' + result);