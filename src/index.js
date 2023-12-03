import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsingData from './parsers.js';
import chooseFormat from '../formatters/index.js';

const readFile = (filepath) => {
  const read = fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
  return parsingData(read, filepath);
};

const generateDifference = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = readFile(filepath1);
  const obj2 = readFile(filepath2);

  const createAST = (tree1, tree2, hasParents = false) => {
    const keys1 = Object.keys(tree1);
    const keys2 = Object.keys(tree2);
    const generalKeys = _.union(keys1, keys2);
    const sortedKeys = _.sortBy(generalKeys);

    const cb = (acc, key) => {
      const value1 = tree1[key];
      const value2 = tree2[key];
      const arrayOfObjects = [];
      if (Object.hasOwn(tree1, key) && Object.hasOwn(tree2, key)) {
        if (_.isObject(value1) && _.isObject(value2)) {
          const obj = {
            name: key,
            type: 'nested',
            status: 'unchanged',
            children: createAST(value1, value2),
          };
          arrayOfObjects.push(obj);
        } else if (value1 === value2) {
          const obj = {
            name: key,
            type: 'leaf',
            status: 'unchanged',
            value: value1,
          };
          arrayOfObjects.push(obj);
        } else {
          const obj = {
            name: key,
            status: 'changed',
            oldType: _.isObject(value1) ? 'nested' : 'leaf',
            newType: _.isObject(value2) ? 'nested' : 'leaf',
            oldValue: _.isObject(value1) ? createAST(value1, {}, true) : value1,
            newValue: _.isObject(value2) ? createAST({}, value2, true) : value2,
          };
          if (hasParents === true) {
            obj.status = 'unchanged';
          }
          arrayOfObjects.push(obj);
        }
        return [...acc, ...arrayOfObjects];
      }

      if (Object.hasOwn(tree1, key)) {
        const obj = {
          name: key,
          type: _.isObject(value1) ? 'nested' : 'leaf',
          status: 'deleted',
          value: _.isObject(value1) ? createAST(value1, {}, true) : value1,
        };
        if (hasParents === true) {
          obj.status = 'unchanged';
        }
        arrayOfObjects.push(obj);
      }

      if (Object.hasOwn(tree2, key)) {
        const obj = {
          name: key,
          type: _.isObject(value2) ? 'nested' : 'leaf',
          status: 'added',
          value: _.isObject(value2) ? createAST({}, value2, true) : value2,
        };
        if (hasParents === true) {
          obj.status = 'unchanged';
        }
        arrayOfObjects.push(obj);
      }
      return [...acc, ...arrayOfObjects];
    };

    const result = sortedKeys.reduce(cb, []);
    return result;
  };

  const diff = createAST(obj1, obj2);
  const formatDiff = chooseFormat(diff, format);
  return formatDiff;
};

export default generateDifference;
