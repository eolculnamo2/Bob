import Entangle from './inline/Entangle';

class bobIndex {
    constructor(bObject) {
        this.bObject = bObject;
        this.entangle = new Entangle(this.bObject);
    }
}

export default bobIndex;