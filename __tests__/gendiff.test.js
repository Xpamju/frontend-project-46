import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'yaml';
import { dirname } from 'path';
import parseAndRead from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);


test('returns the correct object', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expectedFile = getFixturePath('expected.json');
  
  const expectedData = readFileSync(expectedFile, 'utf-8');
  const expected = JSON.parse(expectedData); 

  const actual = parseAndRead(file1, file2);

  expect(actual).toEqual(expected);
});


test('returns the correct object yml', ()=> {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expectedFile = getFixturePath('expected.yml');

  const expectedData = readFileSync(expectedFile, 'utf-8');
  const expected = yaml.parse(expectedData); 

  const actual = parseAndRead(file1, file2);
  expect(actual).toEqual(expected);
});

test('returns the correct diff output', () => {
  const file1 = getFixturePath('filenest1.yml');
  const file2 = getFixturePath('filenest2.yml');
  const expectedDiff = readFileSync(getFixturePath('expected.txt'), 'utf-8');

  const actual = parseAndRead(file1, file2);

  // Сравниваем с допущением различий в пробелах
  expect(actual.trim()).toEqual(expectedDiff.trim());
});
test('returns the correct diff output', () => {
  const file1 = getFixturePath('filenest1.json');
  const file2 = getFixturePath('filenest2.json');
  const expectedDiff = readFileSync(getFixturePath('expected.txt'), 'utf-8');

  const actual = parseAndRead(file1, file2);

  // Сравниваем с допущением различий в пробелах
  expect(actual.trim()).toEqual(expectedDiff.trim());
});