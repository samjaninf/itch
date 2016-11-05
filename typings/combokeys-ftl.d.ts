
interface ComboKeysStatic {
  new(el: Element): ComboKeysStatic;

  bindGlobal(keys: string[], cb: () => void): void;
}

declare module 'combokeys-ftl' {
  var ck: ComboKeysStatic;
  export = ck;
}

interface ComboKeysGlobalBindStatic {
  (ck: ComboKeysStatic): void;
}

declare module 'combokeys-ftl/plugins/global-bind' {
  var ckgb: ComboKeysGlobalBindStatic;
  export = ckgb;
}