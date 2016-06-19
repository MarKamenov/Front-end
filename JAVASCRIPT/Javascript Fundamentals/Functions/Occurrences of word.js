/*Write a function that finds all the occurrences of word in a text.
• The search can be case sensitive or case insensitive.
• Use function overloading.
*/

var text = '(Funk, funk, funK) We want the Funk (Now if I give you the funk, you gon\' take it) We want the fUnk (Do you want the funk?) by Kendrick Lamar',
    lookingFor = 'funk';

console.log('In the text: ' + text);
console.log('You can find "' + lookingFor + '" with case-INsensitive search: ' + findWord(text, lookingFor, '') + ' times');
console.log('You can find "' + lookingFor + '" with case-SENSITIVE search: ' + findWord(text, lookingFor, 'sensitive') + ' times');

function findWord(text, lookingFor, caseSensitive) {

    var index = 0,
        counter = 0;

    if (!caseSensitive) {
        text = text.toLowerCase();
        lookingFor = lookingFor.toLowerCase();
    }

    while (index != -1) {

        index = text.indexOf(lookingFor, index);

        if (index != -1) {
            index += 1;
            counter += 1;
        }
    }
    return counter;
}

