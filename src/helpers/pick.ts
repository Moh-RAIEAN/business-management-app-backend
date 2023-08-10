const pick = <T extends object, k extends keyof T>(
  obj: T,
  fileds: k[],
): Partial<T> => {
  const properties: Partial<T> = {};
  fileds.forEach((filed) => {
    if (obj && Object.hasOwnProperty.call(obj, filed)) {
      properties[filed] = obj[filed];
    }
  });
  return properties;
};

export default pick;
