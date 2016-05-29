/*Find the smallest element, move it at the first position,
 find the smallest from the rest, move it at the second position, etc.*/
function selectionSort() {
    var arr = [33, 41, 7, -7, -6, -2, 57, 131, -23, 124, 1];
    var s = 0;
    console.log(arr.join(', '));

    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                s = arr[j];
                arr[j] = arr[i];
                arr[i] = s;
            }
        }
    }
    console.log(arr.join(', '));
}
selectionSort();
