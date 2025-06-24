const plain = (diff) => {
  const iter = (node, path = []) => {
    return node.children.flatMap((child) => {
      const currentPath = [...path, child.key]
      const property = currentPath.join('.')
      switch (child.type) {
        case 'added':
          return `Property '${property}' was added with value: ${formatValue(child.value)}`
        case 'removed':
          return `Property '${property}' was removed`
        case 'changed':
          return `Property '${property}' was updated. From ${formatValue(child.oldValue)} to ${formatValue(child.newValue)}`
        case 'nested':
          return iter(child, currentPath)
        case 'unchanged':
          return []
        default:
          throw new Error(`Unknown type: ${child.type}`)
      }
    }).join('\n')
  }
  return iter(diff)
}

const formatValue = (value) => {
  if (value === null) {
    return 'null'
  }
  if (typeof value === 'object') {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

export default plain
