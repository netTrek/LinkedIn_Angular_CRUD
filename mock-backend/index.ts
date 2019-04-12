/**
 * File created by suenlue on 2019-04-10.
 * Copyright (c) 2019 by netTrek GmbH & Co. KG
 */

const path  = require ( 'path' );
const jsonServer  = require ( 'json-server' );
const server      = jsonServer.create ();
const router      = jsonServer.router ( './mock-backend/db-mock/db.json' );
const middlewares = jsonServer.defaults ();
// let counter       = 0;
server.use ( jsonServer.bodyParser );

router.render = ( req, res, next ) => {
  res.status ( 200 );
  if ( req.url.toLowerCase ()
          .startsWith ( '/blob' ) ) {
    res.sendFile ( path.resolve(__dirname, './public/img/logo.png'), next );
    return;
  }
  res.send ( res.locals.data );
};
// router.render = ( req, res, next ) => {
//   if ( !!req.method.match ( /(^post$|^delete$|^put$)/i ) ) {
//
//     const authKey = Object.keys ( req.headers )
//                           .find ( value => value.toLowerCase () === 'authorization' );
//
//     console.log ( 'check auth ', authKey );
//
//     let authorized = false;
//     if ( !!authKey ) {
//       const token = String ( req.headers[ authKey ] )
//         .replace ( /((Bearer)|\s)/gi, '' );
//       authorized  = token === 'netTrek';
//     }
//     if ( !authorized ) {
//       res.status ( 401 )
//          .json ( { error: 'user is not authorized', authorized: false } );
//       return;
//     }
//   }
//   res.status ( 200 );
//   res.send ( res.locals.data );
// };

server.use ( middlewares );
server.use ( router );

server.listen ( 3000, () => {
  console.log ( 'JSON Server is running on port 3000' );
} );

