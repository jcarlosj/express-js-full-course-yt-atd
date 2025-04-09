import { Router } from 'express';
import { matchedData, validationResult } from 'express-validator';

import { createUserValidationSchema } from '../utils/create-user-validation.schema.mjs';
import { filterUsersSchema } from '../utils/filter-users-validation.schema.mjs';
import { resolveIndexByUserId } from '../middlewares/resolve-index-by-user-id.middleware.mjs';
import { loggingMiddlware } from '../middlewares/logging.middleware.mjs';

import mockUsers from '../mocks/users.mock.mjs';

const router = Router();

const allowedFilters = ['username', 'displayName'];

/** Define rutas para usuario */
router.get( 
    '/api/users', 
    filterUsersSchema,
    ( req = Request, res = Response ) => {
        console.log( req[ 'express-validator#contexts' ] );
        // console.log( req.query );

        const errors = validationResult( req );
        console.log( errors );
        if ( ! errors.isEmpty() ) {
            return res.status( 400 ).json({ errors: errors.array() });
        }

        // Extraemos solo los campos que fueron validados exitosamente, los sanitiza e ignora campos adicionales, manipulados por el cliente, en este caso del query
        const { filter, value } = matchedData( req, { locations: [ 'query' ] });

        /**
         * filter: hace referencia al campo de busqueda
         * value: el termino de busqueda esperado
         */
        console.log({ filter, value });

        if ( filter?.trim() && value?.trim() && allowedFilters.includes( filter ) ) {
            return res.send(
                mockUsers.filter( user =>
                    user[ filter ].toLowerCase().includes( value.toLowerCase() )
                )
            );
        }

        res.send( mockUsers );
    }
);

router.use( loggingMiddlware );            // Todas las rutas de aqui en adelante harán uso del loggingMiddleware

router.post( 
    '/api/users', 
    createUserValidationSchema,
    ( req = Request, res = Response ) => {
        const { body } = req;
        
        const errors = validationResult( req );
        console.log( errors );
        if ( ! errors.isEmpty() ) {
            return res.status( 400 ).json({ errors: errors.array() });
        }

        const dataBody = matchedData( req );

        const newUser = {
            id: mockUsers[ mockUsers.length - 1 ].id + 1,
            ...dataBody
        }

        mockUsers.push( newUser );

        return res.status( 201 ).send( newUser );
    } 
);

router.patch( 
    '/api/users/:id', resolveIndexByUserId, ( req = Request, res = Response ) => {
    const { body, findUserIndex } = req;

    // console.log({ ...mockUsers[ findUserIndex ], ...body });
    mockUsers[ findUserIndex ] = { ...mockUsers[ findUserIndex ], ...body };

    return res.sendStatus( 200 );
} );

router.get( '/api/users/:id', resolveIndexByUserId, ( req = Request, res = Response ) => {
    const { findUserIndex } = req;
    const findUser = mockUsers[ findUserIndex ];
    
    if( ! findUser ) return res.sendStatus(404);

    return res.send( findUser );
} );
router.put( '/api/users/:id', resolveIndexByUserId, ( req = Request, res = Response ) => {
    const { body, findUserIndex } = req;

    mockUsers[ findUserIndex ] = {
        id: mockUsers[ findUserIndex ].id,
        ...body
    }

    return res.sendStatus( 200 );
} );

router.delete( '/api/users/:id', resolveIndexByUserId, ( req = Request, res = Response ) => {
    const { findUserIndex } = req;

    mockUsers.splice( findUserIndex, 1 );

    return res.sendStatus( 200 );
} );


export default router;