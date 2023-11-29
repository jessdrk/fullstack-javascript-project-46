import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsingData from './parsers.js';
import formater from './stylish.js';

const getPath = (filepath) => {
  const currentPath = process.cwd();
  if (path.isAbsolute(filepath)) {
    return `${currentPath}${filepath}`;
  }
  return path.resolve(currentPath, filepath);
};

const readFile = (file) => {
  const read = fs.readFileSync(getPath(file), { encoding: 'utf-8' });
  return parsingData(read, file);
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
      let newAcc;
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
        newAcc = [...acc, ...arrayOfObjects];
        return newAcc;
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
      newAcc = [...acc, ...arrayOfObjects];
      return newAcc;
    };

    const result = sortedKeys.reduce(cb, []);
    return result;
  };

  let diff = createAST(obj1, obj2);
  if (format === 'stylish') {
    diff = formater(diff);
  }
  return diff;
};

export default generateDifference;
