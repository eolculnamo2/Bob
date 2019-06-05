import { Entangle, BindToBobject, ParseInlineReferences} from './inline/index';
import ibObject from './constants/interfaces/ibObject';

class bobIndex {

  bObject: ibObject;

  constructor(bObject: ibObject) {
    this.bObject = bObject;
    // Not using destructured values in some places is intentional
    // as destructured values are clones which can disrupt objects.
    const { created,
            element,
            mounted,
            vars, } = bObject;

    //created hook
    if(created) {
      this.bObject.created();
    }

    // Replace inline references with DOM elements
    new ParseInlineReferences(vars, element);

    // Starts two way data binding.
    new Entangle(vars);

    // Add inline event listeners
    new BindToBobject(this.bObject, this.bObject.funcs);

     //mounted hook
     if(mounted) {
      this.bObject.mounted();
     }
  }
}

export default bobIndex;
