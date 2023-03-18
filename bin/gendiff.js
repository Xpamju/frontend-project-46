#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .name('gendiff')
  .option('-f, --format <type>', 'output format')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0');
 
  


program.parse();

