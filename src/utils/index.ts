import { useState, useEffect } from "react";
import React from "react";
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// let a: object
// a = {name: 'jack'}
// a = () => {
// }
// a = new RegExp('')
//
// let b: { [key: string]: unknown }
// b = {name: 'Jack'}
// b = () => {}
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
// never change the object
export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key: string) => {
    // @ts-ignore
    const value = obj[key];
    if (isVoid(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
export const useDebounce = <v>(value: v, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // Set a timer after each value change
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // Execute each time after the last useEffect has been processed
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
