/*Write a script that finds the index of given element in a sorted array
 of integers by using the binary search algorithm*/
function binarySearch() {
    var arr = [2, -4, 3, 5, 5, 8, 9, 18, 10, -1];
    arr.sort(orderBy);
    console.log(arr.join(', '));

    var key = 8;
    var imin = 0;
    var imax = arr.length - 1;
    var imid = 0;

  function orderBy(a, b) {
    return a - b;
}
  
    while (imax >= imin) {
        imid = Math.floor((imax + imin) / 2);
        if (key == arr[imid]) {
            break;
        } else if (key > arr[imid]) {
            imin = imid + 1;
        } else {
            imax = imid - 1;
        }
    }
    console.log('Index of the given element ' + key + ' is :' + imid);

}
binarySearch();
