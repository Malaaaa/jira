import { useState, useRef, useEffect } from "react";
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

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;
  // When the page loading: old title
  // After loading: new title
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * Pass in an object, and a collection of keys, and return the key-value pairs in the corresponding object
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/**
 * Returns the mounted status of the component, false
 * if it is not yet mounted or unmounted; otherwise, true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
