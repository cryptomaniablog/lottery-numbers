/********************************************************************
Lottery Number v0.0.1
Copyright Robert Stettner, 2014

A simple application that generates unique random lottery numbers
********************************************************************/

//setting the default settings for the application
var defaults = {
    quantity: 6,
    bonus_quantity: 1,
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

//generates the lottery numbers (q is quantity of them, b is how many bonus numbers)
function generate_lottery_numbers(q, b){
    q = isNaN(q) ? defaults.quantity : q;
    b = isNaN(b) ? defaults.bonus_quantity : b;
    var numbers = [],
        bonus_numbers = [],
        collection = [];

    //loop through the quantity of required numbers
    for(var i=0;i < q+b;i++){
        var j = generate_lottery_number();

        if(i < q){
            //loop through until finds a unique random number
            for(;numbers.indexOf(j) !== -1;j=generate_lottery_number());

            //add the random number to the regular numbers array
            numbers.push(j);
        }else{
            //create a temporary array and concat both types of numbers together to determine overall uniqueness
            var temp = numbers.concat(bonus_numbers);

            //loop through until finds a unique random number
            for(;temp.indexOf(j) !== -1 && temp.indexOf(j) !== -1;j=generate_lottery_number());

            //add the random number to the bonus numbers array
            bonus_numbers.push(j);
        }
    }

    //sort the arrays with numerical comparator
    numbers.sort(function(a, b){return a-b;});
    bonus_numbers.sort(function(a, b){return a-b;});
    
    //populate the collection
    for(var i=0;i < q+b;i++){
        if(i < q){
            collection[i] = {
                "number": numbers[i],
                "bonus": false
            };
        }else{
            collection[i] = {
                "number": bonus_numbers[i-q],
                "bonus": true
            };
        }
    }

    return collection;
}

//returns a random number from the min to max inclusive
function generate_lottery_number(){
    return Math.round((Math.random() * (defaults.max - defaults.min)) + defaults.min);
}

//generates the visual output
function generate_html(q, b){
    var numbersElem = document.getElementById("numbers"),
        legendElem = document.getElementById("legend"),
        collection = generate_lottery_numbers(q, b),
        colour_step = Math.round((defaults.max - defaults.min)/defaults.colours.length),
        item;

    //empty the numbers and legend DOM elements
    emptyElement(numbersElem);
    emptyElement(legendElem);

    //loop through the whole collection and generate a list item
    for(var key in collection){
        item = document.createElement("li");
        item.style.backgroundColor = defaults.colours[defaults.colours.length-1];

        //compares to match range and include classname with according colour
        for(var i=0;i < defaults.colours.length;i++){
            var max = (((i+1) * colour_step)-1) + defaults.min - 1;
            if(collection[key].number <= max){
                item.style.backgroundColor = defaults.colours[i];
                break;
            }
        }

        item.appendChild(document.createTextNode(collection[key].number));

        //if number is a bonus one, mark it by bordering it
        if(collection[key].bonus){
            item.style.border = "3px dotted black";
        }

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

//sets the initial values for the input boxes
document.getElementById("q").value = defaults.quantity || 6;
document.getElementById("b").value = defaults.bonus_quantity || 1;

//event handler for the "generate" button
document.getElementById("generate").onclick = function(){
    var q = Number(document.getElementById("q").value),
        b = Number(document.getElementById("b").value);

    //validate inputs and see if it is a number, and a whole number
    if(isNaN(q) && q % 1 !== 0){
        alert("Input must be a whole number");
        return false;  
    }
    if(isNaN(b) && b % 1 !== 0){
        alert("Input must be a whole number");
        return false;  
    }
    //validate both values and see if they are in range
    if(q+b > (defaults.max - defaults.min + 1) || q+b < 1){
        alert("Both quantities added must be between 1 and "+(defaults.max - defaults.min + 1));
        return false;
    }

    generate_html(q, b);
};