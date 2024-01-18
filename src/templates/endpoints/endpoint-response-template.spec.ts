import assert from 'node:assert';
import { test } from 'node:test';
import { OpenAPIV3 } from 'openapi-types';
import { getMethodType } from './endpoint-response-template';

test('getMethodType', () => {
  const res = getMethodType(response);
  assert.strictEqual(res, '<ItskERGrafitAbstractionsModels.GtFileInfo>');
});

test('getMethodType Str', () => {
  const res = getMethodType(responseStr);
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
