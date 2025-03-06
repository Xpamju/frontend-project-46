#!/usr/bin/env node
import { Command } from 'commander';
import start from '../src/half.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('output the version number')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    console.log(start(filepath1, filepath2));
  });

program.parse(console.log(process.argv));


