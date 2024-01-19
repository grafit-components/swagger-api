import assert from 'node:assert';
import { test } from 'node:test';
import { OpenAPIV3 } from 'openapi-types';
import { TagGroupItem } from '../../generate/endpoints';
import { getPathName, makePaths } from './endpoint-paths-template';
import HttpMethods = OpenAPIV3.HttpMethods;

test('makePaths', () => {
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

  const paths = makePaths(testGroup, 'api');

  assert.strictEqual(
    paths,
    "_paths: { _controller: 'api/eraRepairs/AffiliateDictionary', getFields: '/eraRepairs/AffiliateDictionary/GetFields' }",
  );
});

test('getPathName', () => {
  const name = getPathName('AffiliateDictionary', '/eraRepairs/AffiliateDictionary/GetFields');

  assert.strictEqual(name, 'getFields');
});

test('getPathName without tag', () => {
  const name = getPathName('Settings', '/eraRepairs/dailyCost/settings/get-Settings');

  assert.strictEqual(name, '_eraRepairs_dailyCost_settings_get_Settings');
});
