/********************************************************************
Lottery Number v0.0.1
Copyright Robert Stettner, 2014

A simple application that generates unique random lottery numbers
********************************************************************/

//setting the default settings for the application
var defaults = {
    quantity: 6,
    min: 1,
    max: 49,
    colours: [
        "gray",
        "blue",
        "pink",
        "green",
        "yellow"
    ]
};

//generates the lottery numbers (q is quantity of them, default is 6)
function generate_lottery_numbers(q){
    q = q || defaults.quantity || 6;
    var numbers = [];

    //loop through the quantity of required numbers
    for(var i=0;i < q;i++){
        var j = generate_lottery_number();

        //loop through until finds a unique random number
        for(;numbers.indexOf(j) !== -1;j=generate_lottery_number()); 

        //add the random number to the array
        numbers.push(j);
    }

    //sort the numbers array with numerical comparator
    numbers.sort(function(a, b){return a-b;});
    
    return numbers;
}

//returns a random number from the min to max inclusive
function generate_lottery_number(){
    return Math.round((Math.random() * (defaults.max - defaults.min)) + defaults.min);
}

//generates the visual output
function generate_html(q){
    var numbersElem = document.getElementById("numbers"),
        legendElem = document.getElementById("legend"),
        numbers = generate_lottery_numbers(q),
        colour_step = Math.round((defaults.max - defaults.min)/defaults.colours.length),
        item;

    //empty the numbers and legend DOM elements
    emptyElement(numbersElem);
    emptyElement(legendElem);

    //loop through all the numbers and generate a list item
    for(var key in numbers){
        item = document.createElement("li");
        item.style.backgroundColor = defaults.colours[defaults.colours.length-1];

        //compares to match range and include classname with according colour
        for(var i=0;i < defaults.colours.length;i++){
            var max = (((i+1) * colour_step)-1) + defaults.min - 1;
            if(numbers[key] <= max){
                item.style.backgroundColor = defaults.colours[i];
                break;
            }
        }

        item.appendChild(document.createTextNode(numbers[key]));
        numbersElem.appendChild(item);
    }

    //loop through all the colours for the legend and shows ranges
    for(var i=0;i < defaults.colours.length;i++){
        var min = (i*colour_step) + defaults.min - 1,
            max = i === defaults.colours.length - 1 ? defaults.max : min + (colour_step - 1);
        item = document.createElement("li");
        item.style.backgroundColor = defaults.colours[i];
        item.appendChild(document.createTextNode(min+" to "+max));
        legendElem.appendChild(item);
    }
}

//generate the legend with colours and their determined ranges
function generate_legend(){
    var content = document.getElementById("legend"),
        item;

}

//a function that removes all child nodes from a DOM element
function emptyElement(elem){
    var fc = elem.firstChild;

    while( fc ) {
        elem.removeChild( fc );
        fc = elem.firstChild;
    }
}

//execute the main function
generate_html();

//sets the initial value for the input box to the default quantity
document.getElementById("q").value = defaults.quantity || 6;

//event handler for the "generate" button
document.getElementById("generate").onclick = function(){
    var q = document.getElementById("q").value;

    //validate input and see if it is a number, in the range, and a whole number
    if(!isNaN(q) && q <= (defaults.max - defaults.min + 1) && q % 1 === 0){
        generate_html(q);
    }else{
        alert("Input must be a whole number from 1 to "+(defaults.max - defaults.min + 1));
    }
};