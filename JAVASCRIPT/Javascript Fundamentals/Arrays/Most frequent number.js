//Write a script that finds the most frequent number in an array. 
function mostFreq() {
    var arr = [9, 1, 3, 4, 2, 3, 4, 5, 4, 4, 4, 3];
    var freqNum;
    var currentCount = 1;
    var count = 0;

    for (var i = 0; i < arr.length; i+=1) {
		debugger;
        for (var j = i + 1; j < arr.length; j+=1) {
            if (arr[i] === arr[j]) {
                currentCount+=1;
            }
        }
        if (currentCount > count) {
            count = currentCount;
            freqNum = arr[i];
        }
        currentCount = 1;
    }
    console.log('Most frequent number: ' + freqNum + '(' + count + ' times)');
}
 mostFreq();