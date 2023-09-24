/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/entrar",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
