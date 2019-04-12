/**
 * File created by suenlue on 2019-04-10.
 * Copyright (c) 2019 by netTrek GmbH & Co. KG
 */

const path        = require ( 'path' );
const multer      = require ( 'multer' );
const jsonServer  = require ( 'json-server' );
const server      = jsonServer.create ();
const router      = jsonServer.router ( './mock-backend/db-mock/db.json' );
const middlewares = jsonServer.defaults ();

// Config for multer storage
const storage = multer.diskStorage ( {
  destination: ( req, file, cb ) => {
    cb ( null, './mock-backend/uploads' );
  },
  filename   : ( req, file, cb ) => {
    cb ( null, file.originalname );
  }
} );
// shortcut for multer with configuration
const upload  = multer ( { storage } );

server.use ( jsonServer.bodyParser );

router.render = ( req, res, next ) => {
  res.status ( 200 );
  if ( req.url.toLowerCase ()
          .startsWith ( '/blob' ) ) {
    res.sendFile ( path.resolve ( __dirname, './public/img/logo.png' ), next );
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

// Add custom routes before JSON Server router
server.post ( '/upload', upload.single ( 'fileKey' ), ( req, res, next ) => {
  try {
    console.log ( 'got upload', req.file );
    res.send ( { fileName: req.file.filename, originalName: req.file.originalname } );
  } catch ( err ) {
    res.sendStatus ( 400 );
  }
} );

server.use ( router );

server.listen ( 3000, () => {
  console.log ( 'JSON Server is running on port 3000' );
} );

