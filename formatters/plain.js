import _ from 'lodash';

const defineType = (value) => {
	let newValue;
	if (_.isObject(value)) {
		newValue = '[complex value]';
	} else if (typeof value === 'string') {
		newValue = `'${value}'`;
	} else {
		newValue = value;
	}
	return newValue;
};

const writeSituation = (happening, property, value1, value2) => {
  let result;
  switch (happening) {
    case 'added': {
			const newValue = defineType(value1);
      result = `Property '${property}' was added with value: ${newValue}`;
      break;
    }
    case 'removed': {
      result = `Property '${property}' was removed`;
      break;
    }
    case 'updated': {
      const newValue1 = defineType(value1);
      const newValue2 = defineType(value2);
      result = `Property '${property}' was updated. From ${newValue1} to ${newValue2}`;
      break;
    }
    default: throw new Error(`Invalid happening: ${happening}`);
  }
  return result;
};

const plain = (node) => {
	const iter = (tree, parent) => {
		const cb = (acc, item) => {
			const fullname = parent ? `${parent}.${item.name}` : item.name;
			let newAcc = acc;
			if (item.status === 'unchanged' && Array.isArray(item.children)) {
				newAcc = `${newAcc}${iter(item.children, fullname)}`;
				return newAcc;
			}
			if (item.status === 'deleted') {
				newAcc = `${newAcc}${writeSituation('removed', fullname)}\n`;
			}
			if (item.status === 'added') {
				const newValue = typeof item.value === 'string' ? String(item.value) : item.value;
				newAcc = `${newAcc}${writeSituation('added', fullname, newValue)}\n`;
			}
			if (item.status === 'changed') {
				newAcc = `${newAcc}${writeSituation('updated', fullname, item.oldValue, item.newValue)}\n`;
			}
			return newAcc;
		};
		const result = tree.reduce(cb, '');
		return result;
	};
	return iter(node).trim();
};

export default plain;
