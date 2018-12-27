import Entangle from './inline/Entangle';

class bobIndex {
    constructor(bObject) {
        this.bObject = bObject;
        this.updateValues = this.updateValues;

        //created hook
        if(this.bObject.created) {
            this.bObject.created();
        }
        
        new Entangle(this.bObject); //two way data binding

         //mounted hook
         if(this.bObject.mounted) {
            this.bObject.mounted();
            this.updateValues();
         }
    }

    updateValues() {
        for(let x in this.bObject.vars) {
            document.getElementById('bobjs-id-element-'+x).innerHTML = this.bObject.vars[x]
        }
    }
}

export default bobIndex;