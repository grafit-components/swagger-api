import assert from 'node:assert';
import { test } from 'node:test';
import { codeFormat } from './code-format.js';

test('Code format', async () => {
  const code = `
    import { test } from './test'
import { removed } from './removed';


export interface    Name{ /** 
Doc @deprecated
*/ 
field:number    | null
fieldTest:test
}

    `;

  const result = await codeFormat(code);

  const expected = `import { test } from './test';

export interface Name {
  /** Doc @deprecated */ field: number | null;
  fieldTest: test;
}
`;

  assert.strictEqual(result, expected);
});
