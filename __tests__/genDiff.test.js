
// import path from 'path';
import { readFileSync } from 'fs';
import {obj} from '../src/genDiff.js'
import newobj from '../src/genDiff.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('returns the correct object', () => {
  const data1 = readFile('file1.json')
  const data2 = readFile('file2.json')
  console.log([].toString.call(data1))
  console.log({1: "q", 2: "w"}.toString())
  const expected = readFile('expected.json')
  const actual = newobj(JSON.parse(data1), JSON.parse(data2))
  expect(actual).toEqual(expected)
});
