#!/usr/bin/env node
import { Command } from 'commander';
import he from "../src/half.js";

console.log(he)

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('output the version number')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1> <filepath2>')
program.parse();