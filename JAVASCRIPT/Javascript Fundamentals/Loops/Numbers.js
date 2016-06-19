//Write a script that prints all the numbers from  1  to  N 
var val = prompt('N = '),
    n = +val,
    number = 0,
    sum = 0,
    result = 'Number N =';
while (number < n) {
    number += 1;
    sum += number ;
    result += ' ' + number;
}
console.log(result);