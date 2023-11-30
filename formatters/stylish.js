const stylish = (tree) => {
  const iter = (node, depth) => {
    const replacer = ' '.repeat(4 * depth - 2);
    const cb = (acc, item) => {
      let newAcc;
      if (Object.hasOwn(item, 'children')) {
        newAcc = `${replacer}  ${item.name}: {\n${iter(item.children, depth + 1)}${replacer}  }\n`;
        return `${acc}${newAcc}`;
      }
      if (item.status === 'deleted') {
        if (item.type === 'nested') {
          newAcc = `${replacer}- ${item.name}: {\n${iter(item.value, depth + 1)}${replacer}  }\n`;
          return `${acc}${newAcc}`;
        }
        newAcc = `${replacer}- ${item.name}: ${item.value}\n`;
      }
      if (item.status === 'added') {
        if (item.type === 'nested') {
          newAcc = `${replacer}+ ${item.name}: {\n${iter(item.value, depth + 1)}${replacer}  }\n`;
          return `${acc}${newAcc}`;
        }
        newAcc = `${replacer}+ ${item.name}: ${item.value}\n`;
      }
      if (item.status === 'changed') {
        if (item.oldType === 'nested' || item.newType === 'nested') {
          newAcc = `${replacer}- ${item.name}: {\n${iter(item.oldValue, depth + 1)}${replacer}  }\n${replacer}+ ${item.name}: ${item.newValue}\n`;
          return `${acc}${newAcc}`;
        }
        newAcc = `${replacer}- ${item.name}: ${item.oldValue}\n${replacer}+ ${item.name}: ${item.newValue}\n`;
      }
      if (item.status === 'unchanged') {
        if (item.type === 'nested') {
          newAcc = `${replacer}  ${item.name}: {\n${iter(item.value, depth + 1)}${replacer}  }\n`;
          return `${acc}${newAcc}`;
        }
        newAcc = `${replacer}  ${item.name}: ${item.value}\n`;
      }
      return `${acc}${newAcc}`;
    };
    const result = node.reduce(cb, '');
    return result;
  };
  return `{\n${iter(tree, 1)}}`;
};

export default stylish;
