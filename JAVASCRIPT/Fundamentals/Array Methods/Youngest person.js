/*Write a function that finds the youngest male person 
in a given array of people and prints his full name 
◦ Use only array methods and no regular loops (for, while)
◦ Use Array#find
*/
if (!Array.prototype.find) {
    Array.prototype.find = function(callback) {
        var i,
            len;

        for (i = 0, len = this.length; i < len; i += 1) {
            if (callback(this[i], i, this)) {
                return this[i];
            }
        }
        return this;
    };
}

function makePerson(firstname, lastname, age, gender) {
    var person = {
        firstname: firstname,
        lastname: lastname,
        age: age,
        gender: gender
    };
    return person;
}

var people = [
    new makePerson('Todor', 'Todorov', 19, false),
    new makePerson('Biser', 'Biserov', 25, false),
    new makePerson('Nikola', 'Nikolov', 13, false), // youngest male!
    new makePerson('Mariq', 'Marieva', 22, true),
    new makePerson('Tanq', 'Tancheva', 45, true),
    new makePerson('Georgi', 'Georgiev', 17, false),
    new makePerson('Stanislava', 'Stanislavova', 11, true), // youngest female! (younger than all males) 
  
    new makePerson('Petar', 'Petrov', 23, false),
    new makePerson('Tedi', 'Todorova', 15, true),
    new makePerson('Daniel', 'Danielov', 29, false)
];

var youngestMale = people.filter(function(item) {
    return !item.gender;
})
.sort(function(x, y) {
    return x.age - y.age;
})
.find(function(item) {
    return item;
});

console.log('Youngest Male: ' + youngestMale.firstname + ' ' + youngestMale.lastname);
