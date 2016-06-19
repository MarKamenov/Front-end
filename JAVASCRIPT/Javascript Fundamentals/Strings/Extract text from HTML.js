/*Write a function that extracts the content of a html page given as text.
The function should return anything that is in a tag, without the tags.*/
var text = '<html><head><title>Sample site</title></head><body><div>text<div>more text</div>and more...</div>in body</body></html>';
function extractHTML(text) {
    'use strict';

    var i,
        isTagOpen = true,
        result = '';

    for (i = 0; i < text.length; i += 1) {
        if (text[i] === '<') {
            isTagOpen = true;
        } else if (text[i] === '>') {
            isTagOpen = false;
        } else if (isTagOpen === false) {
            result += text[i];
        }
    }

    return result;
}
