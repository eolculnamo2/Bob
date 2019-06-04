import { Entangle, ParseInlineReferences} from './inline/index';
import ibObject from './constants/interfaces/ibObject';

class bobIndex {

  bObject: ibObject;

  constructor(bObject: ibObject) {
    this.bObject = bObject;
    const { created,
            element,
            mounted,
            vars, } = bObject;

    //created hook
    if(created) {
      created();
    }

    // Replace inline references with DOM elements
    new ParseInlineReferences(vars, element);

    // Starts two way data binding.
    new Entangle(vars);

     //mounted hook
     if(mounted) {
      mounted();
     }
  }
}

export default bobIndex;
