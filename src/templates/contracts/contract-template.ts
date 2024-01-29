import { OpenAPIV3 } from 'openapi-types';
import { makeJsDoc } from './js-doc-template.js';
import { getContractName, getModuleAliasName, getModuleName } from './names-template.js';

export function makeContract(
  component: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
  makeRef: (component: OpenAPIV3.ReferenceObject) => string,
  name: string | undefined = undefined,
  datesAsString = false,
) {
  if ('$ref' in component) {
    return makeRef(component);
  }

  switch (component.type) {
    case 'integer':
    case 'number':
      if (component.enum) {
        return makeEnumType(component, name);
      } else {
        return makeNumberType(component);
      }
    case 'string':
      return makeStringType(component, datesAsString);
    case 'boolean':
      return makeBooleanType(component);
    case 'array':
      return makeArrayContract(component, makeRef);
    case 'object':
      return makeObject(component, makeRef, name);
  }

  return 'unknown';
}

export function makeArrayContract(
  component: OpenAPIV3.ArraySchemaObject,
  makeRef: (component: OpenAPIV3.ReferenceObject) => string,
): string {
  return `${makeContract(component.items, makeRef)}[]`;
}

export function makeNumberType(component: OpenAPIV3.BaseSchemaObject) {
  return `number${component?.nullable ? ' | null' : ''}`;
}
export function makeStringType(component: OpenAPIV3.NonArraySchemaObject, datesAsString: boolean) {
  const type = !datesAsString && component.format === 'date-time' ? 'Date' : 'string';
  return `${type}${component?.nullable ? ' | null' : ''}`;
}
function makeBooleanType(component: OpenAPIV3.NonArraySchemaObject) {
  return `boolean${component?.nullable ? ' | null' : ''}`;
}

export function makeEnumType(component: OpenAPIV3.BaseSchemaObject, name?: string) {
  const strings = [];
  if (name) {
    strings.push(makeJsDoc(component));
    strings.push(`export enum ${name} {`);
  } else {
    throw 'Name enum required';
  }

  const values = component.enum!;
  const names = (component as { 'x-enumNames': string[] })['x-enumNames'];
  const summaries = (component as { 'x-enumSummaries': string[] })['x-enumSummaries'] ?? [];
  if (values.length === names.length) {
    names.forEach((enumInemName, index) => {
      const summary = summaries[index] ? `\n\n/** ${summaries[index]} */\n` : '';
      strings.push(`${summary}${enumInemName} = ${values[index]},`);
    });
  } else {
    console.log('Invalid enum ' + name);
  }

  strings.push('}');
  return strings.join('\n');
}

export function makeObject(
  component: OpenAPIV3.NonArraySchemaObject,
  makeRef: (component: OpenAPIV3.ReferenceObject) => string,
  name?: string,
) {
  const strings = [];

  if (name) {
    strings.push(makeJsDoc(component));
    strings.push(`export interface ${name} {`);
  } else {
    strings.push('{');
  }

  if (component.properties) {
    const fieldNames = Object.keys(component.properties);
    fieldNames.forEach((fieldName) => {
      const fieldComponent = component.properties![fieldName];
      strings.push(makeJsDoc(fieldComponent));
      strings.push(`${fieldName}: ${makeContract(fieldComponent, makeRef)}\n`);
    });
  }

  if (!name && component.nullable) {
    strings.push('} | null');
  } else {
    strings.push('}');
  }

  return strings.join('\n');
}

export function makeRefBuilder(moduleName?: string): (component: OpenAPIV3.ReferenceObject) => string {
  return (component: OpenAPIV3.ReferenceObject) => {
    const base = '#/components/schemas/';
    if (!component.$ref.startsWith(base)) {
      throw 'Unknown ref';
    }
    const schemaName = component.$ref.replace(base, '');

    const contractName = getContractName(schemaName);
    if (moduleName && moduleName === getModuleName(schemaName)) {
      return contractName;
    } else {
      return `${getModuleAliasName(schemaName)}.${contractName}`;
    }
  };
}
