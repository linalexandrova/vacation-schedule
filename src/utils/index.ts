export function convertObjectToArray<T>(obj: object): T[] {
  const arr = [];
  for (const [key, value] of Object.entries(obj)) {
    arr.push({ ...value!, id: key });
  }
  return arr;
}
