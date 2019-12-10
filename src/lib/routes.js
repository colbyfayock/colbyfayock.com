/**
 * normalizePathname
 */

export function normalizePathname (string) {
  let pathname = string;

  if (typeof pathname !== 'string') return pathname;

  if ( pathname.substr(0,1) !== '/' ) {
    pathname = `/${pathname}`;
  }

  if (pathname.substr(-1) !== '/') {
    pathname = `${pathname}/`;
  }

  return pathname;
}
