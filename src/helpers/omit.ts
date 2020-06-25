/**
 * Omit object by keys.
 *
 * @param object Object.
 * @param keys Keys array.
 */
export const omit = <T, K extends keyof T>(object: T, keys: K[]): Omit<T, K> =>
  Object.entries(object)
    .filter(([key]) => !keys.includes(key as K))
    .reduce(
      (obj, [key, value]) => Object.assign(obj, { [key]: value }),
      {}
    ) as Omit<T, K>
