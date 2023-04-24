
// import path from 'path';
import { readFileSync } from 'fs';
import newobj from '/Users/igor/frontend-project-46/src/genDiff.js'
import {obj} from '/Users/igor/frontend-project-46/src/genDiff.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
// import { test, expect } from '@jest/globals';
// import pkg from '@jest/globals';
// const { test, expect } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// describe('newobj', () => {
//     test('returns the correct object', () => {
//       const data1 = JSON.parse(readFileSync(join(__dirname, 'file1.json'), 'utf-8'));
//       const data2 = JSON.parse(readFileSync(join(__dirname, 'file2.json'), 'utf-8'));
//       const expected = JSON.parse(readFileSync(join(dirname, 'expected.json'), 'utf-8'));
//       const actual = newobj(data1, data2);
//       expect(actual).toEqual(expected);
//     });
//   });

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

// const test = readFile('file1.json')
// console.log(test)

test('returns the correct object', () => {

  const data1 = readFile('file1.json')
  const data2 = readFile('file2.json')
  console.log([].toString.call(data1))
  console.log({1: "q", 2: "w"}.toString())
  const expected = readFile('expected.json')
  const actual = newobj(JSON.parse(data1), JSON.parse(data2))
  expect(actual).toEqual(expected)
})

// console.log(JSON.parse(readFileSync(path.join(__dirname, '__fixtures__', 'file1.json', '../'))))