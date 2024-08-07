import assert from 'node:assert';
import { describe, it } from 'node:test';
import { OpenAPIV3 } from 'openapi-types';
import { TagGroupItem } from '../../generate/endpoints';
import { Options } from '../../generate/options';
import { makeEndpoint } from './endpoint-template';
import HttpMethods = OpenAPIV3.HttpMethods;

describe('names-template', () => {
  it('makeEndpoint', () => {
    const options: Options = {
      path: '',
      outputFolder: '',
    };
    const res = makeEndpoint(options, testGroup);

    assert.strictEqual(
      res,
      `readonly affiliateDictionary = {
  /** Получить справочник месторождений ДО пользователя.

@request get: /eraRepairs/AffiliateDictionary/GetFields
@param affiliateId Идентификатор ДО. IN:query format:int64
   @param _noCache Ignore cache.
 */
    getFields: (affiliateId: number | undefined, _noCache=false, ) => this.http.request<ItskErDictionaryAbstractionsModel.AffiliateDictionaryField[]>('get', \`api/eraRepairs/AffiliateDictionary/GetFields\`, { params: new HttpParams({ fromObject: { affiliateId: affiliateId ?? '' } }), headers: _noCache ? this.noCacheHeaders : undefined }),
  _paths: { _controller: 'api/eraRepairs/AffiliateDictionary', getFields: 'api/eraRepairs/AffiliateDictionary/GetFields' }
  } as const;`,
    );
  });
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
