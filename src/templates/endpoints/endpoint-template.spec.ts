import { test } from 'node:test';
import { OpenAPIV3 } from 'openapi-types';
import { TagGroupItem } from '../../generate/endpoints';
import { makeEndpoint } from './endpoint-template';
import HttpMethods = OpenAPIV3.HttpMethods;

test('makeEndpoint', () => {
  const res = makeEndpoint(testGroup);
  console.log(res);
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
