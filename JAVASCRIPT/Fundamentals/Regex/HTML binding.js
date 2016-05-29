/*Write a function that puts the value of an object
 into the content/attributes of HTML tags.
Add the function to the String.prototype*/

if (!String.prototype.bind) {
    String.prototype.bind = function (str, obj) {
        var pattern = /<[A-z0-9"\s\-=\/]+>/g,
             patternName = /data-bind-content="name"/,
             patternLink = /data-bind-href="link"/,
             patternClass = /data-bind-class="name"/,
             result;
        if (patternName.test(this)) {
            result = this.match(pattern).join(obj.name);
        }
        if (patternLink.test(this)) {
            result = result.replace('>', ' href=' + '"' + obj.link + '">');
        }
        if (patternClass.test(this)) {
            result = result.replace('>', ' class=' + '"' + obj.name + '">');
        }
        return result;
    }
}

var str01 = '<div data-bind-content="name"></div>';
var str02 = '<a data-bind-content="name" data-bind-href="link" data-bind-class="name"></a>';

console.log(str01.bind(str01, { name: 'Steven' }));
console.log(str02.bind(str02, { name: 'Elena', link: 'http://telerikacademy.com' }));