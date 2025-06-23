import _ from 'lodash';

// const formatValue = (value, depth) => {
//   if (_.isPlainObject(value)) {
//     if (_.isEmpty(value)) {
//       return '{}'; // Единообразное отображение пустых объектов
//     }
//     const indent = ' '.repeat(depth * 4);
//     const lines = Object.entries(value)
//       .map(([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`);
//     return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`;
//   }
  
//   if (_.isArray(value)) {
//     return `[${value.map(v => formatValue(v, depth)).join(', ')}]`;
//   }
  
//   if (value === null) {
//     return 'null';
//   }
  
//   if (typeof value === 'string') {
//     // Экранируем специальные символы в строках
//     return value.includes('\n') ? JSON.stringify(value) : value;
//   }
  
//   return String(value);
// };

// const stylish = (diff) => {
//   const iter = (node, depth = 1) => {
//     const indent = ' '.repeat((depth - 1) * 4);
//     const lines = node.children.flatMap((child) => {
//       const { key, type } = child;
//       const valueIndent = ' '.repeat(depth * 4);
      
//       switch (type) {
//         case 'added':
//           return `${indent}  + ${key}: ${formatValue(child.value, depth + 1)}`;
          
//         case 'removed':
//           return `${indent}  - ${key}: ${formatValue(child.value, depth + 1)}`;
          
//         case 'unchanged':
//           return `${indent}    ${key}: ${formatValue(child.value, depth + 1)}`;
          
//         case 'changed':
//           return [
//             `${indent}  - ${key}: ${formatValue(child.oldValue, depth + 1)}`,
//             `${indent}  + ${key}: ${formatValue(child.newValue, depth + 1)}`
//           ];
          
//         case 'nested':
//           return [
//             `${indent}    ${key}: {`,
//             iter(child, depth + 1),
//             `${indent}    }`
//           ];
          
//         default:
//           throw new Error(`Unknown type: ${type}`);
//       }
//     });
    
//     return lines.join('\n');
//   };

//   return `{\n${iter(diff)}\n}`;
// };

// export default stylish;

const stylish = (diff) => {
  const iter = (node, depth = 1) => {
    const indent = '    '.repeat(depth - 1);
    const currentIndent = '    '.repeat(depth);
    
    const lines = node.children.flatMap((child) => {
      const { key, type } = child;
      
      switch (type) {
        case 'added':
          return `${indent}  + ${key}: ${formatValue(child.value, depth + 1)}`;
        case 'removed':
          return `${indent}  - ${key}: ${formatValue(child.value, depth + 1)}`;
        case 'unchanged':
          return `${indent}    ${key}: ${formatValue(child.value, depth + 1)}`;
        case 'changed':
          return [
            `${indent}  - ${key}: ${formatValue(child.oldValue, depth + 1)}`,
            `${indent}  + ${key}: ${formatValue(child.newValue, depth + 1)}`
          ];
        case 'nested':
          return [
            `${indent}    ${key}: {`,
            iter(child, depth + 1),
            `${indent}    }`
          ];
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });

    return lines.join('\n');
  };

  const formatValue = (value, depth) => {
    if (value === null) return 'null';
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    if (typeof value !== 'object') return value;

    const indent = '    '.repeat(depth);
    const lines = Object.entries(value)
      .map(([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`);

    return `{\n${lines.join('\n')}\n${'    '.repeat(depth - 1)}}`;
  };

  return `{\n${iter(diff)}\n}`;
};

export default stylish;