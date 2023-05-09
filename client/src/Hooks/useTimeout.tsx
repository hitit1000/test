import { useEffect, useRef } from "react";

interface IUseInterval {
  (callback: () => void, delay: number): void;
}
const useTimeout: IUseInterval = (callback, delay) => {
  const savedCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};

export default useTimeout;
