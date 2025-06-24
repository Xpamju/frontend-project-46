import { readFileSync } from 'fs'
import path from 'path'
import yaml from 'yaml'
import compare from './half.js'
import getFormatter from '../formatters/index.js'

const parseFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  const format = path.extname(fullPath).toLowerCase()
  const data = readFileSync(fullPath, 'utf-8')

  switch (format) {
    case '.json':
      return JSON.parse(data)
    case '.yml':
    case '.yaml':
      return yaml.parse(data)
    default:
      throw new Error(`Unsupported file format: ${format}`)
    };
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  try {
    const parsedData1 = parseFile(filepath1)
    const parsedData2 = parseFile(filepath2)
    const diff = compare(parsedData1, parsedData2)
    const formatter = getFormatter(format)
    return formatter(diff) // Возвращаем отформатированную строку
  } catch (error) {
    throw new Error(`Error while comparing files: ${error.message}`)
  };
}

export default genDiff
