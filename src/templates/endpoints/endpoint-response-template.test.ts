import assert from 'node:assert';
import { describe, test } from 'node:test';
import { OpenAPIV3 } from 'openapi-types';
import { Options } from '../../generate/options';
import { getMethodType } from './endpoint-response-template';
describe('endpoint-response-template', () => {
  const options: Options = {
    path: '',
    outputFolder: '',
  };
  test('getMethodType', () => {
    const res = getMethodType(options, response);
    assert.strictEqual(res, '<ItskErGrafitAbstractionsModels.GtFileInfo>');
  });

  test('getMethodType Str', () => {
    const res = getMethodType(options, responseStr);
    assert.strictEqual(res, '<string>');
  });

  const response: OpenAPIV3.ResponsesObject = {
    '200': {
      description: 'Success',
      content: {
        'text/plain': {
          schema: {
            $ref: '#/components/schemas/Itsk.ER.Grafit.Abstractions.Models.GtFileInfo',
          },
        },
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Itsk.ER.Grafit.Abstractions.Models.GtFileInfo',
          },
        },
        'text/json': {
          schema: {
            $ref: '#/components/schemas/Itsk.ER.Grafit.Abstractions.Models.GtFileInfo',
          },
        },
      },
    },
  };
});
const responseStr: OpenAPIV3.ResponsesObject = {
  '200': {
    description: 'Success',
    content: {
      'text/plain': {
        schema: {
          type: 'string',
        },
      },
      'application/json': {
        schema: {
          type: 'string',
        },
      },
      'text/json': {
        schema: {
          type: 'string',
        },
      },
    },
  },
};
