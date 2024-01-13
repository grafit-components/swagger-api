import assert from 'node:assert';
import { test } from 'node:test';
import { OpenAPIV3 } from 'openapi-types';
import { TagGroupItem } from '../generate/endpoints';
import { getMethodParams, makeEndpoint } from './endpoint-template';
import HttpMethods = OpenAPIV3.HttpMethods;

test('makeEndpoint', () => {
  const res = makeEndpoint(testGroup);
  console.log(res);
});

test('getMethodParams', () => {
  const parameters: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[] =
    [
      {
        name: 'fromDate',
        in: 'query',
        description: 'Дата начала периода.',
        schema: {
          type: 'string',
          format: 'date-time',
        },
      },
      {
        name: 'toDate',
        in: 'query',
        description: 'Дата окончания периода.',
        schema: {
          type: 'string',
          format: 'date-time',
        },
      },
      {
        name: 'repairTypes',
        in: 'query',
        description: 'Типы ремонтов.',
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Itsk.ER.Web.Model.Repair.RepairType',
          },
        },
      },
    ];
  const res = getMethodParams(parameters);

  assert.strictEqual(
    res,
    'fromDate: string, toDate: string, repairTypes: ItskERWebModelRepair.RepairType[]',
  );
});

const testGroup: TagGroupItem = {
  tag: 'AffiliateDictionary',
  operations: [
    {
      path: '/eraRepairs/AffiliateDictionary/GetFields',
      method: HttpMethods.GET,
      appendMethodToName: false,
      operationObject: {
        tags: ['AffiliateDictionary'],
        summary: 'Получить справочник месторождений ДО пользователя.',
        parameters: [
          {
            name: 'affiliateId',
            in: 'query',
            description: 'Идентификатор ДО.',
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'text/plain': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Itsk.ER.Dictionary.Abstractions.Model.AffiliateDictionaryField',
                  },
                },
              },
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Itsk.ER.Dictionary.Abstractions.Model.AffiliateDictionaryField',
                  },
                },
              },
              'text/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Itsk.ER.Dictionary.Abstractions.Model.AffiliateDictionaryField',
                  },
                },
              },
            },
          },
        },
      },
    },
  ],
};
