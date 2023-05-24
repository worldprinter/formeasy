export function stringify(token: any): string {
  if (typeof token === 'string') {
    return token;
  }

  if (Array.isArray(token)) {
    return '[' + token.map(stringify).join(', ') + ']';
  }

  if (token == null) {
    return '' + token;
  }

  if (token.overriddenName) {
    return `${token.overriddenName}`;
  }

  if (token.name) {
    return `${token.name}`;
  }

  if (!token.toString) {
    return 'object';
  }

  // WARNING: do not try to `JSON.stringify(token)` here
  // see https://github.com/angular/angular/issues/23440
  const res = token.toString();

  if (res == null) {
    return '' + res;
  }

  const newLineIndex = res.indexOf('\n');
  return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}

export type Byte = number;

export function utf8Encode(str: string): Byte[] {
  const encoded: Byte[] = [];
  for (let index = 0; index < str.length; index++) {
    let codePoint = str.charCodeAt(index);

    // decode surrogate
    // see https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    if (codePoint >= 0xd800 && codePoint <= 0xdbff && str.length > index + 1) {
      const low = str.charCodeAt(index + 1);
      if (low >= 0xdc00 && low <= 0xdfff) {
        index++;
        codePoint = ((codePoint - 0xd800) << 10) + low - 0xdc00 + 0x10000;
      }
    }

    if (codePoint <= 0x7f) {
      encoded.push(codePoint);
    } else if (codePoint <= 0x7ff) {
      encoded.push(((codePoint >> 6) & 0x1f) | 0xc0, (codePoint & 0x3f) | 0x80);
    } else if (codePoint <= 0xffff) {
      encoded.push(
        (codePoint >> 12) | 0xe0,
        ((codePoint >> 6) & 0x3f) | 0x80,
        (codePoint & 0x3f) | 0x80
      );
    } else if (codePoint <= 0x1fffff) {
      encoded.push(
        ((codePoint >> 18) & 0x07) | 0xf0,
        ((codePoint >> 12) & 0x3f) | 0x80,
        ((codePoint >> 6) & 0x3f) | 0x80,
        (codePoint & 0x3f) | 0x80
      );
    }
  }

  return encoded;
}
