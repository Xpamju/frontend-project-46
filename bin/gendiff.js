#!/usr/bin/env node
import { Command } from 'commander';
// import compare from '../src/half.js';
import parseAndRead from '../src/parsers.js';
import getFormatter from '../formatters/index.js';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('output the version number')
  .option('-f, --format <type>', 'output format (stylish, plain, json)', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    try {
      // Получаем неотформатированный diff
      const diff = parseAndRead(filepath1, filepath2);
      // Получаем нужный форматтер
      const format = getFormatter(options.format);
      // Форматируем и выводим результат
      console.log(format(diff));
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);

// const program = new Command();

// program
//   .name('gendiff')
//   .description('Compares two configuration files and shows a difference.')
//   .version('output the version number')
//   .option('-f, --format [type]', 'output format', 'stylish')
//   .argument('<filepath1>')
//   .argument('<filepath2>')
//   .action((filepath1, filepath2) => {
//     console.log(parseAndRead(filepath1, filepath2));
//   });
//   // .action((filepath1, filepath2, options) => {
//   //   const diff = parseAndRead(filepath1, filepath2);
//   //   const formattedDiff = formatValue(diff, 1); // Применяем форматирование
//   //   console.log(formattedDiff);
//   // })

// program.parse((process.argv));


