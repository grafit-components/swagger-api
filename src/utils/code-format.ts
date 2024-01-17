import * as prettier from 'prettier';

export async function codeFormat(code: string) {
  return await prettier.format(code, {
    parser: 'typescript',
    singleQuote: true,
    printWidth: 120,
    plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-jsdoc'],
  });
}
