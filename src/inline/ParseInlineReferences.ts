import iState from '../constants/interfaces/iState';
import { bobInline } from '../constants/variables/elementAttributes';

// @todo replace with JSX

class ParseInlineReferences {
  private referencedVariables: Array<string>;
  private spanFormatted: Array<string>;

  constructor(state: iState, element: HTMLElement) {
    // put all variables into an array
    this.referencedVariables = this.parseVariableNames(element);

    // wrap them in a span with bob-inline attribute
    this.spanFormatted = this.createContainerSpan(state);

    // inject into the dom
    this.insertSpans(element);
  }

  private parseVariableNames(element: HTMLElement): Array<string> {
    const rawNames: Array<string> = element.innerHTML.match(/{{.*}}/g);
    return rawNames.map( x => x.slice(2,x.length-3).trim());
  }

  private createContainerSpan(state: iState): Array<string> {
    return this.referencedVariables.map( x => `<span ${bobInline}="${x}">${state[x]}</span>`)
  }

  private insertSpans(element: HTMLElement) {
    const varsClone: Array<string> = [ ...this.spanFormatted ];

    while(element.innerHTML.match(/{{.*}}/g)) {

      if(varsClone.length) {
        element.innerHTML = element.innerHTML.replace(/{{.*}}/, varsClone[0]);
        varsClone.shift();
      } else {
        throw Error('varsClone length does not match parsing pattern.');
      }

    }
  }


}

export default ParseInlineReferences;
