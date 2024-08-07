import assert from 'node:assert';
import { describe, test } from 'node:test';
import { OpenAPIV3 } from 'openapi-types';
import { Options } from '../../generate/options';
import { getJsDocBody, getMethodBody } from './endpoint-body-template';
describe('endpoint-body-template', () => {
  test('getMethodBody From', () => {
    const options: Options = {
      path: '',
      outputFolder: '',
    };
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

    const res = getMethodBody(options, formBody);

    assert.strictEqual(res, 'body: FormData | undefined, ');
  });

  test('getMethodBody Obj', () => {
    const options: Options = {
      path: '',
      outputFolder: '',
    };
    const res = getMethodBody(options, objBody);

    assert.strictEqual(res, 'body: ItskErWebApiRequestsBrigadeEquipmentArgs.BrigadeEquipmentKindAddArgs | undefined, ');
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
});
