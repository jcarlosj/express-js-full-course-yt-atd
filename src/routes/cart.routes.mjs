import { Router } from 'express';


const router = Router();

/** Define rutas principales */
router.post( '/api/cart', ( req = Request, res = Response ) => {

    if( ! req.session.user )
        return res.sendStatus( 401 );

    const { body: item } = req;
    const { cart } = req.session;

    if( ! cart )
        req.session.cart = [ item ];
    else
        cart.push( item );

    return res.status( 201 ).send( item );

} );
router.get( '/api/cart/status', ( req = Request, res = Response ) => {

    if( ! req.session.user )
        return res.sendStatus( 401 );

    return res.send( req.session.cart ?? [] );
} );



export default router;