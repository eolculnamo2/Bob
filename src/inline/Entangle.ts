import iState from '../constants/interfaces/iState';
import iBindingProxy from '../constants/interfaces/iBindingProxy';

class Entangle {
  bindingProxy: iBindingProxy;
  constructor(state: iState) {

  }

  setProxy(state: iState): ProxyConstructor {
    // Create handler to manipulate the default behavior of the
    // the Object's set method.
    const bindingHandler: ProxyHandler<any> = {
      set(obj: {[key: string]: any}, id: string, update: any): any {
        document.getElementById(id).value=update;
        document.getElementById(`${id}-view`).innerText=update;
        obj[id] = update;
      }
    }
    // Create a proxied object from state with the handler.
    return new Proxy(state, bindingHandler);
  }

  // to be refactored with event delegation.
  addListeners(stateValues: Array<string>) {
    stateValues.forEach( x => {
      document.getElementById(x).addEventListener('keyup', e => {
        this.bindingProxy = e.target.value;
        console.log(this.bindingProxy);
      });
    });
  }
}


export default Entangle;
