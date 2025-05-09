import { matchedData, validationResult } from "express-validator";
import mockUsers from "../mocks/users.mock.mjs";


const loginUser = ( req = Request, res = Response ) => {
    
    const errors = validationResult( req );
    console.log( errors );
    if ( ! errors.isEmpty() ) {
        return res.status( 400 ).json({ errors: errors.array() });
    }

    const { username, password } = matchedData( req );

    const findUser = mockUsers.find( user => user.username === username );
    if( ! findUser || findUser.password !== password )
        return res.status( 401 ).send({ msg: 'Bad Credentials' });

    req.session.user = findUser;     // Modificamos el estado de la sesión agregando un dato personalizado

    return res.status( 200 ).send( findUser );
}

const statusUser = ( req = Request, res = Response ) => {
    /** Muestra el último estado de los datos guardado en la sesion */
    // req.sessionStore.get( req.session.id, ( err, sessionData ) => {
    //     if ( err ) {
    //         console.error( err );
    //         throw err;
    //     }

    //     console.log( 'sessionStore (user): ', sessionData );                            // Muestra los datos almacenados en el store (Sin procesar por Express)
    // } );

    console.log( req.user );
    console.log( req.session );
    console.log( req.sessionID );
    return req.user ? res.send( req.user ) : res.sendStatus( 401 );


    // return req.session.user
    //             ?   res.status( 200 ).send( req.session.user )
    //             :   res.status( 401 ).send({ msg: 'Not Authenticated' });

    
}


const logoutUser = ( req = Request, res = Response ) => {
    if( ! req.user )
        return res.sendStatus( 401 );

    req.logout( error => {
        if( error )
            return res.sendStatus( 400 );

        res.send( 200 );
    });
}


export default {
    loginUser,
    statusUser,
    logoutUser
}