import assert from 'node:assert';
import { test } from 'node:test';
import { OpenAPIV3 } from 'openapi-types';
import {
  getJsDocForDocument,
  getJsDocForTag,
  makeTagGroups,
} from './endpoints';

test('JsDoc for document', () => {
  const jsDoc = getJsDocForDocument(document);

  assert.strictEqual(jsDoc, '/** API ЭРА-Ремонты */');
});

test('JsDoc for tag', () => {
  const jsDoc = getJsDocForTag(document, 'AffiliateDictionary');

  assert.strictEqual(jsDoc, '/** Справочники ДО. */');
});

test('makeTagGroups', () => {
  const groups = makeTagGroups(document);

  assert.strictEqual(groups.length, 2);
});

const document: OpenAPIV3.Document = {
  openapi: '3.0.1',
  info: {
    title: 'API ЭРА-Ремонты',
    version: 'v1',
  },
  paths: {
    '/eraRepairs/AffiliateDictionary/GetFields': {
      get: {
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
    '/eraRepairs/dailyCost/common/getPiCalculation/{wellEventId}': {
      get: {
        tags: ['Common'],
        summary: 'Возвращает детализацию расчета PI.',
        parameters: [
          {
            name: 'wellEventId',
            in: 'path',
            description: 'Идентификатор мероприятия.',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
          {
            name: 'monthlyPlanId',
            in: 'query',
            description:
              'Идентификатор плана (если не указан - используем самый свежий).',
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
                  $ref: '#/components/schemas/Itsk.ER.Web.Api.Responses.EraResponse`1[Itsk.ER.Web.Api.Controllers.DailyCost.Responses.Common.GetPiCalculationResponse]',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Itsk.ER.Web.Api.Responses.EraResponse`1[Itsk.ER.Web.Api.Controllers.DailyCost.Responses.Common.GetPiCalculationResponse]',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/Itsk.ER.Web.Api.Responses.EraResponse`1[Itsk.ER.Web.Api.Controllers.DailyCost.Responses.Common.GetPiCalculationResponse]',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      'Itsk.ER.Dictionary.Abstractions.Model.AffiliateDictionaryField': {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'Идентификатор.',
            format: 'int64',
          },
          name: {
            type: 'string',
            description: 'Наименование.',
            nullable: true,
          },
          shortName: {
            type: 'string',
            description: 'Краткое наименование.',
            nullable: true,
          },
        },
        additionalProperties: false,
        description: 'Месторождение. Элемент справочника ДО пользователя.',
      },

      'Itsk.ER.Web.Api.Responses.EraResponse`1[Itsk.ER.Web.Api.Controllers.DailyCost.Responses.Common.GetPiCalculationResponse]':
        {
          type: 'object',
          properties: {
            state: {
              type: 'integer',
              format: 'int32',
            },
            data: {
              $ref: '#/components/schemas/Itsk.ER.Web.Api.Controllers.DailyCost.Responses.Common.GetPiCalculationResponse',
            },
            errorString: {
              type: 'string',
              nullable: true,
            },
            warns: {
              type: 'array',
              items: {
                type: 'string',
              },
              nullable: true,
            },
          },
          additionalProperties: false,
        },

      'Itsk.ER.Web.Api.Controllers.DailyCost.Responses.Common.GetPiCalculationResponse':
        {
          type: 'object',
          properties: {
            wellId: {
              type: 'integer',
              description: 'Идентификатор скважины.',
              format: 'int64',
            },
            wellName: {
              type: 'string',
              description: 'Название скважины.',
              nullable: true,
            },
            shopId: {
              type: 'integer',
              description: 'Идентификатор ЦДНГ.',
              format: 'int64',
            },
          },
          additionalProperties: false,
          description: 'Выхлоп для метода GetPiCalculationData.',
        },
    },
  },
  tags: [
    {
      name: 'AffiliateDictionary',
      description: 'Справочники ДО.',
    },
  ],
};
