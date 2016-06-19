//Write an expression that checks if given positive integer number n (n ≤ 100) is prime.
function isPrime(num) {
    if (isNaN(num) || num <= 0 || num > 100) {
        return "Invalid number";
    }

    var n = Math.sqrt(num);
    for (var i = 2; i <= n; i++) {
        if (!(num % i)) {
            return false;
        }
    }
    return true;
}
isPrime(); //enter number