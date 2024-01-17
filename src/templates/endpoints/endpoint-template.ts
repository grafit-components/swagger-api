import { TagGroupItem, TagOperation } from '../../generate/endpoints';
import { toCamelCase, toPascalCase } from '../../utils/string-converters';
import { getJsDocParams, getMethodParams, getQueryParams } from './endpoints-params-template';

export function makeEndpoint(tagGroupItem: TagGroupItem, endpointsUrlPrefix?: string) {
  const methods = tagGroupItem.operations.map((operation) => {
    if (!operation.path.includes(`${tagGroupItem.tag}/`)) {
      // Пропускаются все роуты которые не содержат в пути тег (скорее всего они избыточны)
      console.log(`Skip operation: ${operation.path}`);
      return '';
    }
    return `${getMethodJsDoc(operation)}
    ${getMethodName(tagGroupItem.tag, operation)}: ${getMethod(operation, endpointsUrlPrefix)}`;
  });
  const methodStr = methods.filter((f) => f).join('\n\n');
  const controllerName = toCamelCase(tagGroupItem.tag);

  return `readonly ${controllerName} = {
  ${methodStr}
  } as const;`;
}

export function getMethodName(tag: string, operation: TagOperation) {
  const name = operation.path.split(`${tag}/`)[1].split('/')[0];
  return `${toCamelCase(name)}${operation.appendMethodToName ? toPascalCase(operation.method) : ''}`;
}

export function getMethod(operation: TagOperation, endpointsUrlPrefix: string | undefined) {
  const params = getMethodParams(operation.operationObject.parameters);
  const url = (endpointsUrlPrefix ?? 'api') + operation.path.replace(/\{/g, '${');

  const optionsArr = [getQueryParams(operation.operationObject.parameters)];

  const options = optionsArr.length ? `,{ ${optionsArr.join(', ')} }` : '';

  return `(${params}) => this.http.request<string>(
      '${operation.method}',
      \`${url}\`
      ${options}
    ),`;
}

export function getMethodJsDoc(operation: TagOperation) {
  const summary = operation.operationObject.summary ? `${operation.operationObject.summary}\n` : '';
  const description = operation.operationObject.description
    ? `\n@description ${operation.operationObject.description}\n`
    : '';
  const deprecated = operation.operationObject.deprecated ? '\n@deprecated\n' : '';
  const request = `\n@request ${operation.method}: ${operation.path}\n`;
  const params = getJsDocParams(operation.operationObject.parameters);
  return `/** ${summary}${description}${deprecated}${request}${params} */`;
}
