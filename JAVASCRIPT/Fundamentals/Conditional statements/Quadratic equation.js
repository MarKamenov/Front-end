/*Write a script that reads the coefficients a, b and c of a quadratic equation 
ax2 + bx + c = 0 and solves it (prints its real roots).
Calculates and prints its real roots.
Note: Quadratic equations may have 0, 1 or 2 real roots.*/
var a = prompt('Enter coef. a') * 1,
	b = prompt('Enter coef. b') * 1,
	c = prompt('Enter coef. c') * 1,
	D = b * b - 4 * a * c;

if (D < 0) {
	console.log('No real roots!');
} else if (D === 0) {
	console.log('One real root: ' + (-b / (2 * a)));
} else {
	console.log('X1 = ' + ((-b + Math.sqrt(D)) / (2 * a)));
	console.log('X2 = ' + ((-b - Math.sqrt(D)) / (2 * a)));
}