/*Write a script that finds the maximal increasing sequence in an array*/
var seq = [3, 2, 3, 4, 2, 2, 4];

console.log(maxIncrSeq(seq).join(', '));

function maxIncrSeq(arr) {
    var bestNum = [arr[0]],
		tmp = [arr[0]];

    for (var i = 1; i < arr.length; i+=1) {
        if (arr[i] > arr[i - 1]) {
            tmp.push(arr[i]);
        } else {
            tmp = [arr[i]];
        }

        if (tmp.length > bestNum.length) {
            bestNum = tmp;
        }
    }

    return bestNum;
}
