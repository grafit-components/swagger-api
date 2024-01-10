import { glob } from 'glob';
import { run } from 'node:test';
import { tap } from 'node:test/reporters';

start().then();

async function start() {
  const files = await glob('dist/**/*.spec.js');
  run({
    files,
  })
    .compose(tap)
    .pipe(process.stdout);
}
