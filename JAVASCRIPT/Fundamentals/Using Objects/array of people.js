/*Write a function that groups an array of people by age, first or last name.
• The function must return an associative array, with keys - the groups, and values - arrays with people in this groups

•Use function overloading (i.e. just one function)

*/
var groupByAge,
    groupByName,
    persons = [
    new Person('Alex', 27),
    new Person('Mike', 18),
    new Person('Ashley', 18),
    new Person('Vanessa', 27),
    new Person('Alex', 18),
    new Person('Vanessa', 24),
];

groupByAge = groupByProperty(persons, 'age');
groupByName = groupByProperty(persons, 'name');

console.log(JSON.stringify(groupByAge));
console.log(JSON.stringify(groupByName));
debugger
function Person(name, age) {
    this.name = name,
    this.age = age
}

function groupByProperty(persons, property) {

    var group = {},
        key;

    persons.forEach(function (person) {

        key = person[property];
        // Create new empty array if the key does not exist
        group[key] = group[key] || [];
        group[key].push(person);
    });

    return group;
}