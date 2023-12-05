import _ from 'lodash';

const stylish = (tree) => {
  const iter = (node, depth) => {
    const replacer = ' '.repeat(4 * depth - 2);
    // Проверяю сработает ли условие в автотестах
    if (!Array.isArray(node)) {
      return `Ошибка в этом месте node: ${node} \n`;
    }

    const result = node.reduce((acc, item) => {
      const newAcc = (() => {
        if (Object.hasOwn(item, 'children')) {
          return `${replacer}  ${item.name}: {\n${iter(item.children, depth + 1)}${replacer}  }\n`;
        }
        if (item.status === 'deleted') {
          return _.isObject(item.value) ? `${replacer}- ${item.name}: {\n${iter(item.value, depth + 1)}${replacer}  }\n` : `${replacer}- ${item.name}: ${item.value}\n`;
        }
        if (item.status === 'added') {
          return _.isObject(item.value) ? `${replacer}+ ${item.name}: {\n${iter(item.value, depth + 1)}${replacer}  }\n` : `${replacer}+ ${item.name}: ${item.value}\n`;
        }
        if (item.status === 'changed') {
          if (_.isObject(item.oldValue)) {
            return `${replacer}- ${item.name}: {\n${iter(item.oldValue, depth + 1)}${replacer}  }\n${replacer}+ ${item.name}: ${String(item.newValue)}\n`;
          }
          if (_.isObject(item.newValue)) {
            return `${replacer}- ${item.name}: ${String(item.oldValue)}\n${replacer}+ ${item.name}: {\n${iter(item.newValue, depth + 1)}${replacer}  }\n`;
          }
          return `${replacer}- ${item.name}: ${String(item.oldValue)}\n${replacer}+ ${item.name}: ${String(item.newValue)}\n`;
        }
        if (item.status === 'unchanged') {
          return _.isObject(item.value) ? `${replacer}  ${item.name}: {\n${iter(item.value, depth + 1)}${replacer}  }\n` : `${replacer}  ${item.name}: ${item.value}\n`;
        }
        return '';
      })();
      return `${acc}${newAcc}`;
    }, '');
    return result;
  };

  return `{\n${iter(tree, 1)}}`;
};

export default stylish;
