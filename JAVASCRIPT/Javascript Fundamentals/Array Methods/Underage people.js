/*Write a function that prints all underaged persons of an array of person 
◦ Use Array#filter and Array#forEach
◦ Use only array methods and no regular loops (for, while)
*/
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
    new makePerson('Nikola', 'Nikolov', 13, false), // this person have age under 18
    new makePerson('Mariq', 'Marieva', 22, true),
    new makePerson('Tanq', 'Tancheva', 45, true),
    new makePerson('Georgi', 'Georgiev', 17, false), // this person have age under 18
    new makePerson('Stanislava', 'Stanislavova', 27, true),
    new makePerson('Petar', 'Petrov', 23, false),
    new makePerson('Tedi', 'Todorova', 15, true), // this person have age under 18
    new makePerson('Daniel', 'Danielov', 29, false)
];

var result;

result = people.filter(function(item) {
    return item.age < 18;
});

console.log('People under 18 years : \n');

result.forEach(function(item, i) {
    var gend,
        str;

    if (result[i].gender) {
        gend = 'female';
    } else {
        gend = 'male';
    }

    str = (i) + '. ' + result[i].firstname + ' ' + result[i].lastname +
        ' is ' + gend + ' and is ' + result[i].age + ' years old.';

    console.log(str);
});
