import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'yaml';
import compare from './half.js';
//
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const parseFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const format = path.extname(fullPath).toLowerCase();
  const data = readFileSync(fullPath, 'utf-8');

  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.parse(data);
    default:
      throw new Error(`Unsupported file format: ${format}`);
  }
};

const parseAndRead = (filepath1, filepath2, format = 'stylish') => {
  try {
    const parsedData1 = parseFile(filepath1);
    const parsedData2 = parseFile(filepath2);
    const diff = compare(parsedData1, parsedData2);
    
    return diff; // Теперь возвращаем неотформатированный diff, форматирование будет в другом месте
  } catch (error) {
    throw new Error(`Error while comparing files: ${error.message}`);
  }
};

export default parseAndRead;
// const parseAndRead = (filepath1, filepath2) => {

//   const fullPath1 = path.resolve(process.cwd(), filepath1);
//   const fullPath2 = path.resolve(process.cwd(), filepath2);

//   const format1 = path.extname(fullPath1);
//   const format2 = path.extname(fullPath2);
  

//   const getParser = (format, data) => {
//     if (format === '.json') {
//         return JSON.parse(data);
//       } else if (format === '.yml') {
//         return yaml.parse(data);
//       } else {
//         throw new Error(`Unsupported format: ${format}`); // выбрасываем ошибку, если формат файла не определён
//       }
//   };

 
//   const data1 = readFileSync(fullPath1, 'utf-8');
//   const data2 = readFileSync(fullPath2, 'utf-8');
//   const parsedData1 = getParser(format1, data1);
//   const parsedData2 = getParser(format2, data2);

//   return compare(parsedData1, parsedData2);
// };

// export default parseAndRead;