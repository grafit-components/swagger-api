import { OpenAPIV3 } from 'openapi-types';
import { Options } from '../../generate/options';
import { makeEnumAsObjType, makeEnumType } from './enum-template';
import { makeJsDoc } from './js-doc-template.js';
import { getContractName, getModuleAliasName, getModuleName } from './names-template.js';

export interface MakeContractParam {
  component: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
  makeRef: (component: OpenAPIV3.ReferenceObject) => string;
  name?: string;
  datesAsString?: boolean;
  isObjectProp?: boolean;
  suppressEnumAsObj?: boolean;
}

export function makeContract(param: MakeContractParam) {
  const { component, makeRef, name } = param;
  if ('$ref' in component) {
    // для ссылок в полях объекта нет возможности понять обязательность поля, поэтому все nullable
    const isNullable = param.isObjectProp ? ' | null' : '';
    return makeRef(component) + isNullable;
  }

  switch (component.type) {
    case 'integer':
    case 'number':
      if (component.enum) {
        if (param.suppressEnumAsObj) {
          return makeEnumType(component, name);
        } else {
          return makeEnumAsObjType(component, name);
        }
      } else {
        return makeNumberType(component);
      }
    case 'string':
      return makeStringType(component, param.datesAsString ?? false);
    case 'boolean':
      return makeBooleanType(component);
    case 'array':
      return makeArrayContract({ ...param, component, name: undefined });
    case 'object':
      return makeObject({ ...param, component });
  }

  return 'unknown';
}

export function makeArrayContract(param: MakeContractParam & { component: OpenAPIV3.ArraySchemaObject }): string {
  return `${makeContract({ ...param, component: param.component.items, isObjectProp: false })}[]`;
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

export function makeObject(param: MakeContractParam & { component: OpenAPIV3.NonArraySchemaObject }) {
  const strings = [];
  const { component, name } = param;
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
      strings.push(
        `${fieldName}: ${makeContract({ ...param, component: fieldComponent, isObjectProp: true, name: undefined })}\n`,
      );
    });
  }

  if (!name && component.nullable) {
    strings.push('} | null');
  } else {
    strings.push('}');
  }

  return strings.join('\n');
}

export function makeRefBuilder(
  options: Options,
  moduleName?: string,
): (component: OpenAPIV3.ReferenceObject) => string {
  return (component: OpenAPIV3.ReferenceObject) => {
    const base = '#/components/schemas/';
    if (!component.$ref.startsWith(base)) {
      throw 'Unknown ref';
    }
    const schemaName = component.$ref.replace(base, '');

    const contractName = getContractName(schemaName, options);
    if (moduleName && moduleName === getModuleName(schemaName)) {
      return contractName;
    } else {
      return `${getModuleAliasName(schemaName)}.${contractName}`;
    }
  };
}
