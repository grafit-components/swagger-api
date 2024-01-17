import { TagGroupItem, TagOperation } from '../../generate/endpoints';
import { toCamelCase, toPascalCase } from '../../utils/string-converters';
import { getJsDocBody, getMethodBody } from './endpoint-body-template';
import { getJsDocParams, getMethodParams, getQueryParams } from './endpoint-params-template';

export function makeEndpoint(tagGroupItem: TagGroupItem, endpointsUrlPrefix?: string) {
  const methods = tagGroupItem.operations.map((operation) => {
    if (!operation.path.includes(`/${tagGroupItem.tag}/`)) {
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
  const optionsArr = [];
  const url = (endpointsUrlPrefix ?? 'api') + operation.path.replace(/\{/g, '${');

  const params = getMethodParams(operation.operationObject.parameters);
  if (params) {
    const paramInOptions = getQueryParams(operation.operationObject.parameters);
    optionsArr.push(paramInOptions);
  }

  const body = getMethodBody(operation.operationObject.requestBody);
  if (body) {
    optionsArr.push('body');
  }

  const options = optionsArr.length ? `, { ${optionsArr.join(', ')} }` : '';

  return `(${params}${body}) => this.http.request<string>('${operation.method}', \`${url}\`${options}),`;
}

export function getMethodJsDoc(operation: TagOperation) {
  const summary = operation.operationObject.summary ? `${operation.operationObject.summary}\n` : '';
  const description = operation.operationObject.description
    ? `\n@description ${operation.operationObject.description}\n`
    : '';
  const deprecated = operation.operationObject.deprecated ? '\n@deprecated\n' : '';
  const request = `\n@request ${operation.method}: ${operation.path}\n`;
  const params = getJsDocParams(operation.operationObject.parameters);
  const body = getJsDocBody(operation.operationObject.requestBody);
  return `/** ${summary}${description}${deprecated}${request}${params}${body} */`;
}
