import _ from 'lodash';

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