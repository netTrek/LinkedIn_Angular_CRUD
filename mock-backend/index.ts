/**
 * File created by suenlue on 2019-04-10.
 * Copyright (c) 2019 by netTrek GmbH & Co. KG
 */
const jsonServer = require ('json-server');
const server      = jsonServer.create ();
const router      = jsonServer.router ( './mock-backend/db-mock/db.json' );
const middlewares = jsonServer.defaults ();
let counter = 0;
server.use ( jsonServer.bodyParser );

// router.render = ( req, res, next ) => {
//   if ( ++counter % 3 !== 0 ) {
//     res.status ( 401 )
//            .json ( { error: 'user is not authorized', authorized: false, success: false } );
//   } else {
//     res.status ( 200 );
//     res.send( res.locals.data );
//   }
// };

server.use ( middlewares );
server.use ( router );

server.listen ( 3000, () => {
  console.log ( 'JSON Server is running on port 3000' );
} );

