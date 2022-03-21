import { useState, useEffect } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
// never change the object
export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key: string) => {
    // @ts-ignore
    const value = obj[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
export const useDebounce = (value: unknown, delay?: number): any => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // Set a timer after each value change
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // Execute each time after the last useEffect has been processed
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
