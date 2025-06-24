import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import path from 'path'
import compare from '../src/half.js'
import plain from '../formatters/plain.js'
import jsonFormatter from '../formatters/json.js'
import getFormatter from '../formatters/index.js'
import { exec } from 'child_process'
import stylish from '../formatters/stylish.js'

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cliPath = path.join(__dirname, '..', 'bin', 'gendiff.js')

const runCli = args => new Promise((resolve) => {
  exec(`node ${cliPath} ${args}`, (error, stdout, stderr) => {
    resolve({
      code: error ? error.code : 0,
      error,
      stdout,
      stderr,
    })
  })
})
describe('CLI', () => {
  test('should support plain format', async () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    const expected = readFileSync(getFixturePath('expected-json.txt'), 'utf-8')
    const { stdout } = await runCli(`${file1} ${file2}`)
    expect(stdout.trim()).toEqual(expected.trim())
  })

  test('should support plain format', async () => {
    const file1 = getFixturePath('file1.yml')
    const file2 = getFixturePath('file2.yml')
    const expected = readFileSync(getFixturePath('expected-yaml.txt'), 'utf-8')
    const { stdout } = await runCli(`${file1} ${file2}`)
    expect(stdout.trim()).toEqual(expected.trim())
  })

  test('should output stylish format by default', async () => {
    const file1 = getFixturePath('filenest1.json')
    const file2 = getFixturePath('filenest2.json')
    const expected = readFileSync(getFixturePath('expected.txt'), 'utf-8')
    const { stdout } = await runCli(`${file1} ${file2}`)
    expect(stdout.trim()).toEqual(expected.trim())
  })

  test('should support plain format', async () => {
    const file1 = getFixturePath('filenest1.json')
    const file2 = getFixturePath('filenest2.json')
    const expected = readFileSync(getFixturePath('expectedPlain.txt'), 'utf-8')
    const { stdout } = await runCli(`${file1} ${file2} --format=plain`)
    expect(stdout.trim()).toEqual(expected.trim())
  })

  test('should output stylish format by default', async () => {
    const file1 = getFixturePath('filenest1.yml')
    const file2 = getFixturePath('filenest2.yml')
    const expected = readFileSync(getFixturePath('expected.txt'), 'utf-8')
    const { stdout } = await runCli(`${file1} ${file2}`)
    expect(stdout.trim()).toEqual(expected.trim())
  })

  test('should support plain format', async () => {
    const file1 = getFixturePath('filenest1.yml')
    const file2 = getFixturePath('filenest2.yml')
    const expected = readFileSync(getFixturePath('expectedPlain.txt'), 'utf-8')
    const { stdout } = await runCli(`${file1} ${file2} --format=plain`)
    expect(stdout.trim()).toEqual(expected.trim())
  })

  test('should show error for non-existent file', async () => {
    const file1 = getFixturePath('nonexistent.json')
    const file2 = getFixturePath('file2.json')
    const { code, stderr } = await runCli(`${file1} ${file2}`)
    expect(code).not.toBe(0)
    expect(stderr).toMatch(/Error/)
  })
})

