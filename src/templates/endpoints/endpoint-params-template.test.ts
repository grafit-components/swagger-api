import assert from 'node:assert';
import { describe, test } from 'node:test';
import { OpenAPIV3 } from 'openapi-types';
import { Options } from '../../generate/options';
import { getJsDocParams, getMethodParams, getQueryParams } from './endpoint-params-template';
const parameters: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[] = [
  {
    name: 'fromDate',
    in: 'path',
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
    required: true,
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

const options: Options = {
  path: '',
  outputFolder: '',
};

describe('endpoint-params-template', () => {
  test('getQueryParams', () => {
    const res = getQueryParams(parameters);

    assert.strictEqual(res, "params: new HttpParams({ fromObject: { toDate, repairTypes: repairTypes ?? '' } })");
  });

  test('getMethodParams', () => {
    const res = getMethodParams(options, parameters);

    assert.strictEqual(
      res,
      'fromDate: string | undefined, toDate: string, repairTypes: ItskErWebModelRepair.RepairType[] | undefined, ',
    );
  });

  test('getJsDocParams', () => {
    const res = getJsDocParams(parameters);

    assert.strictEqual(
      res,
      `@param fromDate Дата начала периода. IN:path format:date-time
@param toDate Дата окончания периода. IN:query format:date-time
@param repairTypes Типы ремонтов. IN:query`,
    );
  });
});
