import { readFileSync } from 'fs';
import path from 'path';
import yml from 'js-yaml';
import compare from './half.js';


const parseAndRead = (filepath1, filepath2) => {

  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const fullPath2 = path.resolve(process.cwd(), filepath2);

  const format1 = path.extname(fullPath1);
  const format2 = path.extname(fullPath2);
  

  const getParser = (format, data) => {
    if (format === '.json') {
        return JSON.parse(data);
      } else if (format === '.yml') {
        return yml.parse(data);
      } else {
        throw new Error(`Unsupported format: ${format}`); // выбрасываем ошибку, если формат файла не определён
      }
  };

 
  const data1 = readFileSync(fullPath1, 'utf-8');
  const data2 = readFileSync(fullPath2, 'utf-8');
  const parsedData1 = getParser(format1, data1);
  const parsedData2 = getParser(format2, data2);

  return compare(parsedData1, parsedData2);
};
export default parseAndRead;