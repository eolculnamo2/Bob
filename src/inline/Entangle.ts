import iState from "../constants/interfaces/iState";

interface EntangleInterface {
  new (state: iState): void;
}

function Entangle(state: iState): EntangleInterface {
  this.setProxy(state);
  return;
}
//bob-entangle is the attribute

Entangle.prototype.setProxy = function(this: any, state: iState): ProxyConstructor {

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

Entangle.prototype.addListeners = function(): void {
  // Add event listener (Console provided to see JS state update)
  // For many elements consider using Event Delegation
  // document.getElementById('name').addEventListener('keyup', e => {
  //   bindingProxy.name = e.target.value;
  //   console.log(bindingProxy);
  // });

}

export default Entangle;





// Test it by changing the state in the JS
// bindingProxy.name="Rob";