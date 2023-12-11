import _ from 'lodash';

const formateValueToString = (value) => {
  if (!_.isObject(value)) {
    return String(value);
  }
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const replacer = ' '.repeat(4 * depth - 2);
    const result = node.map((item) => {
      // if (Object.hasOwn(item, 'children')) {
      //   return `${replacer}  ${item.name}: {\n${iter(item.children, depth + 1)}${replacer}  }\n`;
      // }
      if (item.status === 'deleted') {
        return `${replacer}- ${item.name}: ${formateValueToString(item.value)}`;
      }
      if (item.status === 'added') {
        return `${replacer}+ ${item.name}: ${formateValueToString(item.value)}`;
      }
      if (item.status === 'changed') {
        return `${replacer}- ${item.name}: ${formateValueToString(item.oldValue)}\n${replacer}+ ${item.name}: ${formateValueToString(item.newValue)}`;
      }
      if (item.status === 'unchanged') {
        return `${replacer}  ${item.name}: ${formateValueToString(item.value)}`;
      }
      return '';
    });
    return result.join('\n');
  };

  return `{\n${iter(tree, 1)}}`;
};

export default stylish;
