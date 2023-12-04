import { run } from 'node:test';
import { glob } from 'glob';
import { tap } from 'node:test/reporters';

const files = await glob('dist/**/*.spec.js');
run({
  files,
})
  .compose(tap)
  .pipe(process.stdout);
