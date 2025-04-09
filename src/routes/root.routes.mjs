import { Router } from 'express';

const router = Router();

/** Define rutas principales */
router.get( '/', ( req = Request, res = Response ) => {
    res.status( 201 ).send( { msg: "Hello, World!" } );
} );


export default router;