import { getModuleAliasName } from './names-template.js';

export function makeImport(moduleName: string, schemaName: string) {
  return `import * as ${getModuleAliasName(schemaName)} from './${moduleName}';\n`;
}

export function makeExport(moduleName: string) {
  return `export * from './${moduleName}';\n`;
}
