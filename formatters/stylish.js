import _ from 'lodash'

const stylish = (diff) => {
  const iter = (node, depth = 1) => {
    const indent = '    '.repeat(depth - 1)
    const lines = node.children.map((child) => {
      switch (child.type) {
        case 'added':
          return `${indent}  + ${child.key}: ${formatValue(child.value, depth + 1)}`
        case 'removed':
          return `${indent}  - ${child.key}: ${formatValue(child.value, depth + 1)}`
        case 'unchanged':
          return `${indent}    ${child.key}: ${formatValue(child.value, depth + 1)}`
        case 'changed':
          return [
            `${indent}  - ${child.key}: ${formatValue(child.oldValue, depth + 1)}`,
            `${indent}  + ${child.key}: ${formatValue(child.newValue, depth + 1)}`,
          ].join('\n')
        case 'nested':
          return `${indent}    ${child.key}: {\n${iter(child, depth + 1)}\n${indent}    }`
        default:
          throw new Error(`Unknown type: ${child.type}`)
      }
    })
    return lines.join('\n')
  }
  return `{\n${iter(diff)}\n}`
}

const formatValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    const indent = '    '.repeat(depth)
    const lines = Object.entries(value).map(
      ([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`,
    )
    return `{\n${lines.join('\n')}\n${'    '.repeat(depth - 1)}}`
  }
  return String(value)
}

export default stylish
