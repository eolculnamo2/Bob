import { Entangle, ParseInlineReferences} from './inline/index';
import ibObject from './constants/interfaces/ibObject';

class bobIndex {
  //TODO update type according to object as it becomes available.
  bObject: ibObject;

  constructor(bObject: ibObject) {
    this.bObject = bObject;
    const { vars } = bObject;
  //   //created hook
  //   if(this.bObject.created) {
  //     this.bObject.created();
  //   }

    // Replace inline references with DOM elements
    new ParseInlineReferences(vars);

    // Starts two way data binding.
    new Entangle(vars);

  //    //mounted hook
  //    if(this.bObject.mounted) {
  //     this.bObject.mounted();
  //     this.updateValues();
  //    }
  // }
  }
}

export default bobIndex;
