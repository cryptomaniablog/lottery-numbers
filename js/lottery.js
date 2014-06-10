/********************************************************************
Lottery Number v0.0.2
Copyright Robert Stettner, 2014

A simple application that generates unique random lottery numbers
********************************************************************/

//the Lottery constructor
var Lottery = function(options){
    options = options || {};

    //extend the options with defaults
    for (var opt in this.defaults){
        if (this.defaults.hasOwnProperty(opt) && !options.hasOwnProperty(opt)){
            options[opt] = this.defaults[opt];
        }
    }
    this.options = options;

    //generate and render when auto-generation is set to true
    if(this.options.auto_gen){
        this.generateNumbers();

        //check to see if DOM is ready
        if(typeof window.domready === "function"){
            window.domready(this.onDOMReady.bind(this));
        }else if(window.jQuery && typeof window.jQuery.ready === "function"){
            window.jQuery(document).ready(this.onDOMReady.bind(this));
        }else{
            console.error("Error: cannot render before DOM is ready");
        }     
    }
}

Lottery.prototype = {
    constructor: Lottery,
    defaults: { //setting the default settings and the global collection for the application
        q: 6,   //base number quantity
        b: 0,   //bonus number quantity
        min: 1,
        max: 49,
        colours: [
            "gray",
            "blue",
            "pink",
            "green",
            "yellow"
        ],
        element: {
            form: "form",
            number_list: "#numbers",
            legend: "#legend",
            probability_table: "#prob"
        }
    },
    collection: [],
    probabilities: [],
    //method that generates the lottery numbers (q is quantity of them, b is how many bonus numbers)
    generateNumbers: function(){
        var numbers = [],
            bonus_numbers = [];

        //reset the collection
        this.collection = [];

        //loop through the quantity of required numbers
        for(var i=0;i < this.options.q+this.options.b;i++){
            var j = this.generateNumber();

            if(i < this.options.q){
                //loop through until finds a unique random number
                for(;numbers.indexOf(j) !== -1;j=this.generateNumber());

                //add the random number to the regular numbers array
                numbers.push(j);
            }else{
                //create a temporary array and concat both types of numbers together to determine overall uniqueness
                var temp = numbers.concat(bonus_numbers);

                //loop through until finds a unique random number
                for(;temp.indexOf(j) !== -1 && temp.indexOf(j) !== -1;j=this.generateNumber());

                //add the random number to the bonus numbers array
                bonus_numbers.push(j);
            }
        }

        //sort the arrays with numerical comparator
        numbers.sort(function(a, b){return a-b;});
        bonus_numbers.sort(function(a, b){return a-b;});
        
        //populate the collection
        for(var i=0;i < this.options.q+this.options.b;i++){
            if(i < this.options.q){
                this.collection[i] = {
                    "number": numbers[i],
                    "bonus": false
                };
            }else{
                this.collection[i] = {
                    "number": bonus_numbers[i-this.options.q],
                    "bonus": true
                };
            }
        }

        //calculate probabilities
        this.calculateProbabilities();
    },
    //method that returns a random number from the min to max inclusive
    generateNumber: function(){
        return Math.round((Math.random() * (this.options.max - this.options.min)) + this.options.min);
    },
    render: function(){
        var elem = document.querySelector(this.options.element.number_list);

        if(!!elem){
            //empty the numbers DOM elements
            this.emptyElement(elem);

            //loop through the whole collection and generate a list item
            for(var key in this.collection){
                var item = document.createElement("li");
                item.setAttribute("name", this.collection[key].number.toString());
                item.appendChild(document.createTextNode(this.collection[key].number));

                //if number is a bonus one, mark it by bordering it
                if(this.collection[key].bonus){
                    item.style.border = "3px dotted black";
                }

                elem.appendChild(item);
            }

            this.applyColours();
        }

        this.generateLegend();
        this.renderProbabilities();
    },
    applyColours: function(){
        var colour_step = Math.round((this.options.max - this.options.min)/this.options.colours.length);

        for(var key in this.collection){
            var elems = document.getElementsByName(this.collection[key].number.toString());
            
            if(elems.length > 0){
                elems[0].style.backgroundColor = this.options.colours[this.options.colours.length-1];

                //compares to match range and include classname with according colour
                for(var i=0;i < this.options.colours.length;i++){
                    var max = (((i+1) * colour_step)-1) + this.options.min - 1;
                    if(this.collection[key].number <= max){
                        elems[0].style.backgroundColor = this.options.colours[i];
                        break;
                    }
                }
            }
        }
    },

    //generate the legend with colours and their determined ranges
    generateLegend: function(){
        var elem = document.querySelector(this.options.element.legend);
        
        if(!!elem){
            var colour_step = Math.round((this.options.max - this.options.min)/this.options.colours.length);

            //empty the legend DOM elements
            this.emptyElement(elem);

            //loop through all the colours for the legend and shows ranges
            for(var i=0;i < this.options.colours.length;i++){
                var min = (i*colour_step) + this.options.min - 1,
                    max = i === this.options.colours.length - 1 ? this.options.max : min + (colour_step - 1),
                    item = document.createElement("li");
                item.style.backgroundColor = this.options.colours[i];
                item.appendChild(document.createTextNode(min+" to "+max));
                elem.appendChild(item);
            }
        }
    },
    //render the probabilities table
    renderProbabilities: function(){
        var elem = document.querySelector(this.options.element.probability_table);

        if(!!elem){
            //empty the legend DOM elements
            this.emptyElement(elem);

            //loop through all the colours for the legend and shows ranges
            for(var i=0;i < this.probabilities.length;i++){
                var row = document.createElement("tr"),
                    cell = document.createElement("td");
                cell.appendChild(document.createTextNode(i));
                row.appendChild(cell);
                cell = document.createElement("td");
                cell.appendChild(document.createTextNode(this.probabilities[i].toPrecision(4)));
                row.appendChild(cell);
                cell = document.createElement("td");
                cell.appendChild(document.createTextNode(1/this.probabilities[i] % 1 !== 0 ? (1/this.probabilities[i]).toPrecision(7) : 1/this.probabilities[i]));
                row.appendChild(cell);
                elem.appendChild(row);
            }
        }
    },

    //method that removes all child nodes from a DOM element
    emptyElement: function(elem){
        if(elem){
            var fc = elem.firstChild;

            while( fc ) {
                elem.removeChild( fc );
                fc = elem.firstChild;
            }
        }
    },

    //mathematical method to determine combination nCr
    nCr: function(n, r){
        var f=1, f1, f2, r1, res;

        for(var i=1;i<=n;i++){
            f = f * i;
        } 
         
        r1 = n - r;
        f1 = 1;
        for(i=1;i<=r;i++){
            f1 = f1 * i;
        }
        f2 = 1;
        for(i=1;i<=r1;i++){
            f2 = f2 * i;
        }
        res = f / (f1 * f2);

        return Math.round(res*Math.pow(10,2))/Math.pow(10,2);
    },

    //method that calculates probabilities of scoring
    calculateProbabilities: function(){
        //reset the probabilities array
        this.probabilities = [];

        for(var s=0;s <= this.options.q;s++){
            this.probabilities.push(this.nCr(this.options.q, s) * this.nCr(((this.options.max - this.options.min) + 1) - this.options.q, this.options.q-s) / this.nCr((this.options.max - this.options.min) + 1, this.options.q));
        }
    },

    onClickGenerate: function(e){
        e.preventDefault();
        var form = {};

        for (var opt in this.options){
            var elem = document.querySelector('#'+opt) || document.querySelector('[name="'+opt+']');
            if(!!elem){
                form[opt] = Number(elem.value);
            }
        }

        //validate inputs and see if it is a number, and a whole number
        if(isNaN(form.q) || form.q % 1 !== 0){
            alert("Base number quantity must be a whole number");
            return false;  
        }
        if(isNaN(form.b) || form.b % 1 !== 0){
            alert("Bonus number quantity must be a whole number");
            return false;  
        }
        if(isNaN(form.max) || (form.max % 1) !== 0 || form.max <= this.options.min){
            alert("Maximum range must be a whole number and greater than 1");
            return false;  
        }
        this.options.max = form.max;
        
        //validate both values and see if they are in range
        if(form.q+form.b > (this.options.max - this.options.min + 1) || form.q+form.b < 1){
            alert("Both quantities added, must be between 1 and "+(this.options.max - this.options.min + 1));
            return false;
        }
        this.options.q = form.q;
        this.options.b = form.b;

        this.generateNumbers();
        this.render();
    },
    onDOMReady: function(){
        //bind generation method to form submission only if form exists
        var form = document.querySelector(this.options.element.form || "form");
        if(!!form){
            form.onsubmit = this.onClickGenerate.bind(this);
        }

        //sets the initial values for the input boxes
        for (var opt in this.options){
            var elem = document.querySelector('#'+opt) || document.querySelector('[name="'+opt+'"]');
            if(!!elem){
                elem.value = this.options[opt];
            }
        }

        this.render();
    }
};