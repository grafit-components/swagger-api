import { test } from 'node:test';
import { getContractName, getModuleName } from './contracts.js';
import assert from 'node:assert';

test('getContractName', () => {
  const shcemeName = 'Itsk.ER.Grafit.Abstractions.Models.GtChange';

  const contractName = getContractName(shcemeName);

  assert.strictEqual(contractName, 'GtChange');
});

test('getModuleName', () => {
  const shcemeName = 'Itsk.ER.Grafit.Abstractions.Models.GtChange';

  const contractName = getModuleName(shcemeName);

  assert.strictEqual(contractName, 'Grafit.Abstractions.Models');
});
