import { OpenAPIV3 } from 'openapi-types';
import { makeJsDoc } from './js-doc-template';

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
  if (!names) {
    values.forEach((value) => {
      strings.push(`_${value} = ${value},`);
    });
  } else if (values.length === names.length) {
    names.forEach((enumInemName, index) => {
      const summary = summaries[index] ? `\n/** ${summaries[index]} */\n` : '';
      strings.push(`${summary}${enumInemName} = ${values[index]},`);
    });
  } else {
    console.log('Invalid enum ' + name);
  }

  strings.push('}');
  return strings.join('\n');
}

export function makeEnumAsObjType(component: OpenAPIV3.BaseSchemaObject, name?: string) {
  const strings = [];
  if (name) {
    strings.push(makeJsDoc(component));
    strings.push(`export const ${name} = {`);
  } else {
    throw 'Name enum required';
  }

  const values = component.enum!;
  const names = (component as { 'x-enumNames': string[] })['x-enumNames'];
  const summaries = (component as { 'x-enumSummaries': string[] })['x-enumSummaries'] ?? [];
  if (!names) {
    values.forEach((value) => {
      strings.push(`_${value} : ${value},`);
    });
  } else if (values.length === names.length) {
    names.forEach((enumInemName, index) => {
      const summary = summaries[index] ? `\n/** ${summaries[index]} */\n` : '';
      strings.push(`${summary}${enumInemName} : ${values[index]},`);
    });
  } else {
    console.log('Invalid enum ' + name);
  }

  strings.push('} as const;');
  strings.push(makeJsDoc(component));
  strings.push(`export type ${name} = (typeof ${name})[keyof typeof ${name}];`);

  return strings.join('\n');
}
