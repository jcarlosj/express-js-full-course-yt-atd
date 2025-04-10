import { Router } from 'express';

const router = Router();

/** Define rutas principales */
router.get( '/', ( req = Request, res = Response ) => {
    /** Creamos una cookie */
    res.cookie( 'greeting', 'Hello, World!', {
        // httpOnly: true,                 // solo accesible desde el servidor
        maxAge: 24 * 60 * 60 * 1000,    // 1 día
        // secure: false,                  // true si usas HTTPS
        // sameSite: 'strict'              // evita envío en cross-site requests
    } );

    res.status( 201 ).send( { msg: "Cookie creada" } );
} );


export default router;