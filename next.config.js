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
  async rewrites() {
    return [
      {
        source: "/painel",
        destination: "/dashboard",
      },
      {
        source: "/entrar",
        destination: "/signIn",
      },
      {
        source: "/cadastrar",
        destination: "/signUp",
      },
    ];
  },
};

module.exports = nextConfig;
