/*Write a function that reverses the digits of given decimal number.*/
function reverseDigit(number) {
	var reversed = '';
    for(var i = number.length - 1; i >= 0; i--) {
        reversed += number[i];
    }
    return reversed;
}
reverseDigit('5.67')
