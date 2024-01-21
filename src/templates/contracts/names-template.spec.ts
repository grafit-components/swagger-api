import assert from 'node:assert';
import { test } from 'node:test';
import { getContractName, getModuleAliasName, getModuleName } from './names-template.js';

test('getContractName', () => {
  const shcemeName = 'Itsk.ER.Grafit.Abstractions.Models.GtChange';

  const contractName = getContractName(shcemeName);

  assert.strictEqual(contractName, 'GtChange');
});

test('getContractName with generic', () => {
  const shcemeName = 'Itsk.ER.JobOrder.Model.WorkActReportModel.Record.ValueT`1[System.String]';
  const contractName = getContractName(shcemeName);

  assert.strictEqual(contractName, 'ValueT_1SystemString');
});

test('getContractName with 2 generic', () => {
  const shcemeName = 'System.ValueTuple`2[System.Int64,System.String]';
  const contractName = getContractName(shcemeName);

  assert.strictEqual(contractName, 'ValueTuple_2SystemInt64_SystemString');
});

test('getContractName with subclass', () => {
  const shcemeName = 'Itsk.ER.JobOrder.Model.Chunks.WorkPlanChunk+WorkItem';

  const contractName = getContractName(shcemeName);

  assert.strictEqual(contractName, 'WorkPlanChunkWorkItem');
});

test('getModuleName', () => {
  const shcemeName = 'Itsk.ER.Grafit.Abstractions.Models.GtChange';

  const contractName = getModuleName(shcemeName);

  assert.strictEqual(contractName, 'itsk.er.grafit.abstractions.models');
});

test('getModuleName with generic', () => {
  const shcemeName = 'Itsk.ER.JobOrder.Model.WorkActReportModel.Record.ValueT`1[System.String]';

  const contractName = getModuleName(shcemeName);

  assert.strictEqual(contractName, 'itsk.er.job-order.model.work-act-report-model.record');
});

test('getModuleName with subclass', () => {
  const shcemeName = 'Itsk.ER.JobOrder.Model.Chunks.WorkPlanChunk+WorkItem';

  const contractName = getModuleName(shcemeName);

  assert.strictEqual(contractName, 'itsk.er.job-order.model.chunks');
});

test('getModuleAliasName', () => {
  const shcemeName = 'Itsk.Er.Grafit.Abstractions.Models.GtChange';

  const alias = getModuleAliasName(shcemeName);

  assert.strictEqual(alias, 'ItskErGrafitAbstractionsModels');
});

test('getModuleAliasName from kebab case', () => {
  const shcemeName = 'Itsk.ER.Grafit.Abstractions.Models.GtChange';

  const alias = getModuleAliasName(shcemeName);

  assert.strictEqual(alias, 'ItskErGrafitAbstractionsModels');
});
