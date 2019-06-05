import iState from './iState';
import iFuncs from './iFuncs';

export default interface ibObject {
  created: (...args: any) => any,
  element: HTMLElement,
  funcs: iFuncs,
  mounted: (...args: any) => any,
  vars: iState,
}