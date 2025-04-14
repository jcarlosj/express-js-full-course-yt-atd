import { Router } from 'express';

const router = Router();

/** Define rutas para producto */
router.get( '/api/products', ( req = Request, res = Response ) => {
    /** Recuperamos las cookies */
    console.log( 'Native: ', req.headers.cookie );
    console.log( 'CookieParser: ', req.cookies );

    // Verifica si el valor de la propiedad greeting en la cookie es el esperado
    if( req.cookies.greeting && req.cookies.greeting === 'Hello, World!' )
        return res.send( [
            { id: 1, name: 'Chicken Breast', price: 12.99 }
        ] );

    return res.send({ msg: 'Sorry. You need the correct cookie' });
} );

export default router;