import { toKebabCase, toPascalCase } from '../../utils/string-converters.js';

export function getModuleAliasName(schemaName: string) {
  const moduleName = getModuleName(schemaName);
  return toPascalCase(moduleName);
}

export function getModuleName(schemaName: string) {
  const paths = schemaName.split('`').shift()!.split('.');
  paths.pop();

  return toKebabCase(paths.join('.'));
}

export function getContractName(schemaName: string): string {
  const generics = schemaName.split('`');
  const name = generics.shift()!.split('.').pop()!;

  if (name === '') {
    throw 'Incorrect scheme name';
  }

  generics.unshift(name);

  return generics
    .join('_')
    .replace(/,/g, '_')
    .replace(/\]/g, '')
    .replace(/\[/g, 'Of')
    .replace(/\./g, '')
    .replace(/\+/g, '');
}
