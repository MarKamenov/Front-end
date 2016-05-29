/*Write an expression that calculates trapezoid's area
 by given sides a and b and height h.*/
function trapArea(a, b, h) {
    if (isNaN(a) || isNaN(b) || isNaN(h)) {
        return null;
    }
    return ((a + b) / 2) * h;
}
trapArea(); // enter numbers