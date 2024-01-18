import { OpenAPIV3 } from 'openapi-types';
import { makeContract, makeRefBuilder } from '../contracts/contract-template';

export function getMethodType(responses: OpenAPIV3.ResponsesObject) {
  const response = responses['200'];
  if (response && !('$ref' in response) && response.content) {
    const schema = response.content['application/json']?.schema;
    if (schema) {
      const makeRef = makeRefBuilder();
      const type = makeContract(schema, makeRef);
      return `<${type}>`;
    }
  }
  return '';
}