describe('Plain formatter', () => {
  test('formats added property', () => {
    const diff = {
      type: 'root',
      children: [
        {
          key: 'follow',
          type: 'added',
          value: false,
        },
      ],
    }
    expect(plain(diff)).toBe('Property "follow" was added with value: false')
  })

  test('formats removed property', () => {
    const diff = {
      type: 'root',
      children: [
        {
          key: 'timeout',
          type: 'removed',
          value: 50,
        },
      ],
    }
    expect(plain(diff)).toBe('Property "timeout" was removed')
  })

  test('formats changed property', () => {
    const diff = {
      type: 'root',
      children: [
        {
          key: 'verbose',
          type: 'changed',
          oldValue: true,
          newValue: false,
        },
      ],
    }
    expect(plain(diff)).toBe('Property "verbose" was updated. From true to false')
  })

  test('formats nested objects as [complex value]', () => {
    const diff = {
      type: 'root',
      children: [
        {
          key: 'settings',
          type: 'added',
          value: { option: 'value' },
        },
      ],
    }
    expect(plain(diff)).toBe('Property "settings" was added with value: [complex value]')
  })

  test('formats nested properties correctly', () => {
    const diff = {
      type: 'root',
      children: [
        {
          key: 'common',
          type: 'nested',
          children: [
            {
              key: 'setting1',
              type: 'changed',
              oldValue: 'value1',
              newValue: 'value2',
            }
          ],
        },
      ],
    }
    expect(plain(diff)).toBe("Property 'common.setting1' was updated. From 'value1' to 'value2'")
  })

  test('formats multiple changes correctly', () => {
    const diff = {
      type: 'root',
      children: [
        {
          key: 'follow',
          type: 'added',
          value: false
        },
        {
          key: 'timeout',
          type: 'removed',
          value: 50
        },
        {
          key: 'common',
          type: 'nested',
          children: [
            {
              key: 'setting',
              type: 'changed',
              oldValue: true,
              newValue: null,
            }
          ],
        },
      ],
    }
    const expected = [
      'Property "follow" was added with value: false',
      'Property "timeout" was removed',
      'Property "common.setting" was updated. From true to null'
    ].join('\n')
    expect(plain(diff)).toBe(expected)
  })

  test('formats string values with quotes', () => {
    const diff = {
      type: 'root',
      children: [
        {
          key: 'message',
          type: 'added',
          value: 'hello',
        },
      ],
    }
    expect(plain(diff)).toBe('Property "message" was added with value: "hello"')
  })

  test('formats null values correctly', () => {
    const diff = {
      type: 'root',
      children: [
        {
          key: 'value',
          type: 'added',
          value: null,
        },
      ],
    }
    expect(plain(diff)).toBe('Property "value" was added with value: null')
  })

  test('ignores unchanged properties', () => {
    const diff = {
      type: 'root',
      children: [
        {
          key: 'unchanged',
          type: 'unchanged',
          value: 'same',
        },
        {
          key: 'changed',
          type: 'changed',
          oldValue: 'old',
          newValue: 'new',
        },
      ],
    }
    expect(plain(diff)).toBe('Property "changed" was updated. From "old" to "new"')
  })
})
// тесты для стайлиш ////////////////////////////////////
describe('Stylish formatter', () => {
  test('formats added primitive property', () => {
    const diff = {
      type: 'root',
      children: [{
        key: 'timeout',
        type: 'added',
        value: 100,
      }],
    }
    const expected = [
      '{',
      '  + timeout: 100',
      '}',
    ].join('\n')
    expect(stylish(diff)).toEqual(expected)
  })
  test('formats removed nested object', () => {
    const diff = {
      type: 'root',
      children: [{
        key: 'settings',
        type: 'removed',
        value: { debug: true, level: 'info' },
      }],
    }
    const expected = [
      '{',
      '  - settings: {',
      '        debug: true',
      '        level: info',
      '    }',
      '}'
    ].join('\n')
    expect(stylish(diff)).toEqual(expected)
  })

  test('formats changed property with different types', () => {
    const diff = {
      type: 'root',
      children: [{
        key: 'verbose',
        type: 'changed',
        oldValue: false,
        newValue: [1, 2, 3],
      }],
    }

    const expected = [
      '{',
      '  - verbose: false',
      '  + verbose: [1, 2, 3]',
      '}',
    ].join('\n')
    expect(stylish(diff)).toEqual(expected)
  })

  test('formats deeply nested structures', () => {
    const diff = {
      type: 'root',
      children: [{
        key: 'common',
        type: 'nested',
        children: [{
          key: 'setting1',
          type: 'unchanged',
          value: 'value1'
        }, {
          key: 'setting2',
          type: 'nested',
          children: [{
            key: 'deep',
            type: 'changed',
            oldValue: { enabled: false },
            newValue: { enabled: true },
          }],
        }],
      }],
    }
    const expected = [
      '{',
      '    common: {',
      '        setting1: value1',
      '        setting2: {',
      '          - deep: {',
      '                enabled: false',
      '            }',
      '          + deep: {',
      '                enabled: true',
      '            }',
      '        }',
      '    }',
      '}',
    ].join('\n')
    expect(stylish(diff)).toEqual(expected)
  })

  test('formats empty object correctly', () => {
    const diff = {
      type: 'root',
      children: [{
        key: 'empty',
        type: 'added',
        value: {},
      }],
    };

    const expected = [
      '{',
      '  + empty: {}',
      '}',
    ].join('\n')
    expect(stylish(diff)).toEqual(expected)
  })

  test('handles special characters in strings', () => {
    const diff = {
      type: 'root',
      children: [{
        key: 'message',
        type: 'added',
        value: 'Hello\nWorld!',
      }],
    }
    const expected = [
      '{',
      '  + message: "Hello\\nWorld!"',
      '}'
    ].join('\n');
    expect(stylish(diff)).toEqual(expected)
  })
})
// индекс js в forrmattere //////// 
describe('Formatter factory', () => {
  test('returns stylish formatter for "stylish" format', () => {
    const formatter = getFormatter('stylish')
    expect(formatter).toBe(stylish)
  })

  test('returns plain formatter for "plain" format', () => {
    const formatter = getFormatter('plain')
    expect(formatter).toBe(plain)
  })

  test('throws error for unknown format', () => {
    expect(() => getFormatter('unknown')).toThrow('Unknown format: unknown')
  })

  test('formatters produce correct output', () => {
    const testDiff = {
      type: 'root',
      children: [{
        key: 'key',
        type: 'added',
        value: 'value',
      }]
    }
    const stylishFormatter = getFormatter('stylish')
    expect(stylishFormatter(testDiff)).toMatch('+ key: value')
    const plainFormatter = getFormatter('plain')
    expect(plainFormatter(testDiff)).toMatch("was added with value")
  })
  // Можно добавить тест для json, когда он будет реализован
  test.todo('returns json formatter for "json" format')
})

