// // src/hooks/useMyTranslation.ts
// "use client";

// import { useTranslate } from "@tolgee/react";
// import { Formats, useTranslations } from "next-intl";
// import { Fragment, type ReactNode } from "react";

// import { env } from "~/env";

// type CombinedOptions<T> = Record<string, T>;

// /**
//  * A unified translation function interface that supports:
//  * - t(key, options)
//  * - t.rich(key, options)
//  * - t.markup(key, options)
//  */
// type TranslateFunction = ((
//   keyTranslation: string,
//   options?: Record<string, string | number | Date>,
//   formats?: Formats,
// ) => string) & {
//   rich: (
//     keyTranslation: string,
//     options: Record<
//       string,
//       string | number | Date | ((chunks: ReactNode) => ReactNode)
//     >,
//   ) => ReactNode;
// };
// /**
//  * A custom hook that returns a translation function abstracting between Tolgee and next‑intl.
//  *
//  * It chooses the underlying implementation based on the environment variable NEXT_PUBLIC_USE_TOLGEE.
//  */
// export default function useMyTranslation(key: string): {
//   t: TranslateFunction;
// } {
//   const isUseTolgee = env.NEXT_PUBLIC_USE_TOLGEE === "true";
//   const { t: tTolgee } = useTranslate();
//   const tNextIntl = useTranslations(key);

//   // Start with either tTolgee or tNextIntl, casting to our TranslateFunction type.
//   // let t: TranslateFunction = (
//   //   isUseTolgee ? tTolgee : tNextIntl
//   // ) as TranslateFunction;

//   // if (isUseTolgee) {
//   //   // Override `t` for Tolgee mode.
//   //   t = ((keyTranslation: string) =>
//   //     tTolgee(`${key}.${keyTranslation}`)) as TranslateFunction;

//   //   t.rich = (
//   //     keyTranslation: string,
//   //     options: Record<
//   //       string,
//   //       string | number | Date | ((chunks: ReactNode) => ReactNode)
//   //     >,
//   //   ): ReactNode => {
//   //     if (options === undefined) {
//   //       return tTolgee(`${key}.${keyTranslation}`);
//   //     }
//   //     return tTolgee(
//   //       `${key}.${keyTranslation}`,
//   //       "", // or adjust if needed
//   //       options,
//   //     );
//   //   };
//   // }

//   // Start with either Tolgee or next-intl translation function.
//   let t: TranslateFunction = (
//     isUseTolgee ? tTolgee : tNextIntl
//   ) as TranslateFunction;

//   if (isUseTolgee) {
//     // Override t for Tolgee mode.
//     t = ((keyTranslation: string) =>
//       tTolgee(`${key}.${keyTranslation}`)) as TranslateFunction;

//     t.rich = (
//       keyTranslation: string,
//       options: Record<
//         string,
//         string | number | Date | ((chunks: ReactNode) => ReactNode)
//       >,
//     ): ReactNode => {
//       // If options is falsy, simply call tTolgee.
//       if (!options) {
//         return tTolgee(`${key}.${keyTranslation}`);
//       }

//       // Build a new combinedOptions object by transforming function values.
//       const combinedOptions: CombinedOptions<ReactNode> = {};
//       for (const optionKey of Object.keys(options)) {
//         const optionValue = options[optionKey];
//         if (typeof optionValue === "function") {
//           combinedOptions[optionKey] = optionValue(
//             <Fragment>{`${optionKey}.${keyTranslation}`}</Fragment>,
//           );
//         } else {
//           combinedOptions[optionKey] = optionValue;
//         }
//       }

//       // Here, we assume tTolgee expects the third argument to be CombinedOptions<ReactNode>
//       return tTolgee(
//         `${key}.${keyTranslation}`,
//         // Using a fallback string if options is not a string.
//         typeof options === "string" ? options : `${key}.${keyTranslation}`,
//         combinedOptions,
//       );
//     };

//     t.markup = (
//       keyTranslation: string,
//       options?: Record<string, string | number | Date>,
//     ): ReactNode => tTolgee(`${key}.${keyTranslation}`, options);
//   }

//   return { t };

//   // const t: unknown = isUseTolgee ? tTolgee : tNextIntl;

//   // if (isUseTolgee) {
//   //   (t as TranslateFunction).rich = (
//   //     keyTranslation: string,
//   //     options: {
//   //       [key: string]: string | number | Date;
//   //     },
//   //   ) => {
//   //     if (options === undefined) return tTolgee(`${key}.${keyTranslation}`);

//   //     return tTolgee(`${key}.${keyTranslation}`, "", options);
//   //   };
//   // }

//   // if (useTolgeeMode) {
//   //   t = (keyTranslation: string) => tTolgee(`${key}.${keyTranslation}`);
//   //   t.rich = (
//   //     keyTranslation: string,
//   //     options?: Record<string, (el: ReactNode) => ReactNode>,
//   //   ) => {
//   //     if (options === undefined) return tTolgee(`${key}.${keyTranslation}`);

