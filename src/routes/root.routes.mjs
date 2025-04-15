import { Router } from 'express';

const router = Router();

/** Define rutas principales */
router.get( '/', ( req = Request, res = Response ) => {
    /** Sessions */
    console.log( 'SessionExpress: ', req.session );
    console.log( 'SessionID: ', req.session.id, req.sessionID );

    /** Creamos una cookie */
    res.cookie( 'greeting', 'Hello, World!', {
        // httpOnly: true,                 // Solo accesible desde el servidor
        // maxAge: 24 * 60 * 60 * 1000,    // 1 día
        maxAge: 10000,                     // 10 segundos
        // secure: false,                  // true si usas HTTPS
        // sameSite: 'strict',             // Evita envío en cross-site requests
        signed: true                       // Requiere palabra secreta o semilla
    } );

    res.status( 201 ).send( { msg: "Cookie creada" } );
} );


export default router;