// half.js ///////
describe('compare', () => {
  test('should detect added properties', () => {
    const obj1 = {};
    const obj2 = { newKey: 'value' }
    const result = compare(obj1, obj2)
    expect(result.children).toContainEqual({
      key: 'newKey',
      type: 'added',
      value: 'value',
      depth: 1,
    })
  })

  test('should detect removed properties', () => {
    const obj1 = { oldKey: 'value' }
    const obj2 = {}
    const result = compare(obj1, obj2)
    expect(result.children).toContainEqual({
      key: 'oldKey',
      type: 'removed',
      value: 'value',
      depth: 1,
    })
  })

  test('should detect unchanged properties', () => {
    const obj1 = { sameKey: 'value' }
    const obj2 = { sameKey: 'value' }
    const result = compare(obj1, obj2)
    expect(result.children).toContainEqual({
      key: 'sameKey',
      type: 'unchanged',
      value: 'value',
      depth: 1,
    })
  })

  test('should detect changed properties', () => {
    const obj1 = { key: 'old' }
    const obj2 = { key: 'new' }
    const result = compare(obj1, obj2)
    expect(result.children).toContainEqual({
      key: 'key',
      type: 'changed',
      oldValue: 'old',
      newValue: 'new',
      depth: 1,
    })
  })

  test('should handle nested objects', () => {
    const obj1 = { nested: { key: 'value' } }
    const obj2 = { nested: { key: 'changed' } }
    const result = compare(obj1, obj2)
    expect(result.children[0]).toMatchObject({
      key: 'nested',
      type: 'nested',
      depth: 1,
    })
    expect(result.children[0].children).toContainEqual({
      key: 'key',
      type: 'changed',
      oldValue: 'value',
      newValue: 'changed',
      depth: 2,
    })
  })

  test('should sort keys alphabetically', () => {
    const obj1 = { b: 1, a: 1 }
    const obj2 = { a: 1, c: 1 }
    const result = compare(obj1, obj2)
    const keys = result.children.map(node => node.key)
    expect(keys).toEqual(['a', 'b', 'c'])
  });

  test('should build correct structure for complex objects', () => {
    const obj1 = {
      common: { setting1: 'Value 1', setting2: 200 },
      group1: { a: 'a' },
    }
    const obj2 = {
      common: { setting1: 'Value 1', setting3: true },
      group2: { b: 'b' },
    }
    const result = compare(obj1, obj2)
    expect(result).toEqual({
      type: 'root',
      children: [
        {
          key: 'common',
          type: 'nested',
          depth: 1,
          children: [
            {
              key: 'setting1',
              type: 'unchanged',
              value: 'Value 1',
              depth: 2,
            },
            {
              key: 'setting2',
              type: 'removed',
              value: 200,
              depth: 2,
            },
            {
              key: 'setting3',
              type: 'added',
              value: true,
              depth: 2,
            },
          ],
        },
        {
          key: 'group1',
          type: 'removed',
          value: { a: 'a' },
          depth: 1,
        },
        {
          key: 'group2',
          type: 'added',
          value: { b: 'b' },
          depth: 1,
        },
      ],
    })
  })

  test('should handle empty objects', () => {
    const result = compare({}, {})
    expect(result).toEqual({
      type: 'root',
      children: [],
    })
  })
})

describe('JSON formatter', () => {
  test('formats simple diff to JSON string', () => {
    const diff = {
      type: 'root',
      children: [
        {
          key: 'key',
          type: 'added',
          value: 'value',
        },
      ],
    }
    const result = jsonFormatter(diff)
    expect(result).toBe(JSON.stringify(diff, null, 2))
  })

  test('formats complex nested diff to JSON', () => {
    const diff = {
      type: 'root',
      children: [
        {
          key: 'nested',
          type: 'nested',
          children: [
            {
              key: 'inner',
              type: 'changed',
              oldValue: 'old',
              newValue: 'new',
            },
          ],
        },
      ],
    }
    const result = jsonFormatter(diff)
    expect(result).toMatchSnapshot()
  })

  test('handles empty diff correctly', () => {
    const diff = {
      type: 'root',
      children: [],
    }
    const result = jsonFormatter(diff)
    expect(result).toBe('{\n  "type": "root",\n  "children": []\n}')
  })

  test('maintains proper indentation', () => {
    const diff = {
      type: 'root',
      children: [
        {
          key: 'test',
          type: 'unchanged',
          value: 123,
        },
      ],
    }
    const result = jsonFormatter(diff)
    const lines = result.split('\n')
    expect(lines[0]).toBe('{')
    expect(lines[1]).toBe('  "type": "root",')
    expect(lines[2]).toBe('  "children": [')
    expect(lines[3]).toBe('    {')
  })

  test('preserves all diff properties', () => {
    const diff = {
      type: 'root',
      children: [
        {
          key: 'prop',
          type: 'changed',
          oldValue: 1,
          newValue: 2,
          customProp: 'test',
        },
      ],
    }
    const result = jsonFormatter(diff)
    expect(result).toContain('"customProp": "test"')
  })
})
