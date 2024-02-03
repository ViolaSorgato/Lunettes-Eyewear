import { useState, useEffect } from "react";

// Custom hook for managing state in local storage
export default function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const [value, setValue] = useState<T>(() => {
    const fetchValue = localStorage.getItem(key);
    if (fetchValue != null) return JSON.parse(fetchValue);

    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  // Effect to update local storage whenever the key or value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
