import express, { response } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import routes from './routes/index.routes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;


/** Middleware: */
app.use( express.json() );
app.use( cookieParser( 'Er45gfdg74fd' ) );      // Se pasa palabra secreta o semilla
app.use( session({
    secret: 'fiunfty8943nf',                    // Se pasa palabra secreta o semilla
    saveUninitialized: false,                   // Determina si las sesiones nuevas pero no modificadas deben guardarse en el "store" de sesiones (como en memoria, Redis, MongoDB, etc.)
    resave: false,                              // Define si la sesión debe ser guardada nuevamente en el store en cada solicitud, aunque no haya sido modificada
    cookie: {
        maxAge: 60000 * 60,                     // Tiempo de expiración - 1 hora
    }
}));

/** Principal EndPoints */
app.use( routes );


/** Launch Server using ExpressJS */
app.listen( PORT, () => {
    console.log( `Running on http://localhost:${ PORT }` );
} );