import { Router } from 'express';

const router = Router();

/** Define rutas para producto */
router.get( '/api/products', ( req = Request, res = Response ) => {
    res.send( [
        { id: 1, name: 'Chicken Breast', price: 12.99 }
    ] );
} );

export default router;