import _ from 'lodash';

const compare = (data1, data2) => {
    const keys = _.union(Object.keys(data1), Object.keys(data2));
    const result = keys.sort().reduce((acc, key) => {
      if (_.has(data1, key) && !_.has(data2, key)) {
        acc += `  - ${key}: ${data1[key]}\n`;
      } else if (_.has(data2, key) && !_.has(data1, key)) {
        acc += `  + ${key}: ${data2[key]}\n`;
      } else if (_.isEqual(data1[key], data2[key])) {
        acc += `    ${key}: ${data1[key]}\n`;
      } else {
        acc += `  - ${key}: ${data1[key]}\n`;
        acc += `  + ${key}: ${data2[key]}\n`;
      }
      return acc;
    }, '');
    return `{\n${result}}`;
  };
export default compare;