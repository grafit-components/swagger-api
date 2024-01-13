export function toKebabCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function toCamelCase(str: string) {
  return str[0].toLowerCase() + str.slice(1);
}

export function toPascalCase(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
