import assert from 'node:assert';
import { test } from 'node:test';
import { OpenAPIV3 } from 'openapi-types';
import { getJsDocBody, getMethodBody } from './endpoint-body-template';

test('getMethodBody From', () => {
  const formBody: OpenAPIV3.RequestBodyObject = {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            ContentType: {
              type: 'string',
            },
            ContentDisposition: {
              type: 'string',
            },
            Headers: {
              type: 'object',
              additionalProperties: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
            Length: {
              type: 'integer',
              format: 'int64',
            },
            Name: {
              type: 'string',
            },
            FileName: {
              type: 'string',
            },
          },
        },
        encoding: {
          ContentType: {
            style: 'form',
          },
          ContentDisposition: {
            style: 'form',
          },
          Headers: {
            style: 'form',
          },
          Length: {
            style: 'form',
          },
          Name: {
            style: 'form',
          },
          FileName: {
            style: 'form',
          },
        },
      },
    },
  };

  const res = getMethodBody(formBody);

  assert.strictEqual(res, 'body: FormData | undefined, ');
});

test('getMethodBody Obj', () => {
  const res = getMethodBody(objBody);

  assert.strictEqual(res, 'body: ItskERWebApiRequestsBrigadeEquipmentArgs.BrigadeEquipmentKindAddArgs | undefined, ');
});

test('getJsDocBody', () => {
  const res = getJsDocBody(objBody);

  assert.strictEqual(res, '\n@param body Параметры.');
});

const objBody: OpenAPIV3.RequestBodyObject = {
  description: 'Параметры.',
  content: {
    'application/json-patch+json': {
      schema: {
        $ref: '#/components/schemas/Itsk.ER.Web.Api.Requests.BrigadeEquipmentArgs.BrigadeEquipmentKindAddArgs',
      },
    },
    'application/json': {
      schema: {
        $ref: '#/components/schemas/Itsk.ER.Web.Api.Requests.BrigadeEquipmentArgs.BrigadeEquipmentKindAddArgs',
      },
    },
    'text/json': {
      schema: {
        $ref: '#/components/schemas/Itsk.ER.Web.Api.Requests.BrigadeEquipmentArgs.BrigadeEquipmentKindAddArgs',
      },
    },
    'application/*+json': {
      schema: {
        $ref: '#/components/schemas/Itsk.ER.Web.Api.Requests.BrigadeEquipmentArgs.BrigadeEquipmentKindAddArgs',
      },
    },
  },
};
