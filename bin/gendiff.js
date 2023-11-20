#!/usr/bin/env node

import { program } from 'commander';
import fs, { readFileSync } from 'fs';
import path, { resolve } from 'path';
import _ from 'lodash';

const getPath = (filepath) => {
	const currentPath = process.cwd();
	if (path.isAbsolute(filepath)) {
		return `${currentPath}${filepath}`;
	} else {
		return path.resolve(currentPath, filepath);
	}
};

const readFile = (file) => JSON.parse(fs.readFileSync(getPath(file), { encoding: "utf-8" }));

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
	.argument('<filepath1>')
	.argument('<filepath2>')
	.option('-f, --format <type>', 'output format')
	.action((filepath1, filepath2) => {
		const obj1 = readFile(filepath1);
		const obj2 = readFile(filepath2);
		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);
		const generalKeys = _.union(keys1, keys2);
		const sortedKeys = _.sortBy(generalKeys);
		let result = '';
		const diff = sortedKeys.map((key) => {
			if (obj1[key] === obj2[key]) {
				result = `${result}    ${key}: ${obj1[key]}\n`;
			} else if (!Object.hasOwn(obj2, key)) {
				result = `${result}  - ${key}: ${obj1[key]}\n`;
			} else if (!Object.hasOwn(obj1, key)) {
				result = `${result}  + ${key}: ${obj2[key]}\n`;
			} else {
				result = `${result}  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
			}
		});
		result = `{\n${result}}`;
		console.log(result);
	})

program.parse();