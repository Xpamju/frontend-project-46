import stylish from './stylish.js';
import plain from './plain.js';
// import json from './json.js';

const formatters = {
  stylish,
  plain,
};

export default (format) => {
  const formatter = formatters[format];
  if (!formatter) {
    throw new Error(`Unknown format: ${format}`);
  }
  return formatter;
};
