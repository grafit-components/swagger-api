import { OpenAPIV3 } from 'openapi-types';
import { makeContract, makeRefBuilder } from '../templates/contracts/contract-template.js';
import { makeExport, makeImport } from '../templates/contracts/import-template.js';
import { getContractName, getModuleName } from '../templates/contracts/names-template.js';
import { Options } from './options';

export function makeContracts(
  options: Options,
  document: OpenAPIV3.Document,
  documentIntersection: OpenAPIV3.Document | undefined,
) {
  if (!document.components?.schemas) {
    throw Error('Components not contains in schemas');
  }

  const schemas = document.components.schemas;
  const schemasIntersectionNames = documentIntersection?.components?.schemas
    ? Object.keys(documentIntersection.components.schemas)
    : [];

  const schemaNames = Object.keys(schemas).filter((name) => schemasIntersectionNames.includes(name));
  const contracts: Contracts = {
    importsAll: '',
    exportsAll: '',
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
        contracts.exportsAll += makeExport(moduleName);
      }
      return modules;
    },
    [] as { name: string; schemaNames: string[] }[],
  );

  modulesRaw.forEach((moduleRaw) => {
    const makeRef = makeRefBuilder(options, moduleRaw.name);
    const module: Module = {
      name: moduleRaw.name,
      content: contracts.importsAll,
    };

    moduleRaw.schemaNames.forEach((schemaName) => {
      module.content +=
        makeContract({
          component: schemas[schemaName],
          makeRef,
          name: getContractName(schemaName, options),
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
  exportsAll: string;
  modules: Module[];
}
