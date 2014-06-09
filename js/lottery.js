/********************************************************************
Lottery Number v0.0.1
Copyright Robert Stettner, 2014

A simple application that generates unique random lottery numbers
********************************************************************/

defaultQuantity = 6;


//generates the lottery numbers (q is quantity of them, default is 6)
function generate_lottery_numbers(q){
    q = q || defaultQuantity || 6;
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

//returns a random number from 1 to 49 inclusive
function generate_lottery_number(){
    return Math.round((Math.random() * 48) + 1);
}

//generates the visual output
function generate_html(q){
    var content = document.getElementById("numbers"),
        numbers = generate_lottery_numbers(q),
        item;

    emptyElement(content);

    for(var key in numbers){
        item = document.createElement("li");

        //compares to match range and include classname with according colour
        if(numbers[key] < 10){
            item.className = "gray";
        }else if(numbers[key] < 20){
            item.className = "blue";
        }else if(numbers[key] < 30){
            item.className = "pink";
        }else if(numbers[key] < 40){
            item.className = "green";
        }else if(numbers[key] < 50){
            item.className = "yellow";
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
document.getElementById("q").value = defaultQuantity || 6;

//event handler for the "generate" button
document.getElementById("generate").onclick = function(){
    var q = document.getElementById("q").value;
    
    //validate input and see if it is a number, in the range, and a whole number
    if(!isNaN(q) && q > 0 && q < 50 && q % 1 === 0){
        generate_html(q);
    }else{
        alert("Input must be a whole number from 1 to 49");
    }
};