import iFuncs from "../constants/interfaces/iFuncs";
import ibObject from "../constants/interfaces/ibObject";

/**
 * @note binds values to bObject so that dev can use this rather than this.value.bind or this.value.call
 * @todo Add creaeted and mounted
 */

class BindToBobject {
  constructor(bObject: ibObject, funcs: iFuncs) {
    Object.values(funcs).forEach( func => func.bind(bObject) );
  }
}

export default BindToBobject;
