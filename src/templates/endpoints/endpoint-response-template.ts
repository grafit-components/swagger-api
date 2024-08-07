import { OpenAPIV3 } from 'openapi-types';
import { Options } from '../../generate/options';
import { makeContract, makeRefBuilder } from '../contracts/contract-template';

export function getMethodType(options: Options, responses: OpenAPIV3.ResponsesObject) {
  const response = responses['200'];
  if (response && !('$ref' in response) && response.content) {
    const schema = response.content['application/json']?.schema;
    if (schema) {
      const makeRef = makeRefBuilder(options);
      const type = makeContract({ component: schema, makeRef });
      return `<${type}>`;
    }
  }
  return '';
}
