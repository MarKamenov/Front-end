/*Write a script that asks for a digit (0-9), and depending on the input, shows the digit as a word (in English).
Print “not a digit” in case of invalid input.
Use a switch statement.*/

function parseDigit (digit) {
    switch (digit) {
        case 0:
            return 'zero'; break;
        case 1:
            return 'one';break;
        case 2:
            return 'two';break;
        case 3:
            return 'three';break;
        case 4:
            return 'four';break;
        case 5:
            return 'five';break;
        case 6:
            return 'six';break;
        case 7:
            return 'seven';break;
        case 8:
            return 'eight';break;
        case 9:
            return 'nine';break;
        default:
            return 'not a digit';
    }
};
parseDigit(); //enter a number//