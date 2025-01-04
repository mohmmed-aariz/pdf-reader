// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//    // config options here 
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "256mb"
    }
  }
};

export default nextConfig;
