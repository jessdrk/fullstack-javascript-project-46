#!/usr/bin/env node

import { program } from 'commander';
import generateDifference from '../src/genDiff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(generateDifference(filepath1, filepath2, options.format));
  });

program.parse();
