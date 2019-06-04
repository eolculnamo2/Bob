export default interface ibObject {
  created: (...args: any) => any,
  element: HTMLElement,
  mounted: (...args: any) => any,
  vars: { [keys: string]: any },
}