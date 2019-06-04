import { Entangle, ParseInlineReferences} from './inline/index';
import ibObject from './constants/interfaces/ibObject';

class bobIndex {

  bObject: ibObject;

  constructor(bObject: ibObject) {
    this.bObject = bObject;
    const { element, vars } = bObject;

    // Replace inline references with DOM elements
    new ParseInlineReferences(vars, element);

    // Starts two way data binding.
    new Entangle(vars);
  }
}

export default bobIndex;
