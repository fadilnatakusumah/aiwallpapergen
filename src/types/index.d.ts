declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
    timeoutList: Record<string, NodeJS.Timer>;
    gtag: (...any) => void;
  }
  namespace JSX {
    interface IntrinsicElements {
      "dotlottie-player": any;
    }
  }
}

export {};
