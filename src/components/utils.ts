export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];
export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;

function toVal(mix: ClassValue) {
  let str = '';

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (let k=0; k < mix.length; k++) {
        if (mix[k]) {
          const y = toVal(mix[k])
          if (y) {
            str && (str += ' ');
            str += y;
          }
        }
      }
    } else {
      for (const k in mix) {
        if (mix[k]) {
          str && (str += ' ');
          str += k;
        }
      }
    }
  }

  return str;
}

export function clsq(...inputs: ClassValue[]) {
  let i = 0;
  let tmp;
  let str = '';
  while (i < inputs.length) {
    tmp = inputs[i++];
    if (tmp) {
      const x = toVal(tmp)
      if (x) {
        str && (str += ' ');
        str += x
      }
    }
  }
  return str;
}


const toKebabCase = (str: string) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())
export function cssvar(variables: Record<string, any>) {
  let style = '';
  for (const [key, value] of Object.entries(variables)) {
    if (value === null || value === undefined) continue;
    style += `--${toKebabCase(key)}: ${value};`
  }
  if (!style) return {};
  return { style }
}