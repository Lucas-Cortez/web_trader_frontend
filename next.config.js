/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/painel",
        permanent: false,
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
        source: "/painel/perfil",
        destination: "/dashboard/profile",
      },
      {
        source: "/painel/historico",
        destination: "/dashboard/history",
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
