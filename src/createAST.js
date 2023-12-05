import _ from 'lodash';

const createAST = (tree1, tree2, hasParents = false) => {
  const keys1 = Object.keys(tree1);
  const keys2 = Object.keys(tree2);
  const generalKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(generalKeys);

  const cb = (acc, key) => {
    const value1 = tree1[key];
    const value2 = tree2[key];
    if (Object.hasOwn(tree1, key) && Object.hasOwn(tree2, key)) {
      if (_.isObject(value1) && _.isObject(value2)) {
        const obj = {
          name: key,
          type: 'nested',
          status: 'unchanged',
          children: createAST(value1, value2),
        };
        return [...acc, obj];
      } if (value1 === value2) {
        const obj = {
          name: key,
          type: 'leaf',
          status: 'unchanged',
          value: value1,
        };
        return [...acc, obj];
      }
      const obj = {
        name: key,
        status: hasParents ? 'unchanged' : 'changed',
        oldType: _.isObject(value1) ? 'nested' : 'leaf',
        newType: _.isObject(value2) ? 'nested' : 'leaf',
        oldValue: _.isObject(value1) ? createAST(value1, {}, true) : value1,
        newValue: _.isObject(value2) ? createAST({}, value2, true) : value2,
      };
      return [...acc, obj];
    }

    if (Object.hasOwn(tree1, key)) {
      const obj = {
        name: key,
        type: _.isObject(value1) ? 'nested' : 'leaf',
        status: hasParents ? 'unchanged' : 'deleted',
        value: _.isObject(value1) ? createAST(value1, {}, true) : value1,
      };
      return [...acc, obj];
    }

    if (Object.hasOwn(tree2, key)) {
      const obj = {
        name: key,
        type: _.isObject(value2) ? 'nested' : 'leaf',
        status: hasParents ? 'unchanged' : 'added',
        value: _.isObject(value2) ? createAST({}, value2, true) : value2,
      };
      return [...acc, obj];
    }
    return [...acc];
  };

  const result = sortedKeys.reduce(cb, []);
  return result;
};

export default createAST;
