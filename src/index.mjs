import express, { response } from 'express';
import cookieParser from 'cookie-parser';

import routes from './routes/index.routes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;


/** Middleware: */
app.use( express.json() );
app.use( cookieParser() );

/** Principal EndPoints */
app.use( routes );


/** Launch Server using ExpressJS */
app.listen( PORT, () => {
    console.log( `Running on http://localhost:${ PORT }` );
} );