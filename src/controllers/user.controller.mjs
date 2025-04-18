import { matchedData, validationResult } from "express-validator";

import mockUsers from "../mocks/users.mock.mjs";

const allowedFilters = [ 'username', 'displayName' ];

const getUsers = ( req = Request, res = Response ) => {
    console.log( req[ 'express-validator#contexts' ] );
    // console.log( req.query );

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

        console.log( 'sessionStore (data): ', sessionData );
    } );

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

const createUser = ( req = Request, res = Response ) => {
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

const getUserById = ( req = Request, res = Response ) => {
    const { findUserIndex } = req;
    const findUser = mockUsers[ findUserIndex ];
    
    if( ! findUser ) return res.sendStatus(404);

    return res.send( findUser );
}

const partialUpdateUserById = ( req = Request, res = Response ) => {
    const { body, findUserIndex } = req;

    // console.log({ ...mockUsers[ findUserIndex ], ...body });
    mockUsers[ findUserIndex ] = { ...mockUsers[ findUserIndex ], ...body };

    return res.sendStatus( 200 );
}

const totalUserUpdateById = ( req = Request, res = Response ) => {
    const { body, findUserIndex } = req;

    mockUsers[ findUserIndex ] = {
        id: mockUsers[ findUserIndex ].id,
        ...body
    }

    return res.sendStatus( 200 );
}

const deleteUserById = ( req = Request, res = Response ) => {
    const { findUserIndex } = req;

    mockUsers.splice( findUserIndex, 1 );

    return res.sendStatus( 200 );
}


export default {
    getUsers,
    createUser,
    getUserById,
    partialUpdateUserById,
    totalUserUpdateById,
    deleteUserById
}