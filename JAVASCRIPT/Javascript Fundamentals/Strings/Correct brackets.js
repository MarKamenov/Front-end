/*Write a JavaScript function to check if in a given expression the brackets are put correctly.

Example of correct expression:  ((a+b)/5-d) . Example of incorrect expression:  )(a+b)) .
*/
function countBrackets(expressions) {
    var bracketOpen = '(',
        bracketClose = ')',
        countOpen = 0,
        countClose = 0,
        isCorrect,
        i;
    for (i = 0; i < expressions.length; i += 1) {
        if (expressions[i] === bracketClose) {
            countClose++;
        }
        else if (expressions[i] === bracketOpen) {
            countOpen++;
        }
    }
    isCorrect = countOpen === countClose;
    return console.log('Is the expression corect? ' + isCorrect);
}
countBrackets('`)(a+b)(`(');