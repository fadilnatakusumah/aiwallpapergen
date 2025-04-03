// // @ts-nocheck
// /**
//  * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
//  * for Docker builds.
//  */
import { NextConfig } from "next";
import pack from "./package.json" with { type: "json" };
import "./src/env.js";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// /** @type {import("next").NextConfig} */
const config: NextConfig = {
  reactStrictMode: true,
  env: {
    version: pack.version,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default withNextIntl(config);
