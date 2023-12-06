import { OpenAPIV3 } from 'openapi-types';
import { makeContract } from '../templates/contract-template.js';
import { toKebabCase } from '../utils/string-converters.js';

export function makeContracts(document: OpenAPIV3.Document) {
  if (!document.components?.schemas) {
    throw Error('Components not contains in schemas');
  }
  const schemas = document.components.schemas;

  const schemaNames = Object.keys(schemas);
  const contracts: Contracts = {
    importsAll: '',
    modules: [],
  };

  const modulesRaw = schemaNames.reduce(
    (modules, schemaName) => {
      const moduleName = getModuleName(schemaName);

      const module = modules.find((m) => m?.name === moduleName);
      if (module) {
        module.schemaNames.push(schemaName);
      } else {
        modules.push({
          name: moduleName,
          schemaNames: [schemaName],
        });
        contracts.importsAll += makeImport(moduleName, schemaName);
      }
      return modules;
    },
    [] as { name: string; schemaNames: string[] }[],
  );

  modulesRaw.forEach((moduleRaw) => {
    const makeRef = makeRefBuilder(moduleRaw.name);
    const module: Module = {
      name: moduleRaw.name,
      content: contracts.importsAll,
    };

    moduleRaw.schemaNames.forEach((schemaName) => {
      module.content += makeContract(
        schemas[schemaName],
        makeRef,
        getContractName(schemaName),
      );
    });

    contracts.modules.push(module);
  });

  return contracts;
}

function makeRefBuilder(
  moduleName: string,
): (component: OpenAPIV3.ReferenceObject) => string {
  return (component: OpenAPIV3.ReferenceObject) => {
    const base = '#/components/schemas/';
    if (!component.$ref.startsWith(base)) {
      throw 'Unknown ref';
    }
    const schemaName = component.$ref.replace(base, '');
    const contractName = getContractName(schemaName);
    if (moduleName === getModuleName(schemaName)) {
      return `${getModuleAliasName(schemaName)}.${contractName}`;
    } else {
      return contractName;
    }
  };
}

export function makeImport(moduleName: string, schemaName: string) {
  return `import * as ${getModuleAliasName(
    schemaName,
  )} from './${moduleName}';\n`;
}

export function getModuleAliasName(schemaName: string) {
  const name = schemaName.replace('.' + getContractName(schemaName), '');
  return name.replace('.', '');
}

export function getModuleName(schemaName: string) {
  const name = schemaName.replace('.' + getContractName(schemaName), '');

  return toKebabCase(name);
}

export function getContractName(schemaName: string): string {
  const name = schemaName.split('.').pop();
  if (name === undefined) {
    throw 'Incorrect scheme name';
  }
  return name;
}

interface Module {
  name: string;
  content: string;
}

interface Contracts {
  importsAll: string;
  modules: Module[];
}
