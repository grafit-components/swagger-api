import { OpenAPIV3 } from 'openapi-types';
import { makeContract } from '../templates/contract-template.js';

export function makeContracts(document: OpenAPIV3.Document) {
  if (!document.components?.schemas) {
    throw Error('Components not contains in schemas');
  }
  const schemas = document.components.schemas;
  const modules = makeEmptyModules(schemas);

  // modules.forEach((module) => {
  //   let content = '';
  // });
}

function makeEmptyModules(schemas: {
  [p: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
}) {
  const schemaNames = Object.keys(schemas);
  const modules = schemaNames.reduce((modules, schemaName) => {
    const contract: Contract = {
      name: getContractName(schemaName),
      schemaName,
    };

    const moduleName = getModuleName(schemaName);

    let module = modules.find((m) => m?.name === moduleName);
    if (module) {
      module.contracts.push(contract);
    } else {
      module = {
        name: moduleName,
        contracts: [contract],
      };
      modules.push(module);
    }

    // const contractStr = makeContract(
    //   schemas[schemaName],
    //   () => '',
    //   contract.name,
    // );

    return modules;
  }, [] as Module[]);

  return modules;
}

export class Contracts {
  constructor(private document: OpenAPIV3.Document) {
    this.build();
  }

  private build() {
    if (!this.document.components?.schemas) {
      throw Error('Components not');
    }
  }
}

export function getModuleName(schemaName: string) {
  const name = schemaName
    .replace('.' + getContractName(schemaName), '')
    .replace('Itsk.ER.', '');

  return name;
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
  contracts: Contract[];
  content?: string;
}

interface Contract {
  name: string;
  schemaName: string;
}
