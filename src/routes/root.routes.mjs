import { Router } from 'express';

const router = Router();

/** Define rutas principales */
router.get( '/', ( req = Request, res = Response ) => {
    /** Sessions */
    console.log( 'Session Express: ', req.session );                                    // Muestra los Datos procesados por Express
    console.log( 'Session ID: ', req.session.id, req.sessionID );                       // Muestra el ID de sesion
    console.log( 'Session modified?', !!req.session.visited );                          // Muestra datos personalizados
    console.log( 'Cookie sent?', req.headers.cookie?.includes( 'connect.sid' ) );       // Muestra la cookie de sesion almacenada en las cabeceras
    
    /** Muestra el último estado de los datos guardado en la sesion */
    req.sessionStore.get( req.session.id, ( err, sessionData ) => {
        if ( err ) {
            console.error( err );
            throw err;
        }

        console.log( 'sessionStore (data): ', sessionData );                            // Muestra los datos almacenados en el store (Sin procesar por Express)
    } );

    req.session.visited = true;     // Modificamos el estado de la sesión agregando un dato personalizado

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