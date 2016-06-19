//Write a boolean expression that checks for given integer if it can be divided (without remainder) by 7 and 5 in the same time.
function isDivBy7And5(num) {
    return ((num % 7) && (num % 5)) ? true : false;
}; 
isDivBy7And5(num);//enter a number