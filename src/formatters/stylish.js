import _ from 'lodash';

const formateValueToString = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const replacer = ' '.repeat(4 * depth);
  const result = value.map((item) => {
    const nestedValue = formateValueToString(item.value, depth + 1);
    return `${replacer}    ${item.name}: ${nestedValue}`;
  });
  return `{\n${result.join('\n')}\n${replacer}}`;
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const replacer = ' '.repeat(4 * depth - 2);
    const result = node.map((item) => {
      if (item.status === 'nested') {
        return `${replacer}  ${item.name}: {\n${iter(item.children, depth + 1)}\n${replacer}  }`;
      }
      if (item.status === 'deleted') {
        return `${replacer}- ${item.name}: ${formateValueToString(item.value, depth)}`;
      }
      if (item.status === 'added') {
        return `${replacer}+ ${item.name}: ${formateValueToString(item.value, depth)}`;
      }
      if (item.status === 'changed') {
        return `${replacer}- ${item.name}: ${formateValueToString(item.oldValue, depth)}\n${replacer}+ ${item.name}: ${formateValueToString(item.newValue, depth)}`;
      }
      if (item.status === 'unchanged') {
        return `${replacer}  ${item.name}: ${formateValueToString(item.value, depth)}`;
      }
      return '';
    });
    return result.join('\n');
  };

  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
