import _ from 'lodash';
const formatValue = (value, depth) => {
    if (_.isPlainObject(value)) {
      const innerIndent = '    '.repeat(depth);
      const formatted = Object.entries(value)
        .map(([k, v]) => `${innerIndent}${k}: ${formatValue(v, depth + 1)}`)
        .join('\n');
      return `{\n${formatted}\n${'    '.repeat(depth - 1)}}`;
    }
    if (_.isArray(value)) {
      return `[${value.map(v => formatValue(v, depth)).join(', ')}]`;
    }
    return String(value);
  };

export default formatValue;