//   //     return tTolgee(
//   //       `${key}.${keyTranslation}`,
//   //       typeof options === "string" ? options : `${key}.${keyTranslation}`,
//   //       ((): CombinedOptions<ReactNode> => {
//   //         const keysObjects: Record<string, any> = {};
//   //         Object.keys(options!).forEach((key) => {
//   //           keysObjects[key] = options![key] ?? (
//   //             <Fragment
//   //               key={`${key}.${keyTranslation}`}
//   //             >{`${key}.${keyTranslation}`}</Fragment>
//   //           );
//   //         });
//   //         return keysObjects;
//   //       })() as CombinedOptions<any>,
//   //     );
//   //   };
//   //   t.markup = (keyTranslation: string, options?: any) =>
//   //     tTolgee(`${key}.${keyTranslation}`, options);
//   // }

//   return { t } as { t: TranslateFunction };
// }

"use client";

import { useTranslate } from "@tolgee/react";
import { type Formats, useTranslations } from "next-intl";
import { type ReactNode } from "react";
import { env } from "~/env";

/**
 * A unified translation function interface that supports:
 * - t(key, options)
 * - t.rich(key, options)
 * - t.markup(key, options)
 */
type TranslateFunction = ((
  keyTranslation: string,
  options?: Record<string, string | number | Date>,
  formats?: Formats,
) => string) & {
  rich: (
    keyTranslation: string,
    options?: Record<
      string,
      string | number | Date | ((chunks: ReactNode) => ReactNode)
    >,
  ) => ReactNode;
  markup?: (
    keyTranslation: string,
    options?: Record<string, string | number | Date>,
  ) => ReactNode;
};

export default function useMyTranslation(key: string): {
  t: TranslateFunction;
} {
  const isUseTolgee = env.NEXT_PUBLIC_USE_TOLGEE !== "true";
  const { t: tTolgee } = useTranslate();
  const keyForNextIntl = isUseTolgee ? "common" : key;
  const tNextIntl = useTranslations(keyForNextIntl);

  // Start with either Tolgee or next‑intl translation function.
  let t: TranslateFunction = (
    isUseTolgee ? tTolgee : tNextIntl
  ) as TranslateFunction;

  if (isUseTolgee) {
    // Override t for Tolgee mode.
    t = ((keyTranslation: string) =>
      tTolgee(`${key}.${keyTranslation}`)) as TranslateFunction;

    t.rich = (keyTranslation: string, options: any, ...args): ReactNode => {
      if (!options) {
        return (
          <span
            dangerouslySetInnerHTML={{
              __html: tTolgee(`${key}.${keyTranslation}`),
            }}
          ></span>
        );
        // return tTolgee(`${key}.${keyTranslation}`, "", options);
      }

      // Build a new combinedOptions object using Tolgee's CombinedOptions type.
      // const combinedOptions: any = {};

      // for (const optionKey of Object.keys(options)) {
      //   const value = options[optionKey];
      //   if (value === undefined) continue; // Skip undefined values
      //   if (typeof value === "function") {
      //     combinedOptions[optionKey] = (chunks: ReactNode) => (
      //       <Fragment key={`${key}-${optionKey}-${keyTranslation}`}>
      //         {value(chunks)}
      //       </Fragment>
      //     );
      //   } else {
      //     combinedOptions[optionKey] = value as DefaultParamType;
      //   }
      // }

      // return tTolgee(
      //   `${key}.${keyTranslation}`,
      //   typeof options === "string" ? options : `${key}.${keyTranslation}`,
      //   ((): CombinedOptions<ReactNode> => {
      //     const keysObjects: Record<string, any> = {};
      //     Object.keys(options!).forEach((key) => {
      //       keysObjects[key] = options![key] ?? (
      //         <Fragment
      //           key={`${key}.${keyTranslation}`}
      //         >{`${key}.${keyTranslation}`}</Fragment>
      //       );
      //     });
      //     return keysObjects;
      //   })() as CombinedOptions<any>,
      // );

      // Pass the transformed options to tTolgee.
      return tTolgee(`${key}.${keyTranslation}`, "", options, ...args);
    };

    t.markup = (
      keyTranslation: string,
      options?: Record<string, string | number | Date>,
    ): ReactNode => tTolgee(`${key}.${keyTranslation}`, options);
  }

  const oldT = t.rich;

  t.rich = (keyTranslation: string, options: any, ...args): ReactNode => {
    // if (!options) {
    //   // isThereOptions = false;
    //   return (
    //     <span
    //       dangerouslySetInnerHTML={{
    //         __html: t(`${keyTranslation}`),
    //       }}
    //     ></span>
    //   );
    // }
    return oldT(`${keyTranslation}`, options, ...args);
  };

  return { t };
}
