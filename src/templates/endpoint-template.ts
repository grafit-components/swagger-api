import { OpenAPIV3 } from 'openapi-types';
import { TagGroupItem, TagOperation } from '../generate/endpoints';
import { toCamelCase, toPascalCase } from '../utils/string-converters';
import { makeContract, makeRefBuilder } from './contract-template';

export function makeEndpoint(
  tagGroupItem: TagGroupItem,
  endpointsUrlPrefix?: string,
) {
  const methods = tagGroupItem.operations.map((operation) => {
    if (!operation.path.includes(`${tagGroupItem.tag}/`)) {
      console.log(`Skip operation: ${operation.path}`);
      return '';
    }
    return `${getMethodJsDoc(operation)}
    ${getMethodName(tagGroupItem.tag, operation)}: ${getMethod(
      operation,
      endpointsUrlPrefix,
    )}`;
  });

  return `readonly ${toCamelCase(tagGroupItem.tag)} = {
  ${methods.filter((f) => f).join('\n\n')}
  } as const;`;
}

export function getMethodName(tag: string, operation: TagOperation) {
  const name = operation.path.split(`${tag}/`)[1].split('/')[0];
  return `${toCamelCase(name)}${
    operation.appendMethodToName ? toPascalCase(operation.method) : ''
  }`;
}

export function getMethod(
  operation: TagOperation,
  endpointsUrlPrefix: string | undefined,
) {
  const params = getMethodParams(operation.operationObject.parameters);
  const url = (endpointsUrlPrefix ?? 'api') + operation.path;
  return `(${params}) => this.http.request<string>(
      '${operation.method}',
      '${url}',
      {
        responseType: "json"
      }
    ),`;
}

export function getMethodParams(
  parameters?: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[],
) {
  if (!parameters?.length) {
    return '';
  }
  const makeRef = makeRefBuilder();

  return parameters
    .map((param) => {
      if ('$ref' in param) {
        throw 'Unknown param type';
      }
      if (!param.schema) {
        return 'Unknown param type';
      }
      return `${param.name}: ${makeContract(param.schema, makeRef)}`;
    })
    .join(', ');
}

export function getMethodJsDoc(operation: TagOperation) {
  const summary = operation.operationObject.summary
    ? `${operation.operationObject.summary}\n`
    : '';
  const description = operation.operationObject.description
    ? `\n@description ${operation.operationObject.description}\n`
    : '';
  const deprecated = operation.operationObject.deprecated
    ? '\n@deprecated\n'
    : '';
  const request = `\n@request ${operation.method}: ${operation.path}\n`;
  return `/** ${summary}${description}${deprecated}${request} */`;
}
