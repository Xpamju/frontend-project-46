import { readFileSync } from 'fs';
import yml from 'js-yaml';
import path from 'path';
import newobj from './genDiff.js';

const obj = (filepath1, filepath2) => {
  const configPath = (filepath1);
  const configPath1 = (filepath2);
  const format = path.extname(configPath, configPath1);
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yml.load;
  }
  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');
  const dataPparsed1 = parse(data1);
  const dataPparsed2 = parse(data2);
  console.log(newobj(dataPparsed1, dataPparsed2));
};
export default obj;
