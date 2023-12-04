import { OpenAPIV3_1 } from 'openapi-types';

export class Contracts {
  constructor(private document: OpenAPIV3_1.Document) {
    this.build();
  }

  private build() {
    if (!this.document.components?.schemas) {
      throw Error('Components not');
    }
    const schemas = this.document.components.schemas;

    const schemaNames = Object.keys(schemas);
    getContractName(schemaNames[0]);
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
  schemaName: string;
}
