/*Write a JavaScript function that reverses a string and returns it.*/
function reverse(string) {
    var reversed = [];

    for (var ind = string.length - 1; ind >= 0; ind--) {
        reversed.push(string[ind]);
    }

    return reversed.join('');
}
console.log(reverse('text'));
console.log(reverse('reversed'));