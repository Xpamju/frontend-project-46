import _ from 'lodash';
import formatValue from '../formatters/stylish.js';

// const compare = (data1, data2) => {
//     const keys = _.union(Object.keys(data1), Object.keys(data2));
//     const result = keys.sort().reduce((acc, key) => {
//       if (_.has(data1, key) && !_.has(data2, key)) {
//         acc += `  - ${key}: ${data1[key]}\n`;
//       } else if (_.has(data2, key) && !_.has(data1, key)) {
//         acc += `  + ${key}: ${data2[key]}\n`;
//       } else if (_.isEqual(data1[key], data2[key])) {
//         acc += `    ${key}: ${data1[key]}\n`;
//       } else {
//         acc += `  - ${key}: ${data1[key]}\n`;
//         acc += `  + ${key}: ${data2[key]}\n`;
//       }
//       return acc;
//     }, '');
//     return `{\n${result}}`;
//   };

// const compare = (data1, data2, depth = 1) => {
//   const keys = _.union(Object.keys(data1), Object.keys(data2));
//   const indent = '    '.repeat(depth - 1);
//   const indentInner = '    '.repeat(depth);

//   const result = keys.sort().map((key) => {
//     const value1 = data1[key];
//     const value2 = data2[key];

//     if (!_.has(data2, key)) {
//       return `${indent}  - ${key}: ${formatValue(value1, depth + 1)}`;
//     }
//     if (!_.has(data1, key)) {
//       return `${indent}  + ${key}: ${formatValue(value2, depth + 1)}`;
//     }

//     if (_.isEqual(value1, value2)) {
//       return `${indent}    ${key}: ${formatValue(value1, depth + 1)}`;
//     }

//     if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
//       return `${indent}    ${key}: {\n${compare(value1, value2, depth + 1)}\n${indent}    }`;
//     }

//     return [
//       `${indent}  - ${key}: ${formatValue(value1, depth + 1)}`,
//       `${indent}  + ${key}: ${formatValue(value2, depth + 1)}`,
//     ].join('\n');
//   }).join('\n');

//   if (depth === 1) {
//     return `{\n${result}\n}`;
//   }
//   return result;
// };
// export default compare;


const buildDiff = (data1, data2, depth = 1) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  
  return keys.sort().map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: value1, depth };
    }
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2, depth };
    }

    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1, depth };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { 
        key, 
        type: 'nested', 
        children: buildDiff(value1, value2, depth + 1),
        depth 
      };
    }

    return { 
      key, 
      type: 'changed', 
      oldValue: value1, 
      newValue: value2,
      depth 
    };
  });
};

const compare = (data1, data2) => {
  return {
    type: 'root',
    children: buildDiff(data1, data2),
  };
};

export default compare;