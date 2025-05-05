/**
 * @typedef inputObject
 * @type {object}
 */

/**
 * @param {inputObject[]} list
 * @param {{
 *   key: keyof inputObject;
 *   order: '오름차순' | '내림차순';
 * }[]} options
 * @returns {inputObject[]}
 */
export default function sortObject(list, options) {
  return list.sort((obj1, obj2) =>
    options.reduce((prev, { key, order }) => {
      if (prev !== 0) {
        return prev;
      }

      const value1 = obj1[key];
      const value2 = obj2[key];

      // string
      if (typeof value1 === 'string' && typeof value2 === 'string') {
        const sort = value1.localeCompare(value2);

        if (order === '오름차순') {
          return sort;
        }

        return -sort;
      }

      // number
      if (typeof value1 === 'number' && typeof value2 === 'number') {
        return order === '오름차순' ? value1 - value2 : value2 - value1;
      }

      return 0;
    }, 0),
  );
}
