describe("Lottery numbers", function() {
    describe("with auto-generation enabled:", function() {
        describe("the 'Lottery' constructor", function() {
            it("should call its prototype's 'generateNumbers'", function() {
                spyOn(Lottery.prototype, 'generateNumbers');  //.andCallThrough();
                var lottery = new Lottery({auto_gen: true});
                expect(lottery.generateNumbers).toHaveBeenCalled();
            });
            it("should call its prototype's 'render'", function() {
                spyOn(Lottery.prototype, 'render');  //.andCallThrough();
                var lottery = new Lottery({auto_gen: true});
                expect(lottery.render).toHaveBeenCalled();
            });
        });
        describe("the 'collection' property", function() {
            beforeEach(function() {
                lottery = new Lottery({auto_gen: true});
            });
            it("should be defined", function() {
                expect(lottery.collection).toBeDefined();
            });
            it("should be an array", function() {
                expect(lottery.collection).toEqual(jasmine.any(Array));
            });
            it("should have more than one element", function() {
                expect(lottery.collection.length).toBeGreaterThan(1);
            });
            afterEach(function() {
                delete lottery;
            });
        });
    });
    describe("with auto-generation disabled:", function() {
        describe("the 'Lottery' constructor", function() {
            it("should not call its prototype's 'generateNumbers'", function() {
                spyOn(Lottery.prototype, 'generateNumbers');
                var lottery = new Lottery();
                expect(lottery.generateNumbers).not.toHaveBeenCalled();
            });
            it("should not call its prototype's render", function() {
                spyOn(Lottery.prototype, 'render');
                var lottery = new Lottery();
                expect(lottery.render).not.toHaveBeenCalled();
            });
        });
        describe("the 'collection' property", function() {
            beforeEach(function() {
                lottery = new Lottery();
            });
            it("should be defined", function() {
                expect(lottery.collection).toBeDefined();
            });
            it("should be an array", function() {
                expect(lottery.collection).toEqual(jasmine.any(Array));
            });
            it("should be empty", function() {
                expect(lottery.collection.length).toEqual(0);
            });
            afterEach(function() {
                delete lottery;
            });
        });
    });
    describe("when generating numbers:", function() {
        beforeEach(function() {
            lottery = new Lottery();
        });
        describe("with 1 to 49 range, 6 base and no bonus numbers", function() {
            beforeEach(function() {
                lottery.options.q = 6;
                lottery.options.b = 0;
                lottery.generateNumbers();
            });
            describe("the 'collection' property", function() {
                it("should be defined", function() {
                    expect(lottery.collection).toBeDefined();
                });
                it("should be an array", function() {
                    expect(lottery.collection).toEqual(jasmine.any(Array));
                });
                it("should have 6 elements", function() {
                    expect(lottery.collection.length).toEqual(6);
                });
                describe("element values should all", function() {
                    it("be defined as object literals", function() {
                        var test = true;
                        for(var key in lottery.collection){
                            if(Object.prototype.toString.call( lottery.collection[key] ) !== '[object Object]'){
                                test = false;
                                break;
                            }
                        }
                        expect(test).toBe(true);
                    });
                    it("have 'number' and 'bonus' properties in their objects", function() {
                        var test = true;
                        for(var key in lottery.collection){
                            if(typeof lottery.collection[key].number === "undefined" || typeof lottery.collection[key].bonus === "undefined"){
                                test = false;
                                break;
                            }
                        }
                        expect(test).toBe(true);
                    });
                    it("have the 'number' property values as whole integers in their objects", function() {
                        var test = true;
                        for(var key in lottery.collection){
                            if(typeof lottery.collection[key].number !== "number" || lottery.collection[key].number % 1 !== 0){
                                test = false;
                                break;
                            }
                        }
                        expect(test).toBe(true);
                    });
                    it("have the 'number' property values unique from one another", function() {
                        var arr = [];
                        for(var key in lottery.collection){
                            arr.push(lottery.collection[key].number);
                        }
                        function checkIfArrayIsUnique(arr) {
                            var map = {}, i, size;
                            for (i = 0, size = arr.length; i < size; i++){
                                if (map[arr[i]]){
                                    return false;
                                }
                                map[arr[i]] = true;
                            }
                            return true;
                        }
                        
                        expect(checkIfArrayIsUnique(arr)).toBe(true);
                    });
                    it("have the 'number' property values sorted in ascending order", function() {
                        var test = true;
                        for(var i=1;i < lottery.collection.length;i++){
                            if(lottery.collection[i-1].number >= lottery.collection[i].number){
                                test = false;
                                break;
                            }
                        }
                        expect(test).toBe(true);
                    });
                    it("have the 'bonus' property values as booleans in their objects", function() {
                        var test = true;
                        for(var key in lottery.collection){
                            if(typeof lottery.collection[key].bonus !== "boolean"){
                                test = false;
                                break;
                            }
                        }
                        expect(test).toBe(true);
                    });
                    it("have the 'bonus' property values set to false in their objects", function() {
                        var test = true;
                        for(var key in lottery.collection){
                            if(lottery.collection[key].bonus === true){
                                test = false;
                                break;
                            }
                        }
                        expect(test).toBe(true);
                    });
                });
            });
            describe("the 'probabilities' property", function() {
                it("should be defined", function() {
                    expect(lottery.probabilities).toBeDefined();
                });
                it("should be an array", function() {
                    expect(lottery.probabilities).toEqual(jasmine.any(Array));
                });
                it("should have 7 elements", function() {
                    expect(lottery.probabilities.length).toEqual(7);
                });
                it("should have all elements with number values", function() {
                    var test = true;
                    for(var i in lottery.probabilities){
                        if(typeof lottery.probabilities[i] !== "number"){
                            test = false;
                            break;
                        }
                    }
                    expect(test).toBe(true);
                });
                it("should have the last element's value equal to 1/13983816", function() {
                    expect(lottery.probabilities[lottery.probabilities.length-1]).toEqual(1/13983816);
                });
            });
        });
        describe("with 1 to 2 range, 1 base and no bonus numbers", function() {
            beforeEach(function() {
                lottery.options.max = 2;
                lottery.options.q = 1;
                lottery.options.b = 0;
                lottery.generateNumbers();
            });
            describe("the 'collection' property", function() {
                it("should be defined", function() {
                    expect(lottery.collection).toBeDefined();
                });
                it("should be an array", function() {
                    expect(lottery.collection).toEqual(jasmine.any(Array));
                });
                it("should have 1 element", function() {
                    expect(lottery.collection.length).toEqual(1);
                });
                describe("element values should all", function() {
                    it("be defined as object literals", function() {
                        var test = true;
                        for(var key in lottery.collection){
                            if(Object.prototype.toString.call( lottery.collection[key] ) !== '[object Object]'){
                                test = false;
                                break;
                            }
                        }
                        expect(test).toBe(true);
                    });
                    it("have 'number' and 'bonus' properties in their objects", function() {
                        var test = true;
                        for(var key in lottery.collection){
                            if(typeof lottery.collection[key].number === "undefined" || typeof lottery.collection[key].bonus === "undefined"){
                                test = false;
                                break;
                            }
                        }
                        expect(test).toBe(true);
                    });
                    it("have the 'number' property values as whole integers in their objects", function() {
                        var test = true;
                        for(var key in lottery.collection){
                            if(typeof lottery.collection[key].number !== "number" || lottery.collection[key].number % 1 !== 0){
                                test = false;
                                break;
                            }
                        }
                        expect(test).toBe(true);
                    });
                    it("have the 'number' property values unique from one another", function() {
                        var arr = [];
                        for(var key in lottery.collection){
                            arr.push(lottery.collection[key].number);
                        }
                        function checkIfArrayIsUnique(arr) {
                            var map = {}, i, size;
                            for (i = 0, size = arr.length; i < size; i++){
                                if (map[arr[i]]){
                                    return false;
                                }
                                map[arr[i]] = true;
                            }
                            return true;
                        }
                        
                        expect(checkIfArrayIsUnique(arr)).toBe(true);
                    });
                    it("have the 'bonus' property values as booleans in their objects", function() {
                        var test = true;
                        for(var key in lottery.collection){
                            if(typeof lottery.collection[key].bonus !== "boolean"){
                                test = false;
                                break;
                            }
                        }
                        expect(test).toBe(true);
                    });
                    it("have the 'bonus' property values set to false in their objects", function() {
                        var test = true;
                        for(var key in lottery.collection){
                            if(lottery.collection[key].bonus === true){
                                test = false;
                                break;
                            }
                        }
                        expect(test).toBe(true);
                    });
                });
            });
            describe("the 'probabilities' property", function() {
                it("should be defined", function() {
                    expect(lottery.probabilities).toBeDefined();
                });
                it("should be an array", function() {
                    expect(lottery.probabilities).toEqual(jasmine.any(Array));
                });
                it("should have 2 elements", function() {
                    expect(lottery.probabilities.length).toEqual(2);
                });
                it("should have all elements with number values", function() {
                    var test = true;
                    for(var i in lottery.probabilities){
                        if(typeof lottery.probabilities[i] !== "number"){
                            test = false;
                            break;
                        }
                    }
                    expect(test).toBe(true);
                });
                it("should have all element values equal to 1/2", function() {
                    var test = true;
                    for(var i in lottery.probabilities){
                        if(lottery.probabilities[i] !== 1/2){
                            test = false;
                            break;
                        }
                    }
                    expect(test).toBe(true);
                });
            });
        });
        afterEach(function() {
            delete lottery;
        });
    });
});