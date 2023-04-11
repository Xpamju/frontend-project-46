import { readFileSync } from 'fs';
import _ from 'lodash';
 //entries

// const newobj = (data1, data2) => {

//   // const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])]
//   const keys = _.union(Object.keys(data1), Object.keys(data2)) // массив массивчиков

//   return keys.reduce((result, key) => {
//     if (_.has(data1, key) && (!_.has(data2, key))) {
//        result.push([`- ${key}: ${data1[key]}`])
//        return result
//       }
//       if (_.has(data2, key) && (!_.has(data1, key))) {
//          result.push([`+ ${key}: ${data2[key]}`])
//          return result
//       }
//      if (data1[key] === data2[key]) {
//       result.push([`${key}: ${data1[key]}`]);
//       return result
//      }
  
//      result.push([`- ${key}: ${data1[key]}`]);
//      result.push([`+ ${key}: ${data2[key]}`])
//     return result
   
// }, []) 
// }

const newobj = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));

  const result = keys.reduce((acc, key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      acc[`- ${key}`] = data1[key];
    } else if (_.has(data2, key) && !_.has(data1, key)) {
      acc[`+ ${key}`] = data2[key];
    } else if (_.isEqual(data1[key], data2[key])) {
      acc[key] = data1[key];
    } else {
      acc[`- ${key}`] = data1[key];
      acc[`+ ${key}`] = data2[key];
    }

    return acc;
  }, {});

  return result;
};

// function getDifference(a, b) {
//   return [...new Set([...Object.keys(a), ...Object.keys(b)])].reduce((r, k) => {
//       if (k in a && !(k in b)) {
//           r.push([`- ${k}`, a[k]]);
//           return r;
//       }

//       if (!(k in a) && k in b) {
//           r.push([`+ ${k}`, b[k]]);
//           return r;
//       }

//       if (a[k] === b[k]) {
//         r.push([k, a[k]]);

//         return r;
//       };

//       r.push([`- ${k}`, a[k]]);
//       r.push([`+ ${k}`, b[k]]);
//       return r;
//   }, []);
// }


JSON.stringify(newobj(data1, data2))

const obj = (filepath1, filepath2) => {

    const data1 = readFileSync(filepath1, 'utf-8');
    const data2 = readFileSync(filepath2, 'utf-8');
    const dataPparsed1 = JSON.parse(data1);
    const dataPparsed2 = JSON.parse(data2);
    console.log(newobj(dataPparsed1,dataPparsed2))
}
 export default obj; 