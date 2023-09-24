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
        source: "/painel/perfil",
        destination: "/dashboard/profile",
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
