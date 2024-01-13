import { test } from 'node:test';
import { generation } from './generate';
import { Options } from './options';

test('generate', async () => {
  const options: Options = {
    path: './bin/swagger.json',
    outputFolder: './bin/test',
  };

  try {
    await generation(options);
  } catch (e) {
    console.log(e);
  }
});
