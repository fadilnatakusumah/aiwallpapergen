import { Ref, type RefObject, useEffect } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement | HTMLDivElement | null>,
  handler: (event: Event) => void,
) => {
  useEffect(() => {
    let startedInside: HTMLElement | HTMLDivElement | boolean | null = null;
    let startedWhenMounted: HTMLElement | HTMLDivElement | null = null;

    const listener = (event: Event) => {
      if (startedInside || !startedWhenMounted) return;
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      handler(event);
    };

    const validateEventStart = (event: Event) => {
      startedWhenMounted = ref.current;
      startedInside = ref.current
        ? ref.current?.contains(event.target as Node)
        : null;
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
