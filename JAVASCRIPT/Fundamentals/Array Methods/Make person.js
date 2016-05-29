/*Write a function for creating persons. ◦ Each person must have firstname, lastname, age and gender (true is female, false is male)

• Generate an array with ten person with different names, ages and genders
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
    new makePerson('Todor', 'Todorov', 15, false),
    new makePerson('Biser', 'Biserov', 25, false),
    new makePerson('Nikola', 'Nikolov', 33, false),
    new makePerson('Mariq', 'Marieva', 22, true),
    new makePerson('Tanq', 'Tancheva', 45, true),
    new makePerson('Georgi', 'Georgiev', 21, false),
    new makePerson('Stanislava', 'Stanislavova', 27, true),
    new makePerson('Petar', 'Petrov', 23, false),
    new makePerson('Tedi', 'Todorova', 18, true),
    new makePerson('Daniel', 'Danielov', 29, false)
];
var i,
    gend,
    result;
for (i in people) {
    if (people[i].gender) {
        gend = 'female';
    } else {
        gend = 'male';
    }
    result = (i) + '. ' + people[i].firstname + ' ' + people[i].lastname + ' is ' + gend + ' and is ' + people[i].age + ' years old.';
    console.log(result);

}
