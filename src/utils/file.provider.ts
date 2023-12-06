import { access, mkdir, readFile, writeFile } from 'fs/promises';
import path from 'node:path';

export async function getDocumentByUrl<Type>(url: string): Promise<Type> {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const r = await fetch(url);
  const document = (await r.json()) as Type;
  return document;
}

export async function getDocumentByPath<Type>(path: string): Promise<Type> {
  const fileString = await readFile(path, { encoding: 'utf8' });
  const document: Type = JSON.parse(fileString);
  return document;
}

export async function saveFile(fileName: string, content: string) {
  const dirName = path.dirname(fileName);
  try {
    await access(dirName);
  } catch (e) {
    await mkdir(dirName);
  }

  await writeFile(fileName, content);
}
