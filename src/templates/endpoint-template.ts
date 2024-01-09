import { OpenAPIV3 } from 'openapi-types';

export function makeEndpoint(
  paht: string,
  httpMethod: OpenAPIV3.HttpMethods,
  operationObject: OpenAPIV3.OperationObject,
) {
  const tag = operationObject.tags?.at(0);
  if (!tag) {
    throw 'Tag in path required!';
  }

  const methodName = paht.split(`/${tag}/`)[1];

  return `/**  */`;
}
