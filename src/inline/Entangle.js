/*
Named after quantum entanglement. 
This class binds the value of an input and its var in vars
*/
class Entangle {

    constructor(bObject) {
        this.bObject = bObject;
        this.mainDiv =  document.getElementById(bObject.element);
        this.copyDiv = this.mainDiv.innerHTML.slice(0);
        this.updateDOM();
    }

    updateDOM() {
        //Find all inline variables wrapped with {{ }}
        
        //preserve main string for when the dom updates again.

        //returns an array of all vars wrapped with {{ }}
        let indexArray = /(\{{.*?\}})/g.exec(this.copyDiv);

        for(let x of indexArray) {
            let v = x.slice(2, x.length-2).trim();;
            let value = this.bObject.vars[v];
            
            try {
                //replaces HTML with value. Does one at a time to match the index on for loop
                this.mainDiv.innerHTML = this.copyDiv;
                this.mainDiv.innerHTML = this.mainDiv.innerHTML.replace(/(\{{.*?\}})/, value);
            } catch(e) {console.log("Parsing error. See updateDate()")}
            
            this.identifyEntangledInputs();
        }
    }

    identifyEntangledInputs() {
        let inputs =  document.getElementsByTagName('input')

        //nested loop: first loop is all inputs, second loop is all attributes
        //The loop finds elements with the attribute bob-entangle and adds listeners
        Array.prototype.forEach.call(inputs, x => {
            Array.prototype.forEach.call( x.attributes, y => {

                if(y.name === 'bob-entangle'){
                    x.addEventListener('change', e => {
                        this.bObject.vars[y.value] = e.target.value;
                        this.updateDOM();
                    });
                    x.addEventListener('keyup', e => {
                        this.bObject.vars[y.value] = e.target.value;
                        this.updateDOM();
                    });
                }

            });
        });

        let bobEntangles = document.querySelectorAll('bob-entangle')

    }
}

export default Entangle;