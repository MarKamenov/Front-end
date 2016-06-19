/*Write a function that checks if an array of person contains 
only people of age (with age 18 or greater) 
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

console.log(arr.every(function (item) {
	return item.age >= 18;
}));