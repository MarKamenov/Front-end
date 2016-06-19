/*Write functions for working with shapes in standard Planar coordinate system. ◦ Points are represented by coordinates P(X, Y)
◦ Lines are represented by two points, marking their beginning and ending L(P1(X1,Y1), P2(X2,Y2))

• Calculate the distance between two points.
• Check if three segment lines can form a triangle.
*/
function buildPoint(x, y) {
	return {
		x: x,
		y: y
	};
}
debugger;
function buildLine(point1, point2) {
	return {
		p1: point1,
		p2: point2,
		length: pointDistance(point1, point2)
	};
}

function pointDistance(p1, p2) {
	var dx = p1.x - p2.x;
	var dy = p1.y - p2.y;
	return Math.sqrt(dx * dx + dy * dy);
}

function canBeTriangle(l1, l2, l3){
        if (isNaN(l1) || isNaN(l2) || isNaN(l3)) {
            return false;
        }
        if ((l1 + l2 > l3) && (l2 + l3 > l1) && (l1 + l3 > l2)){
            return true;
        }
        return false;
    }

var p1 = buildPoint(3, 1),
	p2 = buildPoint(2, 1),
	p3 = buildPoint(3, 8),
	p4 = buildPoint(5, 6),
	p5 = buildPoint(4, -4),
	p6 = buildPoint(2, 3);

var l1 = buildLine(p1, p2),
	l2 = buildLine(p3, p4),
	l3 = buildLine(p5, p6);


console.log('l1 length (p1, p2 distance): ' + l1.length);
console.log('l2 length (p3, p4 distance): ' + l2.length);
console.log('l3 length (p5, p6 distance): ' + l3.length);

console.log('l1,l2,l3 can form triangle: ' + canBeTriangle(l1, l2, l3));
console.log('l1,l2,l1 can form triangle: ' + canBeTriangle(l1, l2, l1));
