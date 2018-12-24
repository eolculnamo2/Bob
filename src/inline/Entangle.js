/*
Named after quantum entanglement. 
This class binds the value of an input and its var in vars
*/

/*
 * Get list of dynamic elements
 * Update them only
 */
class Entangle {

    constructor(bObject) {
        this.bObject = bObject;
        this.mainDiv =  document.getElementById(bObject.element);
        this.copyDiv = this.mainDiv.innerHTML;
        this.reactiveInputs = [];
        this.updateDOM();
        this.prepReactivity();
    }

    prepReactivity() {
        //get all inputs with bob-entangle attribute and add to list 
        //to check when input updates

        //inputs
        const allInps = document.getElementsByTagName('INPUT');
        Array.prototype.forEach.call(allInps, (x,i) => {
            if(x.getAttribute('bob-entangle')) {
                this.reactiveInputs.push(x);
            }
        })
    }

    updateDOM() {
        //Find all inline variables wrapped with {{ }}
        
        //preserve main string for when the dom updates again.

        //returns an array of all vars wrapped with {{ }}
        //let indexArray = /(\{{.*?\}})/g.exec(this.copyDiv);
        let indexArray = this.copyDiv.match(/(\{{.*?\}})/g);
        for(let x of indexArray) {
            let v = x.slice(2, x.length-2).trim();;
            let value = this.bObject.vars[v];
            try {
                //replaces HTML with value. Does one at a time to match the index on for loop
                this.mainDiv.innerHTML = this.copyDiv;
                this.mainDiv.innerHTML = this.mainDiv.innerHTML.replace(/(\{{.*?\}})/, "<div id='bobjs-id-element-"+v+"'>"+ value+"</div>");
            } catch(e) {console.log("Parsing error. See updateDate()")}
            
            this.identifyEntangledInputs();
        }
    }

    identifyEntangledInputs() {
        let inputs =  document.getElementsByTagName('input')
        const self = this;

        const updateDOMValues = elementValue => {
            self.reactiveInputs.forEach( inp => {
                let entangleName = inp.getAttribute('bob-entangle');
                if(entangleName === elementValue) {
                    console.log(entangleName+" "+elementValue)
                    document.getElementById('bobjs-id-element-'+entangleName).innerHTML = inp.value;
                }
            })
        }

        //nested loop: first loop is all inputs, second loop is all attributes
        //The loop finds elements with the attribute bob-entangle and adds listeners
        Array.prototype.forEach.call(inputs, x => {
            Array.prototype.forEach.call( x.attributes, y => {
 
                if(y.name === 'bob-entangle'){
                    x.addEventListener('change', e => {
                        this.bObject.vars[y.value] = e.target.value;
                        updateDOMValues(y.value);
                    });
                    x.addEventListener('keyup', e => {
                        this.bObject.vars[y.value] = e.target.value;
                        updateDOMValues(y.value);
                    });
                }

            });
        });
    }
}

export default Entangle;