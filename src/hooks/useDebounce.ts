import { useCallback } from "react";

type ReturnType = {
  debounce: (callback: () => void, delay?: number) => void;
};

export const useDebounce = (): ReturnType => {
  return {
    debounce: useCallback((callback, delay = 500) => {
      const timeoutId = setTimeout(() => callback(), delay);
      return () => clearTimeout(timeoutId);
    }, []),
  };
};
