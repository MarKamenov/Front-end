//Write a function that replaces non breaking white-spaces in a text with &nbsp;
function whiteSpaceEscape(text) {
    'use strict';
    return text.replace(/ /g, '&nbsp;');
}