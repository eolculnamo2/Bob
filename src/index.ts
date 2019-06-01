import Entangle from './inline/Entangle';
import ibObject from './constants/interfaces/ibObject';

class bobIndex {
  //TODO update type according to object as it becomes available.
  bObject: ibObject;

  constructor(bObject: ibObject) {
    this.bObject = bObject;
    // /this.updateValues = this.updateValues;

  //   //created hook
  //   if(this.bObject.created) {
  //     this.bObject.created();
  //   }

    // Starts two way data binding.
    new Entangle(bObject.vars);

  //    //mounted hook
  //    if(this.bObject.mounted) {
  //     this.bObject.mounted();
  //     this.updateValues();
  //    }
  // }
  }
}

export default bobIndex;
