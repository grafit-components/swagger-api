import * as prettier from 'prettier';

export async function codeFormat(code: string) {
  return await prettier.format(code, {
    parser: 'typescript',
    singleQuote: true,
    plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-jsdoc'],
  });
}
