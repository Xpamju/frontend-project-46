#!/usr/bin/env node
import { Command } from 'commander';
// import compare from '../src/half.js';
import parseAndRead from '../src/parsers.js';
import formatValue from '../src/stylish.js';


const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  // .action((filepath1, filepath2) => {
  //   console.log(parseAndRead(filepath1, filepath2));
  // });
  .action((filepath1, filepath2, options) => {
    const diff = parseAndRead(filepath1, filepath2);
    const formattedDiff = formatValue(diff, 1); // Применяем форматирование
    console.log(formattedDiff);
  })

program.parse((process.argv));


