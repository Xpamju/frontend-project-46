import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import { dirname } from 'path';
import compare from '../src/half.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('returns the correct object', () => {
  const data1 = readFile('file1.json');
  const data2 = readFile('file2.json');
  const expected = readFile('expected.json');
  const actual = compare(JSON.parse(data1), JSON.parse(data2));
  expect(actual).toEqual(expected);
});