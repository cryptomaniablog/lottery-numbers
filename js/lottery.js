/********************************************************************
Lottery Number v0.0.1
Copyright Robert Stettner, 2014

A simple application that generates unique random lottery numbers
********************************************************************/

//setting the default settings for the application
var lottery_defaults = {
    quantity: 6,
    min: 1,
    max: 49
};

//generates the lottery numbers (q is quantity of them, default is 6)
function generate_lottery_numbers(q){
    q = q || lottery_defaults.quantity || 6;
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
    return Math.round((Math.random() * (lottery_defaults.max - lottery_defaults.min)) + lottery_defaults.min);
}

//generates the visual output
function generate_html(q){
    var content = document.getElementById("numbers"),
        numbers = generate_lottery_numbers(q),
        num_colours = 5,
        colour_step = Math.round((lottery_defaults.max - lottery_defaults.min)/num_colours),
        item;

    emptyElement(content);

    for(var key in numbers){
        item = document.createElement("li");

        //compares to match range and include classname with according colour
        for(var i=1;i <= num_colours;i++){
            if(numbers[key] < (i * colour_step)){
                item.className = "colour"+i;
                break;
            }
        }

        item.appendChild(document.createTextNode(numbers[key]));
        content.appendChild(item);
    }
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
document.getElementById("q").value = lottery_defaults.quantity || 6;

//event handler for the "generate" button
document.getElementById("generate").onclick = function(){
    var q = document.getElementById("q").value;

    //validate input and see if it is a number, in the range, and a whole number
    if(!isNaN(q) && q >= lottery_defaults.min && q <= lottery_defaults.max && q % 1 === 0){
        generate_html(q);
    }else{
        alert("Input must be a whole number from "+lottery_defaults.min+" to "+lottery_defaults.max);
    }
};