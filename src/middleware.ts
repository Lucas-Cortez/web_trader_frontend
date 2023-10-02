export { default } from "next-auth/middleware";

export const config = { matcher: ["/painel/:path*"] };

// import { withAuth } from "next-auth/middleware";

// // middleware is applied to all routes, use conditionals to select

// export default withAuth(function middleware(req) {}, {
//   callbacks: {
//     authorized: ({ req, token }) => {
//       console.log(token);
//       console.log(req.nextUrl.pathname);

//       if (req.nextUrl.pathname.startsWith("/painel") && token === null) {
//         return false;
//       }
//       return true;
//     },
//   },
// });
