import { Router } from 'express';

const router = Router();

/** Define rutas para producto */
router.get( '/api/products', ( req = Request, res = Response ) => {
    /** Recuperamos las cookies */
    console.log( 'Native: ', req.headers.cookie );
    console.log( 'CookieParser: ', req.cookies );               // Muestra las cookies que NO requieren palabra secreta o semilla
    console.log( 'SignedCookies: ', req.signedCookies );        // Muestra las cookies que requieren palabra secreta o semilla

    // Verifica si el valor de la propiedad greeting en la cookie firmada es el esperado
    if( req.SignedCookies.greeting && req.SignedCookies.greeting === 'Hello, World!' )
        return res.send( [
            { id: 1, name: 'Chicken Breast', price: 12.99 }
        ] );

    return res.status( 403 ).send({ msg: 'Sorry. You need the correct cookie' });
} );

export default router;