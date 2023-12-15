import _ from 'lodash';

const defineFormattedValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (node) => {
  const iter = (tree, parent) => {
    const cb = (acc, item) => {
      const fullname = parent ? `${parent}.${item.name}` : item.name;
      if (item.status === 'nested') {
        return `${acc}${iter(item.children, fullname)}`;
      }
      if (item.status === 'deleted') {
        return `${acc}Property '${fullname}' was removed\n`;
      }
      if (item.status === 'added') {
        const newValue = defineFormattedValue(item.value);
        return `${acc}Property '${fullname}' was added with value: ${newValue}\n`;
      }
      if (item.status === 'changed') {
        const newValue1 = defineFormattedValue(item.oldValue);
        const newValue2 = defineFormattedValue(item.newValue);
        return `${acc}Property '${fullname}' was updated. From ${newValue1} to ${newValue2}\n`;
      }
      return acc;
    };
    const result = tree.reduce(cb, '');
    return result;
  };
  return iter(node).trim();
};

export default plain;
