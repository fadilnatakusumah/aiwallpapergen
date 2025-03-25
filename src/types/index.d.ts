declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    timeoutList: Record<string, NodeJS.Timer>;
    gtag: (...args) => void;
  }
  namespace JSX {
    interface IntrinsicElements {
      "dotlottie-player": unknown;
    }
  }
}

export {};
