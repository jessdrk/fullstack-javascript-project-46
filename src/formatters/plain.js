import _ from 'lodash';

const defineFormattedValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const writeSituation = (happening, property, value1, value2) => {
  switch (happening) {
    case 'added': {
      const newValue = defineFormattedValue(value1);
      return `Property '${property}' was added with value: ${newValue}`;
    }
    case 'removed': {
      return `Property '${property}' was removed`;
    }
    case 'updated': {
      const newValue1 = defineFormattedValue(value1);
      const newValue2 = defineFormattedValue(value2);
      return `Property '${property}' was updated. From ${newValue1} to ${newValue2}`;
    }
    default: throw new Error(`Invalid happening: ${happening}`);
  }
};

const plain = (node) => {
  const iter = (tree, parent) => {
    const cb = (acc, item) => {
      const fullname = parent ? `${parent}.${item.name}` : item.name;
      if (item.status === 'nested') {
        return `${acc}${iter(item.children, fullname)}`;
      }
      if (item.status === 'deleted') {
        return `${acc}${writeSituation('removed', fullname)}\n`;
      }
      if (item.status === 'added') {
        const newValue = typeof item.value === 'string' ? String(item.value) : item.value;
        return `${acc}${writeSituation('added', fullname, newValue)}\n`;
      }
      if (item.status === 'changed') {
        return `${acc}${writeSituation('updated', fullname, item.oldValue, item.newValue)}\n`;
      }
      return acc;
    };
    const result = tree.reduce(cb, '');
    return result;
  };
  return iter(node).trim();
};

export default plain;
