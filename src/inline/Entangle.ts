import iState from '../constants/interfaces/iState';
import iProxiedObj from '../constants/interfaces/iProxiedObj';

class Entangle {
  proxyBindings: Set<iProxiedObj>

  constructor(state: iState) {
    this.proxyBindings = new Set<iProxiedObj>()
    const entangledFields = document.querySelectorAll('[bob-entangle]');

    // Each field has its setter manipulated and push to proxyBindings.
    entangledFields.forEach((field: HTMLInputElement) => {
      this.proxyBindings.add(this.setProxy(state, field));
    });

    // Add listener for each binding (To be refactored with event delegation)
    this.addListeners(this.proxyBindings);

  }

  // Returns manipulated setter for bob-entangle element and associated field.
  setProxy(state: iState, field: HTMLInputElement): iProxiedObj {
    const bindingHandler: ProxyHandler<any> = {
      set(obj: {[key: string]: any}, id: string, update: any): any {
        field.value=update;
        // @todo add inline references to variables ->
        // document.getElementById(`${id}-view`).innerText=update;
        obj[id] = update;
      }
    }
    return {
      proxyBinding: new Proxy(state, bindingHandler),
      field,
    };
  }

  // to be refactored with event delegation..
  // Will also consider moving to a separate listeners class.
  addListeners(stateValues: Set<iProxiedObj>) {

    stateValues.forEach((proxyObj: iProxiedObj) => {
      proxyObj.field.addEventListener('keyup', (e: InputEvent) => {
        proxyObj.proxyBinding = e.target.value;
      });
    });

  }
}


export default Entangle;
