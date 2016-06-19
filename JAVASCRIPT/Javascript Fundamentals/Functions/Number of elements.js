//Write a function to count the number of  div  elements on the web page
function divsNum() {
    var divs = document.getElementsByTagName('div').length;
    console.log(divs);
}

divsNum();