/*Write a script that shows the sign (+, - or 0) of the product
 of three real numbers, without calculating it.
Use a sequence of if operators.*/

    function multiSign(a, b, c) {
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        return 'NaN';
    }
    if ((a === 0) || (b === 0) || (c === 0)) {
        return '0';
    }
    if ((a > 0 && b > 0 && c > 0) || (a > 0 && b < 0 && c < 0) || (a < 0 && b > 0 && c < 0) || (a < 0 && b < 0 && c > 0)) {
        return '+';
    }
    else {
        return '-';
    }
};
multiSign(); //enter numbers//