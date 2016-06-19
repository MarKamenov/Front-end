//Write an expression that checks for given integer if its third digit (right-to-left) is 7.
function trdDigIs7(number){
    return (Math.floor(number / 100) % 10) === 7  ? '7 is the third digit' : '7 isn\'t the third digit';
}
trdDigIs7();//enter a number