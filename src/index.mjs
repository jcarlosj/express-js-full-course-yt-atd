import express, { response } from 'express';

import routes from './routes/index.routes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;


/** Middleware: */
app.use( express.json() );

/** Principal EndPoints */
app.use( routes );


/** Launch Server using ExpressJS */
app.listen( PORT, () => {
    console.log( `Running on http://localhost:${ PORT }` );
} );