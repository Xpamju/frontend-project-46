import _ from 'lodash'

const buildDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort()
  return keys.map((key) => {
    if (!_.has(data2, key)) {
      return {
        key,
        type: 'removed',
        value: data1[key],
      }
    }
    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added', 
        value: data2[key],
      }
    }
    const value1 = data1[key]
    const value2 = data2[key]  
    if (_.isEqual(value1, value2)) {
      return {
        key,
        type: 'unchanged',
        value: value1,
      }
    }   
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(value1, value2)
      }
    }
    return {
      key,
      type: 'changed',
      oldValue: value1,
      newValue: value2,
    }
  })
}
const compare = (data1, data2) => ({
  type: 'root',
  children: buildDiff(data1, data2)
})

export default compare
