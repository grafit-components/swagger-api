import { OpenAPIV3 } from 'openapi-types';
import { makeContract, makeRefBuilder } from '../templates/contracts/contract-template.js';
import { makeImport } from '../templates/contracts/import-template.js';
import { getContractName, getModuleName } from '../templates/contracts/names-template.js';
import { Options } from './options';

export function makeContracts(document: OpenAPIV3.Document, options: Options) {
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
      module.content +=
        makeContract({
          component: schemas[schemaName],
          makeRef,
          name: getContractName(schemaName),
          suppressEnumAsObj: options.suppressEnumAsObj,
          datesAsString: options.datesAsString,
        }) + '\n\n\n';
    });

    contracts.modules.push(module);
  });

  return contracts;
}

interface Module {
  name: string;
  content: string;
}

interface Contracts {
  importsAll: string;
  modules: Module[];
}
