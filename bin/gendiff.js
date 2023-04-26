#!/usr/bin/env node
import { Command } from 'commander';
import { obj } from '../src/genDiff.js';

const program = new Command();

program
  .version('0.8.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    console.log(obj(filepath1, filepath2));
  });

program.parse(process.argv);
