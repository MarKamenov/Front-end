/*Write a function that groups an array of persons by first letter of first name 
and returns the groups as a JavaScript Object 
◦ Use Array#reduce
◦ Use only array methods and no regular loops (for, while)
*/

function Person(fname, lname, age, gender) {
	this.firstName = fname;
	this.lastName = lname;
	this.age = age;
	this.gender = !gender ? 'male' : 'female';
}
var arr = [
	new Person('Doncho', 'Minkov', 25, false),
	new Person('Nikolay', 'Kostov', 24, false),
	new Person('Ivaylo', 'Kenov', 26, false),
	new Person('Pavel', 'Kolev', 25, false),
	new Person('Teodor', 'Kurtev', 23, false),
	new Person('Blagovest', 'Chavdarov', 125, false),
	new Person('Anna', 'Ivanova', 16, true),
	new Person('Iliana', 'Simeonova', 45, true),
	new Person('Svetlana', 'Dragoeva', 18, true),
	new Person('Elica', 'Stoyanova', 13, true)
];
var groups = arr.reduce(function (obj, person) {
	debugger;
    var letter = person.firstName[0];

    if (obj[letter]) {
        obj[letter].push(person);
    } else {
        obj[letter] = [person];
    }

    return obj;
}, {});

console.log(groups);
