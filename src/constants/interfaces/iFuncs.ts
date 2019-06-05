export default interface iFuncs {
  funcs: { [keys: string]: (...args: any) => any },
}