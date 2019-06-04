import iState from '../constants/interfaces/iState';
import iProxiedObj from '../constants/interfaces/iProxiedObj';
import { bobEntangle, bobInline } from '../constants/variables/elementAttributes';

class Entangle {
  proxyBindings: Set<iProxiedObj>

  constructor(state: iState) {
    this.proxyBindings = new Set<iProxiedObj>()
    const entangledFields = document.querySelectorAll(`[${bobEntangle}]`);

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

        // Update input
        field.value=update;

        // Update inline variable references
        const inlineVariables = document.querySelectorAll(`[${bobInline}]`);
        Array.prototype.forEach.call(inlineVariables, ((x: HTMLElement) => {
          if(x.getAttribute(bobInline) === field.getAttribute(bobEntangle)) {
            x.innerText = update;
          }
        }));

        // Update state
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
      const { field, proxyBinding} = proxyObj;
      const varName = field.getAttribute(bobEntangle);

      field.addEventListener('keyup', (e: InputEvent) => {
        const target = e.target as HTMLInputElement;
        // @ts-ignore
        proxyBinding[varName] = target.value;
      });
    });

  }
}


export default Entangle;
